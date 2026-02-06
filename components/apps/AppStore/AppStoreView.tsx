"use client";

import { useState, useEffect } from "react";
import { useOS } from "@/context/OSContext";
import { ALL_APPS } from "@/data/registry";

export default function AppStore() {
  const { installedAppIds, loadingAppIds, installApp, openApp } = useOS();
  const [progress, setProgress] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    loadingAppIds.forEach((id) => {
      if (!progress[id]) {
        let val = 0;
        const interval = setInterval(() => {
          val += 2;
          setProgress((prev) => ({ ...prev, [id]: val }));
          if (val >= 100) clearInterval(interval);
        }, 40);
      }
    });
  }, [loadingAppIds]);

  const installableApps = ALL_APPS.filter(
    (app) => app.id !== "app-store" && app.id !== "settings-app"
  );

  return (
    <div className="flex flex-col h-full bg-[#f2f2f7] dark:bg-[#000000] text-black dark:text-white font-sans">
      <div className="px-8 pt-12 pb-6 border-b border-gray-200 dark:border-white/10">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </span>
        <h1 className="text-4xl font-bold tracking-tight">Apps</h1>
      </div>

      <div className="flex-1 overflow-auto p-8 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {installableApps.map((app) => {
            const isInstalled = installedAppIds.includes(app.id);
            const isLoading = loadingAppIds.includes(app.id);
            const currentProgress = progress[app.id] || 0;

            return (
              <div key={app.id} className="flex items-start gap-4 pb-8 border-b border-gray-100 dark:border-white/5">
                <img
                  src={app.icon}
                  className="w-24 h-24 rounded-[22%] shadow-xl object-cover"
                  alt=""
                />

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold leading-tight truncate">{app.name}</h3>
                  <p className="text-gray-500 text-sm mt-1 leading-snug">
                    Professional tools for your creative workflow.
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {isLoading ? (
                        <div className="relative w-8 h-8 flex items-center justify-center">
                          <svg className="w-full h-full -rotate-90">
                            <circle
                              cx="16" cy="16" r="14"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="text-gray-200 dark:text-white/10"
                            />
                            <circle
                              cx="16" cy="16" r="14"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeDasharray={88}
                              strokeDashoffset={88 - (88 * currentProgress) / 100}
                              strokeLinecap="round"
                              className="text-blue-500 transition-all duration-100"
                            />
                          </svg>
                          <div className="absolute w-2 h-2 bg-blue-500 rounded-sm" />
                        </div>
                      ) : isInstalled ? (
                        <button
                          onClick={() => openApp(app.id)}
                          className="px-6 py-1 bg-gray-100 dark:bg-white/10 text-blue-500 rounded-full font-bold text-[13px] hover:brightness-95 transition-all"
                        >
                          OPEN
                        </button>
                      ) : (
                        <button
                          onClick={() => installApp(app.id)}
                          className="px-6 py-1 bg-gray-100 dark:bg-white/10 text-blue-500 rounded-full font-bold text-[13px] hover:brightness-95 transition-all"
                        >
                          GET
                        </button>
                      )}
                    </div>

                    <span className="text-[10px] text-gray-400 font-medium">In-App Purchases</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}