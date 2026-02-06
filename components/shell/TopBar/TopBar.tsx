"use client";

import { useState, useEffect } from "react";
import { useOS } from "@/context/OSContext";
import { AppleMenu } from "./AppleMenu";

export function TopBar() {
  const { activeApp } = useOS();
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const formattedDate = time.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <nav onMouseDown={(e) => e.stopPropagation()} className="fixed top-0 w-full h-8 flex items-center justify-between px-4 
      bg-white/70 backdrop-blur-md border-b border-black/5 z-100 
      text-[13px] select-none text-[#1d1d1f]">
      <div className="flex items-center gap-4 font-medium">
        <AppleMenu />

        <span className="font-bold px-2 cursor-default">
          {activeApp?.name || "Finder"}
        </span>

        <div className="hidden md:flex items-center gap-1">
          {activeApp?.menu.items.map((item) => (
            <button
              key={item.id}
              className={`px-3 py-1 rounded transition-colors hover:bg-black/5 
                ${item.type === "separator" ? "w-px h-4 bg-black/10 mx-1 p-0 pointer-events-none" : ""}`}
            >
              {item.type !== "separator" && item.label}
            </button>
          ))}

          {!activeApp && (
            <>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 font-medium">
        <span className="hover:bg-black/5 px-2 py-1 rounded transition-colors cursor-default">
          {formattedDate}
        </span>
        <span className="hover:bg-black/5 px-2 py-1 rounded transition-colors cursor-default">
          {formattedTime}
        </span>
      </div>
    </nav>
  );
}