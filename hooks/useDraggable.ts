"use client";

import { useState, useCallback, useEffect } from "react";

export type SnapType = "none" | "left" | "right" | "full";

export function useDraggable(initialX = 100, initialY = 100) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const TOP_BAR_H = 32;
  const DOCK_H = 85;

  const [position, setPosition] = useState({
    x: isMobile ? 0 : initialX,
    y: isMobile ? TOP_BAR_H : initialY
  });

  const [size, setSize] = useState({
    width: isMobile ? (typeof window !== 'undefined' ? window.innerWidth : 600) : 600,
    height: isMobile
      ? (typeof window !== 'undefined' ? window.innerHeight - (TOP_BAR_H + DOCK_H) : 400)
      : 400
  });

  const [isDragging, setIsDragging] = useState(false);
  const [snapPreview, setSnapPreview] = useState<SnapType>("none");

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0 || isMobile) return;
    setIsDragging(true);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      setPosition((prev) => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY,
      }));

      const threshold = 30;
      const { clientX, clientY } = e;
      const { innerWidth } = window;

      if (clientY < threshold) setSnapPreview("full");
      else if (clientX < threshold) setSnapPreview("left");
      else if (clientX > innerWidth - threshold) setSnapPreview("right");
      else setSnapPreview("none");
    };

    const handleMouseUp = () => {
      if (!isDragging) return;
      const availableHeight = window.innerHeight - (TOP_BAR_H + DOCK_H);

      if (snapPreview === "full") {
        setPosition({ x: 0, y: TOP_BAR_H });
        setSize({ width: window.innerWidth, height: availableHeight });
      } else if (snapPreview === "left") {
        setPosition({ x: 0, y: TOP_BAR_H });
        setSize({ width: window.innerWidth / 2, height: availableHeight });
      } else if (snapPreview === "right") {
        setPosition({ x: window.innerWidth / 2, y: TOP_BAR_H });
        setSize({ width: window.innerWidth / 2, height: availableHeight });
      }

      setIsDragging(false);
      setSnapPreview("none");
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, snapPreview, isMobile]);

  return { position, size, onMouseDown, isDragging, snapPreview, isMobile };
}