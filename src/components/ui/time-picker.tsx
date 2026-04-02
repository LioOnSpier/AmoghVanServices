import React, { useState, useRef, useEffect } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimePickerProps {
  value?: string; // stored as "HH:MM AM/PM" e.g. "07:30 AM"
  onChange: (value: string) => void;
  className?: string;
}

const HOURS = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
const MINUTES = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];

export const TimePicker: React.FC<TimePickerProps> = ({ value, onChange, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hour, setHour] = useState("07");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState<"AM" | "PM">("AM");
  const ref = useRef<HTMLDivElement>(null);

  // Parse value on mount / change
  useEffect(() => {
    if (value) {
      const parts = value.split(" ");
      if (parts.length === 2) {
        const [h, m] = parts[0].split(":");
        setHour(h);
        setMinute(m);
        setPeriod(parts[1] as "AM" | "PM");
      }
    }
  }, [value]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (h: string, m: string, p: "AM" | "PM") => {
    setHour(h);
    setMinute(m);
    setPeriod(p);
    onChange(`${h}:${m} ${p}`);
  };

  const displayValue = value ? value : `${hour}:${minute} ${period}`;

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="mt-1 w-full flex items-center justify-between px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 hover:border-school-yellow-400 focus:outline-none focus:ring-2 focus:ring-school-yellow-400 transition-all shadow-sm"
      >
        <span className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-school-yellow-500" />
          <span className={value ? "text-gray-900 font-medium" : "text-gray-400"}>
            {value || "Select pickup time"}
          </span>
        </span>
        <span className="text-xs font-semibold text-school-yellow-600 bg-school-yellow-50 px-2 py-0.5 rounded-full">
          {period}
        </span>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-school-yellow-500 to-school-yellow-400 px-5 py-4">
            <p className="text-xs font-semibold text-white/80 uppercase tracking-widest mb-1">Preferred Pickup Time</p>
            <p className="text-3xl font-bold text-white tracking-tight">
              {hour}:{minute} <span className="text-xl">{period}</span>
            </p>
          </div>

          <div className="p-4 space-y-4">
            {/* AM / PM Toggle */}
            <div className="flex rounded-lg overflow-hidden border border-gray-200 shadow-sm">
              {(["AM", "PM"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => handleSelect(hour, minute, p)}
                  className={cn(
                    "flex-1 py-2 text-sm font-semibold transition-all",
                    period === p
                      ? "bg-school-yellow-500 text-white"
                      : "bg-white text-gray-500 hover:bg-school-yellow-50"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Hour Column */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 text-center">Hour</p>
                <div className="grid grid-cols-3 gap-1 max-h-44 overflow-y-auto scrollbar-thin pr-1">
                  {HOURS.map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => handleSelect(h, minute, period)}
                      className={cn(
                        "py-2 rounded-lg text-sm font-medium transition-all",
                        hour === h
                          ? "bg-school-yellow-500 text-white shadow-sm"
                          : "bg-gray-50 text-gray-600 hover:bg-school-yellow-100 hover:text-school-yellow-700"
                      )}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>

              {/* Minute Column */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 text-center">Minute</p>
                <div className="grid grid-cols-2 gap-1 max-h-44 overflow-y-auto scrollbar-thin pr-1">
                  {MINUTES.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => handleSelect(hour, m, period)}
                      className={cn(
                        "py-2 rounded-lg text-sm font-medium transition-all",
                        minute === m
                          ? "bg-school-yellow-500 text-white shadow-sm"
                          : "bg-gray-50 text-gray-600 hover:bg-school-yellow-100 hover:text-school-yellow-700"
                      )}
                    >
                      :{m}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 bg-school-yellow-500 hover:bg-school-yellow-600 text-white font-semibold rounded-lg transition-colors text-sm shadow-sm"
            >
              Confirm — {displayValue}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
