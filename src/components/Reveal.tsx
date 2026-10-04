import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-triggered entrance animation.
 *
 * ─── Why this is more careful than a one-line IntersectionObserver ───────
 *
 * `npm run build` prerenders every route with Puppeteer and writes the
 * rendered DOM to disk (scripts/prerender.mjs) so the AdSense reviewer and
 * social scrapers see real content instead of an empty <div id="root">.
 *
 * A naive reveal starts at `opacity: 0` and clears it on intersection. Run
 * that through the prerenderer and every below-the-fold section is captured
 * mid-animation — the snapshot keeps the text but ships it invisible. That is
 * precisely the "low value content" shape the prerenderer exists to fix, and
 * it would be invisible to us too, because the markup still contains the words.
 *
 * So the animation is opt-IN, and three separate conditions each keep the
 * content plainly visible:
 *
 *   - `navigator.webdriver` — true under Puppeteer, so the prerendered HTML
 *     and anything else driving a real browser gets the finished state.
 *   - no `IntersectionObserver` — old browsers show content rather than hide it.
 *   - `prefers-reduced-motion: reduce` — honoured at the source, not just by
 *     the global duration override in index.css.
 *
 * The decision is made before first paint (lazy `useState` initialiser, not an
 * effect), which both avoids a visible flash-then-hide and guarantees the
 * prerenderer never observes a hidden frame.
 */

/** Hard ceiling on how long anything may stay hidden waiting to intersect. */
const FAILSAFE_MS = 1600;

let motionAllowed: boolean | null = null;

/**
 * Evaluated once per page load, then cached. Deliberately not a hook — it has
 * to be callable from a `useState` initialiser during the first render.
 */
function shouldAnimate(): boolean {
  if (motionAllowed !== null) return motionAllowed;

  motionAllowed =
    typeof window !== "undefined" &&
    !navigator.webdriver &&
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return motionAllowed;
}

interface RevealProps {
  children: ReactNode;
  /** Element to render. Use `li`/`section` etc. so the markup stays semantic. */
  as?: ElementType;
  className?: string;
  /** Stagger, in ms. Keep siblings under ~300ms total or the list feels slow. */
  delay?: number;
  /**
   * How far into the viewport the element must travel before it fires.
   * The default fires slightly early so the motion reads as "already there"
   * rather than as a thing that jumps in after you have started reading it.
   */
  rootMargin?: string;
}

const Reveal = ({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  rootMargin = "0px 0px -12% 0px",
}: RevealProps) => {
  const ref = useRef<HTMLElement>(null);
  // Captured once, on the first render, and never recomputed: the element must
  // not switch animation strategy underneath itself mid-life.
  const [animated] = useState(shouldAnimate);
  const [shown, setShown] = useState(!animated);

  useEffect(() => {
    if (shown) return;

    const node = ref.current;
    if (!node) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setShown(true);
        observer.disconnect();
      },
      { rootMargin, threshold: 0.08 },
    );
    observer.observe(node);

    // Insurance against an element that never intersects — inside a collapsed
    // parent, say. Hidden content is a worse failure than an unanimated reveal.
    const failsafe = window.setTimeout(() => setShown(true), FAILSAFE_MS + delay);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [shown, rootMargin, delay]);

  return (
    // When animation is off the element carries no motion class whatsoever —
    // not even a zero-duration one. That is what the prerenderer captures.
    <Tag
      ref={ref}
      className={cn(
        animated && (shown ? "animate-reveal-up" : "opacity-0"),
        className,
      )}
      style={animated && shown && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
