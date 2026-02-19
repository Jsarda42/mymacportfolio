"use client";

import { useState, useEffect } from "react";
import { useOS } from "@/context/OSContext";
import { AppleMenu } from "./AppleMenu";

export function TopBar() {
  const { activeApp } = useOS();
  const [time, setTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClose = () => setIsOpen(false);
    window.addEventListener("close-all-menus", handleClose);
    return () => window.removeEventListener("close-all-menus", handleClose);
  }, []);

  const formattedTime = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  const formattedDate = time.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });

  return (
    <nav onMouseDown={(e) => e.stopPropagation()} className="fixed top-0 w-full h-8 flex items-center justify-between px-4 
      bg-white/70 backdrop-blur-md border-b border-black/5 z-100 
      text-[13px] select-none text-[#1d1d1f] dark:text-white dark:bg-black/50">

      <div className="flex items-center gap-1 font-medium h-full">
        <AppleMenu />
        <div className="relative h-full flex items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isOpen) {
                window.dispatchEvent(new Event("close-all-menus"));
              }
              setIsOpen(!isOpen);
            }}
            className={`font-bold px-3 py-1 rounded transition-colors shrink-0 ${isOpen ? "bg-black/10 dark:bg-white/20" : "hover:bg-black/5 dark:hover:bg-white/10"
              }`}
          >
            {activeApp?.name || "Finder"}
          </button>

          {isOpen && (
            <>
              <div className="fixed inset-0 z-10000" onMouseDown={() => setIsOpen(false)} />
              <div className="absolute left-0 top-7 w-56 backdrop-blur-2xl rounded-lg shadow-2xl border py-1.5 z-10001
                              bg-white/80 border-black/10 text-black
                              dark:bg-[#1a1a1a]/90 dark:border-white/10 dark:text-white">
                {activeApp?.itemsMenu.map((item) => (
                  item.type === "separator" ? (
                    <div key={item.id} className="h-px my-1 mx-1 bg-black/10 dark:bg-white/10" />
                  ) : (
                    <button
                      key={item.id}
                      className="w-[calc(100%-8px)] text-left px-4 py-1.5 text-[13px] transition-colors rounded-md mx-1 
                                 hover:bg-blue-600 hover:text-white dark:hover:bg-white/10"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </button>
                  )
                ))}
              </div>
            </>
          )}
        </div>
        <div className="flex items-center">
          {activeApp?.menu.items.map((item) => (
            item.type === "separator" ? (
              <div key={item.id} className="w-px h-4 bg-black/10 mx-1.5 dark:bg-white/20" />
            ) : (
              <button
                key={item.id}
                className="px-3 py-1 rounded transition-colors hover:bg-black/5 dark:hover:bg-white/10 whitespace-nowrap"
              >
                {item.label}
              </button>
            )
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 font-medium">
        <span className="hover:bg-black/5 dark:hover:bg-white/10 px-2 py-1 rounded cursor-default">{formattedDate}</span>
        <span className="hover:bg-black/5 dark:hover:bg-white/10 px-2 py-1 rounded cursor-default">{formattedTime}</span>
      </div>
    </nav>
  );
}