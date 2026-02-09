"use client";

import { AppConfig } from "@/types/system";

interface AppsMenuProps {
  app: AppConfig;
  isInstalled: boolean;
  isLoading: boolean;
  progress: number;
  onInstall: (id: string) => void;
  onOpen: (id: string) => void;
}

export default function AppsMenu({
  app,
  isInstalled,
  isLoading,
  progress,
  onInstall,
  onOpen,
}: AppsMenuProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-gray-100 dark:border-white/5 md:border-none px-1 overflow-hidden">
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <img
          src={app.icon}
          className="w-12 h-12 rounded-xl shadow-sm object-cover shrink-0"
          alt={app.name}
        />
        <div className="flex flex-col min-w-0 flex-1">
          <h4 className="text-sm font-semibold truncate leading-tight text-black dark:text-white">
            {app.name}
          </h4>
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter truncate mt-0.5">
            {app.category || "Application"}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end shrink-0">
        {isLoading ? (
          <div className="relative flex items-center justify-center w-7 h-7">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 32 32">
              <circle
                cx="16" cy="16" r="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-gray-200 dark:text-white/10"
              />
              <circle
                cx="16" cy="16" r="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={88}
                strokeDashoffset={88 - (88 * progress) / 100}
                strokeLinecap="round"
                className="text-blue-500 transition-all duration-300 ease-out"
              />
            </svg>
            <div className="absolute w-2 h-2 bg-blue-500 rounded-[1px]" />
          </div>
        ) : (
          <button
            onClick={() => (isInstalled ? onOpen(app.id) : onInstall(app.id))}
            className="px-4 py-0.5 bg-gray-100 dark:bg-white/10 text-blue-500 rounded-full font-bold text-[11px] hover:bg-blue-500 hover:text-white transition-all active:scale-95 shrink-0"
          >
            {isInstalled ? "OPEN" : "GET"}
          </button>
        )}
      </div>
    </div>
  );
}