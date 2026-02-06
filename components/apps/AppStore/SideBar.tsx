"use client";

import { Search, Star } from "lucide-react";

function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <div className={`flex items-center justify-center md:justify-start gap-3 px-3 py-2 rounded-lg transition-colors cursor-default
      ${active ? "bg-gray-300/60 dark:bg-white/10 text-blue-500 md:text-black md:dark:text-white" : "text-gray-500 hover:bg-gray-300/20"}
    `}>
            <span className="shrink-0">{icon}</span>
            <span className="hidden md:block text-sm font-medium truncate">{label}</span>
        </div>
    );
}

export default function SideBar() {
    return (
        <aside className="
            w-16 sm:w-20 md:w-50 
            bg-gray-200/40 dark:bg-black/20 backdrop-blur-3xl 
            flex flex-col p-2 md:p-4 
            border-r border-black/5 dark:border-white/5 
            transition-all duration-300
            h-full
        ">
            <div className="h-8 mb-4" />
            <div className="relative mb-6 px-1 md:px-2 flex justify-center md:block">
                <Search className="md:absolute md:left-4 md:top-1/2 md:-translate-y-1/2 text-gray-500" size={16} />
                <input
                    type="text"
                    placeholder="Search"
                    className="hidden md:block w-full bg-gray-300/30 dark:bg-white/5 border-none rounded-md py-1 pl-8 pr-2 text-sm outline-none placeholder:text-gray-500"
                />
            </div>

            <nav className="flex flex-col gap-1">
                <SidebarItem icon={<Star size={18} />} label="Discover" active />
            </nav>

            <div className="mt-auto p-1 md:p-2 flex items-center justify-center md:justify-start gap-3 border-t border-black/5 dark:border-white/5 pt-4">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-orange-400 to-blue-500 shadow-sm shrink-0" />
                <span className="hidden md:block text-sm font-medium opacity-90 truncate text-black dark:text-white">
                    Julien Sarda
                </span>
            </div>
        </aside>
    );
}