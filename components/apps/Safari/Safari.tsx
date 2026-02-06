"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCw, Share, Plus, X } from "lucide-react";

export default function Safari() {
  const [activeUrl, setActiveUrl] = useState<string | null>(null);
  const [displayUrl, setDisplayUrl] = useState("Search...");

  const favorites = [
    { name: "GitHub", url: "https://github.com/Jsarda42", icon: "GH" },
    { name: "LinkedIn", url: "https://linkedin.com/in/julien-sarda", icon: "LI" },
    { name: "Mconscience", url: "https://mconscience.fr/", icon: "M" },
  ];

const handleOpenPage = (url: string, name: string) => {
  const isExternal = url.includes("linkedin.com") || url.includes("github.com");

  if (isExternal) {
    window.open(url, "_blank");
  } else {
    setActiveUrl(url);
    setDisplayUrl(name.toLowerCase() + ".fr");
  }
};

  const handleGoHome = () => {
    setActiveUrl(null);
    setDisplayUrl("portfolio.me");
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1e1e1e] text-black dark:text-white overflow-hidden">
      <div className="flex items-center gap-4 px-4 py-2 bg-[#f1f1f1] dark:bg-[#2d2d2d] border-b border-gray-300 dark:border-white/10 z-10">
        <div className="flex gap-4 text-gray-500">
          <ChevronLeft 
            size={20} 
            className="hover:text-black dark:hover:text-white cursor-pointer" 
            onClick={handleGoHome}
          />
          <ChevronRight size={20} className="opacity-30" />
        </div>
        
        <div className="flex-1 max-w-2xl mx-auto relative">
          <div className="bg-white/50 dark:bg-black/20 rounded-lg py-1 px-3 flex items-center justify-center gap-2 border border-black/5 dark:border-white/5">
            <span className="text-[10px] text-gray-500">🔒</span>
            <div className="text-sm w-full text-center outline-none select-none text-gray-700 dark:text-gray-300">
              {displayUrl}
            </div>
            <RotateCw size={12} className="text-gray-400 cursor-pointer" />
          </div>
        </div>

        <div className="flex gap-4 text-gray-500">
          <Share size={18} className="hover:text-black dark:hover:text-white cursor-pointer" />
          <Plus size={18} className="hover:text-black dark:hover:text-white cursor-pointer" />
        </div>
      </div>

      <div className="flex-1 relative bg-white dark:bg-[#1e1e1e]">
        {activeUrl ? (
          <div className="w-full h-full flex flex-col">
            <div className="absolute top-2 right-2 z-20">
                <button 
                  onClick={handleGoHome}
                  className="p-1 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <X size={16} />
                </button>
            </div>
            <iframe 
              src={activeUrl} 
              className="w-full h-full border-none"
              title="Safari Browser"
            />
          </div>
        ) : (
          <div className="p-10 animate-in fade-in zoom-in-95 duration-300">
            <h2 className="text-3xl font-bold mb-8">Favorites</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8">
              {favorites.map((fav) => (
                <button 
                  key={fav.name}
                  onClick={() => handleOpenPage(fav.url, fav.name)}
                  className="flex flex-col items-center gap-2 group outline-none"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-white/10 flex items-center justify-center text-xl font-bold group-hover:scale-105 group-active:scale-95 transition-all shadow-sm">
                    {fav.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                    {fav.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}