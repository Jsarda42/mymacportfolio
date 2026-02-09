"use client";

import { useState, useEffect } from "react";
import { useOS } from "@/context/OSContext";
import { ALL_APPS } from "@/data/registry";
import SideBar from "./SideBar";
import HeroSection from "./HeroSection";
import FeaturedCard from "./FeatureCard";
import AppsMenu from "./AppsMenu";

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
  (app) => app.id !== "app-store" && !app.isPreInstalled
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
              {installableApps.map((app) => (
                <AppsMenu
                  key={app.id}
                  app={app}
                  isInstalled={installedAppIds.includes(app.id)}
                  isLoading={loadingAppIds.includes(app.id)}
                  progress={progress[app.id] || 0}
                  onInstall={installApp}
                  onOpen={openApp}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}