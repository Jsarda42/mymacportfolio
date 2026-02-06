"use client";

import { TopBar } from "@/components/shell/TopBar/TopBar";
import { Dock } from "@/components/shell/Dock/Dock";
import { WindowHost } from "@/components/shell/windowHost/WindowHost";
import { useOS } from "@/context/OSContext";

export default function DesktopPage() {
  const { wallpaper, handleBackgroundClick, closeAllMenus } = useOS();

  return (
    <main
      onMouseDown={() => handleBackgroundClick()}
      onClick={closeAllMenus}
      className="relative h-screen w-screen overflow-hidden bg-black"
      style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover' }}
    >
      <TopBar />
      <WindowHost />
      <Dock />
    </main>
  );
}