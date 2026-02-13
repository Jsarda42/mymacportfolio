"use client";

import { useEffect, useState } from "react";
import AppleIcon from '@mui/icons-material/Apple';
import { APPLE_MENU_ITEMS } from "@/data/menu/apple";
import { useOS } from "@/context/OSContext";

export function AppleMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const { openApp } = useOS();

    const handleItemClick = (appId?: string) => {
        if (appId) {
            openApp(appId);
        }
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClose = () => setIsOpen(false);
        window.addEventListener("close-all-menus", handleClose);
        return () => window.removeEventListener("close-all-menus", handleClose);
    }, []);

    return (
        <div className="relative">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                className={`px-3 h-8 flex items-center transition-colors rounded-md relative z-10001 ${isOpen ? "bg-black/10" : "hover:bg-black/5"
                    }`}
            >
                <AppleIcon sx={{ fontSize: 18 }} className="text-black" />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10000 cursor-default"
                        onMouseDown={() => setIsOpen(false)}
                    />
                    <div
                        className="absolute left-0 top-9 w-56 backdrop-blur-2xl rounded-lg shadow-2xl border py-1.5 z-10001
                                   /* Light Mode */
                                   bg-white/80 border-black/10 text-black
                                   /* Dark Mode */
                                   dark:bg-[#1a1a1a]/90 dark:border-white/10 dark:text-white"
                    >
                        {APPLE_MENU_ITEMS.map((item) => (
                            item.type === "separator" ? (
                                <div key={item.id} className="h-px my-1 mx-1 bg-black/10 dark:bg-white/10" />
                            ) : (
                                <button
                                    key={item.id}
                                    className="w-[calc(100%-8px)] text-left px-4 py-1.5 text-[13px] transition-colors rounded-md mx-1 
                                               /* Light Hover */
                                               hover:bg-blue-600 hover:text-white
                                               /* Dark Hover (Subtle White) */
                                               dark:hover:bg-white/10 dark:hover:text-white"
                                    onClick={() => handleItemClick(item.id)}
                                >
                                    {item.label}
                                </button>
                            )
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}