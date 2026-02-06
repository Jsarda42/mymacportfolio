"use client";
import Image from "next/image";
import { useOS } from "@/context/OSContext";
import { ALL_APPS } from "@/data/registry";

export function Dock() {
  const {
    openApp,
    setActiveApp,
    openAppIds,
    activeApp,
    toggleMinimize,
    minimizedAppIds,
    closeAllMenus,
    launchingAppId,
    installedAppIds
  } = useOS();

  const dockApps = ALL_APPS.filter(app =>
    app.isPreInstalled || installedAppIds.includes(app.id)
  );

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-100">
      <style jsx>{`
        @keyframes apple-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-apple-bounce {
          animation: apple-bounce 0.4s ease-in-out infinite;
        }
      `}</style>

      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="flex items-end gap-2 px-3 py-2 bg-white/20 dark:bg-black/20 backdrop-blur-3xl border border-white/20 rounded-2xl shadow-2xl"
      >
        {dockApps.map((app) => {
          const isOpen = openAppIds.includes(app.id);
          const isActive = activeApp?.id === app.id;
          const isLaunching = launchingAppId === app.id;

          return (
            <button
              key={app.id}
              onClick={() => {
                closeAllMenus();
                if (isOpen && minimizedAppIds.includes(app.id)) {
                  toggleMinimize(app.id);
                  setActiveApp(app);
                } else {
                  openApp(app.id);
                }
              }}
              className={`relative transition-all duration-200 hover:scale-110 active:scale-90 group
                ${isLaunching ? "animate-apple-bounce" : ""}
              `}
            >
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black/80 text-white text-[11px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
                {app.name}
              </span>
              <div className={`w-12 h-12 relative transition-all duration-300
                ${isActive ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] scale-105" : ""}
              `}>
                <Image
                  src={app.icon}
                  alt={app.name}
                  width={48}
                  height={48}
                  priority={app.isPreInstalled}
                  loading="eager"
                  className={`rounded-xl shadow-sm transition-all ${isActive ? "brightness-110" : ""}`}
                />
              </div>
              {isOpen && (
                <div className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white transition-all duration-300 ${isActive ? "w-1.5 h-1.5 opacity-100" : "opacity-40"}`} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}