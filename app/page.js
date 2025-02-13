"use client";
import AppManager from "@/components/AppManager";
import Dock from "@/components/Dock";
import TopBar from "@/components/TopBar";
import { useState, useEffect } from "react";
import { initialStructure } from "@/utils/data";
import AppSwitcher from "@/components/AppSwitcher";

export default function Home() {
  const [windows, setWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [openedFile, setOpenedFile] = useState(null); // State to track the opened file
  const [openedApps, setOpenedApps] = useState([]); // Track opened apps in order
  const [selectedAppIndex, setSelectedAppIndex] = useState(0); // Track the selected app in the switcher
  const [isAppSwitcherVisible, setIsAppSwitcherVisible] = useState(false); // Control visibility of the app switcher
  const [isAltKeyPressed, setIsAltKeyPressed] = useState(false); // Track if Alt key is pressed

  const [fileStructure, setFileStructure] = useState(initialStructure);

  // Load fileStructure from localStorage on component mount
  useEffect(() => {
    const savedFileStructure = localStorage.getItem('fileStructure');
    if (savedFileStructure) {
      setFileStructure(JSON.parse(savedFileStructure));
    }
  }, []);

  // Save fileStructure to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('fileStructure', JSON.stringify(fileStructure));
  }, [fileStructure]);

  const openWindow = (appName) => {
    const newWindow = {
      id: Date.now(),
      isMinimized: false,
      isMaximized: false,
      appName: appName || "New Window",
    };
    setWindows([...windows, newWindow]);
    setActiveWindow(newWindow.id);

    // Add the app to the openedApps list if it's not already there
    if (!openedApps.includes(appName)) {
      setOpenedApps([...openedApps, appName]);
    }
  };

  // Function to handle file clicks
  const handleFileClick = (file) => {
    setOpenedFile(file); // Set the opened file
    openWindow("vscode"); // Open the Vscode app
  };

  useEffect(() => {
    const disableContextMenu = (event) => event.preventDefault();
    document.addEventListener("contextmenu", disableContextMenu);

    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Alt') {
        setIsAltKeyPressed(true); // Set Alt key as pressed
        setIsAppSwitcherVisible(true); // Show the app switcher
      }

      if (event.key === 'Tab' && isAltKeyPressed) {
        event.preventDefault(); // Prevent default Tab behavior
        setSelectedAppIndex((prevIndex) => (prevIndex + 1) % openedApps.length); // Cycle through apps
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === 'Alt') {
        setIsAltKeyPressed(false); // Set Alt key as released
        setIsAppSwitcherVisible(false); // Hide the app switcher

        // Switch to the selected app when Alt is released
        const selectedApp = openedApps[selectedAppIndex];
        const selectedWindow = windows.find((w) => w.appName === selectedApp);
        if (selectedWindow) {
          setActiveWindow(selectedWindow.id); // Switch to the selected app
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isAltKeyPressed, openedApps, selectedAppIndex, windows]);

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <TopBar />
      <div className="main flex-1 w-screen bg-wallpaper bg-cover">
        {windows.map((window) => (
          <AppManager
            openedFile={openedFile}
            fileStructure={fileStructure}
            setFileStructure={setFileStructure}
            handleFileClick={handleFileClick}
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
      <Dock setWindows={setWindows} openWindow={openWindow} windows={windows} />
      {isAppSwitcherVisible && (
        <AppSwitcher openedApps={openedApps} selectedAppIndex={selectedAppIndex} />
      )}
    </div>
  );
}