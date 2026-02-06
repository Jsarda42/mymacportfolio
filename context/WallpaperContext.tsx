"use client";

import React, { createContext, useContext, useState } from "react";

const Wallpapers = {
  default: "bg-gradient-to-br from-blue-400 to-indigo-600",
  dark: "bg-[#121212]",
  sunny: "bg-gradient-to-tr from-orange-400 to-rose-400",
};

const WallpaperContext = createContext({
  wallpaper: Wallpapers.default,
  setWallpaper: (style: keyof typeof Wallpapers) => {},
});

export function WallpaperProvider({ children }: { children: React.ReactNode }) {
  const [wallpaper, setWallpaper] = useState(Wallpapers.default);

  return (
    <WallpaperContext.Provider value={{ wallpaper, setWallpaper: (s) => setWallpaper(Wallpapers[s]) }}>
      <div className={`h-screen w-screen transition-colors duration-700 ${wallpaper}`}>
        {children}
      </div>
    </WallpaperContext.Provider>
  );
}

export const useWallpaper = () => useContext(WallpaperContext);