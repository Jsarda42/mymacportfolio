"use client";

import { useOS } from "@/context/OSContext";

const WALLPAPERS = [
    { id: "wp1", name: "Futurama", path: "/wallpapers/futurama.webp" },
    { id: "wp2", name: "Sandy Night", path: "/wallpapers/sandyNight.webp" },
    { id: "wp3", name: "Snowy Morning", path: "/wallpapers/snowyMorning.webp" },
    { id: "wp4", name: "Under The Sky", path: "/wallpapers/underTheSky.jpg" },
];

export function SettingsView() {
    const { wallpaper, setWallpaper } = useOS();

    return (
        <div className="p-6 bg-white dark:bg-[#1e1e1e] h-full overflow-auto">
            <h2 className="text-2xl font-bold mb-6">Wallpaper</h2>

            <div className="grid grid-cols-2 gap-4">
                {WALLPAPERS.map((wp) => (
                    <button
                        key={wp.id}
                        onClick={() => setWallpaper(wp.path)}
                        className="group relative flex flex-col gap-2 text-left"
                    >
                        <div
                            style={{
                                backgroundImage: `url(${wp.path})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                            className={`h-24 w-full rounded-lg shadow-sm border border-black/10 transition-all
        ${wallpaper === wp.path ? "ring-2 ring-blue-500 shadow-md" : "group-hover:ring-2 ring-blue-500/50"}`}
                        />
                        <span className="text-[12px] font-medium opacity-80">{wp.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}