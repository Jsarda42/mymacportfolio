"use client";

import { useOS } from "@/context/OSContext";
import { ALL_APPS } from "@/data/registry";
import { WindowFrame } from "@/components/ui/WindowFrame";

export function WindowHost() {
  const { openAppIds, activeApp, closeApp, setActiveApp, toggleMinimize, minimizedAppIds } = useOS();

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {openAppIds.map((id) => {
        const app = ALL_APPS.find((a) => a.id === id);
        if (!app) return null;

        const Content = app.windowContent;
        const isMinimized = minimizedAppIds.includes(id);
        const isActive = activeApp?.id === app.id;

        return (
          <div
            key={app.id}
            className={`absolute transition-all duration-300 ${isMinimized ? "opacity-0 scale-50 pointer-events-none" : "opacity-100 scale-100 pointer-events-auto"
              }`}
            style={{ zIndex: isActive ? 50 : 10 }}
            onMouseDown={(e) => {
              e.stopPropagation();
              setActiveApp(app);
            }}
          >
            <WindowFrame
              title={app.name}
              isActive={isActive}
              onClose={() => closeApp(app.id)}
              onSelect={() => setActiveApp(app)}
              onMinimize={() => toggleMinimize(app.id)}
            >
              <Content />
            </WindowFrame>
          </div>
        );
      })}
    </div>
  );
}