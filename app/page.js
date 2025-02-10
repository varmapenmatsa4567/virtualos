"use client";
import AppManager from "@/components/AppManager";
import Dock from "@/components/Dock";
import TopBar from "@/components/TopBar";
import Window from "@/components/Window";
import { useState, useEffect } from "react";

export default function Home() {

  const [windows, setWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);

  const openWindow = (appName) => {
    const newWindow = {
      id: Date.now(),
      isMinimized: false,
      isMaximized: false,
      appName: appName || "New Window",
    };
    setWindows([...windows, newWindow]);
    setActiveWindow(newWindow.id);
  };

  useEffect(() => {
    const disableContextMenu = (event) => event.preventDefault();
    document.addEventListener("contextmenu", disableContextMenu);
    
    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
    };
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <TopBar/>
      <div className="main flex-1 w-screen bg-wallpaper bg-cover">
        {windows.map((window) => (
          <AppManager
            appName={window.appName}
            key={window.id}
            onClick={() => setActiveWindow(window.id)}
            isActive={activeWindow === window.id}
            isMinimized={window.isMinimized}
            isMaximized={window.isMaximized}
            onClose={() => setWindows(windows.filter((w) => w.id !== window.id))}
            toggleMinimize={() => setWindows(windows.map((w) => w.id === window.id ? { ...w, isMinimized: !w.isMinimized } : w))}
            toggleMaximize={() => setWindows(windows.map((w) => w.id === window.id ? { ...w, isMaximized: !w.isMaximized } : w))}
          />
        ))}
      </div>
      <Dock setWindows={setWindows} openWindow={openWindow} windows={windows}/>
    </div>
  );
}
