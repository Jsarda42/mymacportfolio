"use client";

import React, { useState } from "react";
import { Library, User } from "lucide-react";

const COLLECTIONS = [
    { id: "4U80LJd8sG6U9YTFP5izka", name: "Suzy", type: "artist" },
    { id: "3HqSLMAZ3g3d5poNaI7GOU", name: "IU", type: "artist" },
];

export default function SpotifyApp() {
    const [activeId, setActiveId] = useState(COLLECTIONS[0]);

    return (
        <div className="flex flex-col md:flex-row h-full bg-black text-[#b3b3b3] font-sans overflow-hidden">
            <aside className="
        order-2 md:order-1 
        w-full md:w-52 
        bg-black 
        flex md:flex-col 
        p-2 md:p-4 
        border-t md:border-t-0 md:border-r border-white/5 
        z-20
      ">
                <div className="hidden md:flex items-center gap-3 text-white mb-8 px-2">
                    <Library size={24} />
                    <span className="font-bold text-sm">Your Music</span>
                </div>

                <nav className="flex md:flex-col flex-1 justify-around md:justify-start gap-1">
                    {COLLECTIONS.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveId(item)}
                            className={`
                flex flex-col md:flex-row items-center 
                gap-1 md:gap-3 
                px-3 py-2 md:rounded-md 
                text-[10px] md:text-xs font-semibold 
                transition-all flex-1 md:flex-none
                ${activeId.id === item.id ? "text-[#1db954] md:bg-[#282828]" : "hover:text-white"}
              `}
                        >
                            <User size={20} className="md:w-4 md:h-4" />
                            <span className="truncate max-w-15 md:max-w-none">{item.name}</span>
                        </button>
                    ))}
                </nav>
            </aside>
            <main className="order-1 md:order-2 flex-1 bg-[#121212] relative overflow-hidden">
                <iframe
                    key={activeId.id}
                    src={`https://open.spotify.com/embed/${activeId.type}/${activeId.id}?utm_source=generator&theme=0`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="border-none"
                />
            </main>
        </div>
    );
}