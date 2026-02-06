"use client";

import React from "react";
import { createPortal } from "react-dom";
import { X, Minus } from "lucide-react";
import { useDraggable } from "@/hooks/useDraggable";

interface WindowFrameProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  isActive: boolean;
  onSelect: () => void;
  onMinimize: () => void;
}

export function WindowFrame({
  title,
  children,
  onClose,
  onMinimize,
  isActive,
  onSelect
}: WindowFrameProps) {

  const { position, size, onMouseDown, isDragging, snapPreview, isMobile } = useDraggable(150, 100);

  const GhostPreview = (
    <div
      className="fixed z-9999 bg-blue-500/15 border-2 border-blue-500/30 backdrop-blur-md transition-all duration-300 ease-out pointer-events-none rounded-2xl"
      style={{
        top: "40px",
        left: snapPreview === "right" ? "calc(50vw + 4px)" : "8px",
        width: snapPreview === "full" ? "calc(100vw - 16px)" : "calc(50vw - 12px)",
        height: "calc(100vh - 130px)",
      }}
    />
  );

  const TOP_BAR_H = 32;
  const DOCK_H = 85;

  return (
    <>
      {!isMobile && isDragging && snapPreview !== "none" &&
        createPortal(GhostPreview, document.body)}

      <div
        onClick={onSelect}
        style={{
          transform: isMobile
            ? `translate(0px, ${TOP_BAR_H}px)`
            : `translate(${position.x}px, ${position.y}px)`,
          width: isMobile ? '100vw' : `${size.width}px`,
          height: isMobile
            ? `calc(100vh - ${TOP_BAR_H + DOCK_H}px)`
            : `${size.height}px`,
          willChange: "transform",
        }}
        className={`absolute overflow-hidden shadow-2xl border flex flex-col
          ${isActive ? "z-50 shadow-black/40" : "z-10 opacity-95"}
          ${isMobile ? "rounded-none border-none" : "rounded-xl border-white/20 dark:border-white/10"}
          ${isDragging ? "transition-none" : "transition-all duration-300 ease-out"}
          bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-2xl`}
      >
        <div
          onMouseDown={onMouseDown}
          className={`h-10 flex items-center px-4 bg-white/10 select-none 
            ${isMobile ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
        >
          <div className="flex gap-2 w-20">
            <button
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="w-3 h-3 rounded-full bg-[#ff5f57] flex items-center justify-center group"
            >
              <X size={8} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            {!isMobile && (
              <button
                onClick={(e) => { e.stopPropagation(); onMinimize(); }}
                className="w-3 h-3 rounded-full bg-[#febc2e] flex items-center justify-center group"
              >
                <Minus size={8} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            )}

            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>

          <div className="flex-1 text-center text-[13px] font-medium opacity-70">
            {title}
          </div>
          <div className="w-20" />
        </div>
        <div className="flex-1 overflow-auto bg-white dark:bg-[#1e1e1e]">
          {children}
        </div>
      </div>
    </>
  );
}