"use client";

import { useState, useEffect } from "react";
import { useOS } from "@/context/OSContext";
import { ALL_APPS } from "@/data/registry";
import SideBar from "./SideBar";
import HeroSection from "./HeroSection";
import FeaturedCard from "./FeatureCard";

const features = [
  {
    id: 1,
    title: "Spotify",
    img: "/icons/spotify.svg",
  },
  {
    id: 2,
    title: "Calculator",
    img: "/icons/calculator.webp",
  }
];

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
  }, [loadingAppIds, progress]);

  const installableApps = ALL_APPS.filter(
    (app) => app.id !== "app-store" && app.id !== "settings" && app.id !== "safari-app"
  );

  return (
    <div className="flex h-full bg-white dark:bg-[#1e1e1e] text-black dark:text-white font-sans overflow-hidden select-none">
      <SideBar />
      <main className="flex-1 overflow-auto bg-white dark:bg-[#1e1e1e]">
        <div className="max-w-6xl mx-auto p-4 md:p-8 pt-10">
          <HeroSection />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 mb-12">
            {features.map((feature) => (
              <FeaturedCard
                key={feature.id}
                title={feature.title}
                img={feature.img}
              />
            ))}
          </div>

          <section>
            <h3 className="text-lg md:text-2xl font-bold tracking-tight mb-6 px-1">Apps We Love</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-x-8 gap-y-2">
              {installableApps.map((app) => {
                const isInstalled = installedAppIds.includes(app.id);
                const isLoading = loadingAppIds.includes(app.id);
                const currentProgress = progress[app.id] || 0;

                return (
                  <div key={app.id} className="flex items-center justify-between gap-4 py-3 border-b border-gray-100 dark:border-white/5 md:border-none px-1 overflow-hidden">

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
                              strokeDashoffset={88 - (88 * currentProgress) / 100}
                              strokeLinecap="round"
                              className="text-blue-500 transition-all duration-300 ease-out"
                            />
                          </svg>
                          <div className="absolute w-2 h-2 bg-blue-500 rounded-[1px]" />
                        </div>
                      ) : (
                        <button
                          onClick={() => isInstalled ? openApp(app.id) : installApp(app.id)}
                          className="px-4 py-0.5 bg-gray-100 dark:bg-white/10 text-blue-500 rounded-full font-bold text-[11px] hover:bg-blue-500 hover:text-white transition-all active:scale-95 shrink-0"
                        >
                          {isInstalled ? "OPEN" : "GET"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}