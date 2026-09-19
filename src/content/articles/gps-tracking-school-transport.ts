import type { StaticArticle } from "../types";

export const article: StaticArticle = {
  id: "static-gps-tracking-school-transport",
  slug: "gps-tracking-school-transport-what-it-does",
  title: "GPS Tracking on School Vehicles: What It Does, and What It Doesn't",
  summary:
    "GPS tracking is now a standard selling point in school transport. It is genuinely useful, but it solves a narrower problem than most parents assume. Here is what it gives you, where it falls short, and what matters more.",
  authorName: "Amogh Van/Bus Services",
  coverImage: "/gallery/360-camera.jpg",
  publishedISO: "2026-08-14",
  category: "Technology",
  content: `
<p>Almost every school transport operator now advertises GPS tracking, and parents reasonably treat it as a safety feature. It is a useful one. But it addresses a narrower problem than the marketing implies, and a parent who chooses an operator primarily because of the tracking app may be optimising for the wrong thing.</p>

<p>We fit tracking to our vehicles and we think it is worth having. This is an honest account of what it does.</p>

<h2>What it actually is</h2>

<p>A GPS unit in the vehicle determines its position from satellite signals and transmits it over the mobile network to a server, which displays it in an app or a web page. Position updates typically arrive every 10 to 60 seconds depending on the system.</p>

<p>That is the whole mechanism. Everything tracking can do follows from it, and everything it cannot do follows from it too.</p>

<h2>What it genuinely gives you</h2>

<h3>It answers "where is the vehicle"</h3>

<p>This is the real benefit, and it is not a small one. It removes the daily uncertainty of standing at a stop wondering whether you have missed it or whether it is late. On a rainy evening with a delayed vehicle, being able to see that it is eight minutes away and moving is worth a great deal.</p>

<h3>It reduces waiting at the stop</h3>

<p>Particularly valuable in Mumbai weather. Knowing the vehicle is ten minutes out means a child waits inside rather than in the rain or sun.</p>

<h3>It tells you when a delay is real</h3>

<p>A parent can distinguish "stuck in traffic on the usual route" from "has not started yet" without phoning anybody.</p>

<h3>It creates a record</h3>

<p>Route history allows an operator to review what happened on a particular day: whether the vehicle took an unusual route, how long a stop took, what the speed was at a given point. This is genuinely useful when investigating a complaint.</p>

<h3>It supports speed monitoring</h3>

<p>Most systems record speed and can flag when a vehicle exceeds a threshold. For an operator that reviews these reports, it is a real check on driving behaviour. The qualifier matters: the data is only as useful as the attention paid to it.</p>

<h2>What it does not do</h2>

<p>This is the part that gets less attention.</p>

<h3>It tracks the vehicle, not your child</h3>

<p>This is the most important limitation. GPS reports the position of a device bolted to a vehicle. It does not know whether your child is on board. If a child did not board, or got off at the wrong stop, tracking will not tell you — the dot on the map continues along the route exactly as before.</p>

<p>What addresses this is an attendant with a register who confirms each child boarded and alighted. Some operators combine tracking with RFID or app-based check-in, which is better. But plain vehicle tracking, on its own, does not answer the question parents actually care about.</p>

<h3>It does not prevent an accident</h3>

<p>Tracking is a record, not a control. It does not brake, does not improve the tyres, and does not make the driver more careful in the moment. What prevents accidents is driver experience, vehicle maintenance and sensible scheduling. Tracking can support the first of these if the data is reviewed, which brings us to the next point.</p>

<h3>It is only as good as the operator's use of it</h3>

<p>A speed alert nobody reads changes nothing. Ask your operator not whether they have tracking, but who looks at the reports and what has actually happened as a result. The answer distinguishes a safety practice from a marketing feature.</p>

<h3>It fails in predictable places</h3>

<p>GPS needs a satellite signal and a mobile data connection. Both degrade in the same places: under flyovers, in tunnels, between tall buildings, in basement parking. In dense parts of Mumbai, expect the position to drift or freeze occasionally.</p>

<p>The common false alarm is a frozen dot. A parent sees the vehicle apparently stationary for ten minutes and concludes something has happened, when the unit has simply lost signal. Understanding this in advance saves a lot of unnecessary worry.</p>

<h3>The ETA is an estimate</h3>

<p>Arrival predictions are calculated from current position and typical speed. They do not know that the road ahead has just flooded. Treat the ETA as a rough guide, especially in monsoon.</p>

<h2>Privacy, which deserves a thought</h2>

<p>A tracking system records the movements of a vehicle carrying identifiable children, and often shows the location of every stop on the route. Reasonable questions to ask:</p>

<ul>
<li>Can a parent see only their own child's route, or every route the operator runs?</li>
<li>Can they see other children's stops, and therefore roughly where other families live?</li>
<li>How long is location history retained?</li>
<li>Who is the tracking provider, and where is the data stored?</li>
<li>What happens to access when a family leaves the service?</li>
</ul>

<p>These are not hypothetical concerns. A poorly configured tracking app that shows every stop to every parent is a meaningful privacy problem, and it is worth ten seconds to ask.</p>

<h2>What matters more than tracking</h2>

<p>If you are comparing operators, these carry more weight:</p>

<ol>
<li><strong>An attendant on board.</strong> An adult whose job is watching the children addresses more real risk than any app.</li>
<li><strong>Driver experience and verification.</strong></li>
<li><strong>Vehicle maintenance.</strong> Tyres and brakes, checked on a schedule.</li>
<li><strong>Not overloading.</strong> Registered capacity respected.</li>
<li><strong>A working way to reach a human.</strong> When something is wrong, you want a person who answers, not a map.</li>
<li><strong>Boarding and alighting discipline.</strong> A recorded handover at both ends.</li>
</ol>

<p>Tracking is a reasonable seventh item. An operator that has tracking but no attendant has bought the visible feature and skipped the one that matters.</p>

<h2>Using it sensibly</h2>

<p>A suggestion, offered gently: tracking is most useful checked once, shortly before the vehicle is due. Watching the dot move for the entire journey tends to increase anxiety rather than reduce it, because every normal pause looks like an event.</p>

<p>If something genuinely looks wrong — a long stop somewhere unexpected, a route that is not the usual one — call the operator. That is what the information is for.</p>

<h2>In short</h2>

<p>GPS tracking solves the "where is the vehicle" problem well, and that problem is worth solving. It does not tell you your child is on board, it does not prevent accidents, and it is not a substitute for an attendant and a well-maintained vehicle.</p>

<p>Ask about it. Then ask about the attendant, the driver and the tyres, and weight those answers more heavily.</p>

<p>If you would like to know how tracking works on our routes, or what our attendants record at each stop, call 9870525637.</p>
`,
};
