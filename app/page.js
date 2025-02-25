"use client";
import AppManager from "@/components/AppManager";
import Dock from "@/components/Dock";
import TopBar from "@/components/TopBar";
import { useState, useEffect } from "react";
import { initialStructure } from "@/utils/data";
import AppSwitcher from "@/components/AppSwitcher";
import Launchpad from "@/apps/Launchpad/Launchpad";
import { ModernDock } from "@/components/ModernDock";

export default function Home() {
  const [windows, setWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [openedFile, setOpenedFile] = useState(null); // State to track the opened file
  const [openedApps, setOpenedApps] = useState([]); // Track opened apps in order
  const [selectedAppIndex, setSelectedAppIndex] = useState(0); // Track the selected app in the switcher
  const [isAppSwitcherVisible, setIsAppSwitcherVisible] = useState(false); // Control visibility of the app switcher
  const [isShiftKeyPressed, setIsShiftKeyPressed] = useState(false); // Track if Alt key is pressed
  const [isLaunchpadOpen, setIsLaunchpadOpen] = useState(false); // Track if Launchpad is open

  const [fileStructure, setFileStructure] = useState(initialStructure);

  const toggleLaunchpad = () => {
    setIsLaunchpadOpen(!isLaunchpadOpen);
  }


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

  const closeWindow = (id) => {
    setOpenedApps(openedApps.filter((app) => app !== windows.find((w) => w.id === id).appName));
    setWindows(windows.filter((window) => window.id !== id));
  }

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
      console.log(event);
      if (event.key === 'Shift') {
        setIsShiftKeyPressed(true); // Set Alt key as pressed
        setIsAppSwitcherVisible(true); // Show the app switcher
      }

      if (event.key === 'Tab' && isShiftKeyPressed) {
        event.preventDefault(); // Prevent default Tab behavior
        setSelectedAppIndex((prevIndex) => (prevIndex + 1) % openedApps.length); // Cycle through apps
      }

      if( event.code === 'KeyW' && event.altKey) {
        event.preventDefault(); // Prevent default behavior
        closeWindow(activeWindow); // Close the active window
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === 'Shift') {
        setIsShiftKeyPressed(false); // Set Alt key as released
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
  }, [isShiftKeyPressed, openedApps, selectedAppIndex, windows]);

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      {!isLaunchpadOpen && <TopBar activeWindow={windows.filter((window) => window.id == activeWindow)}/>}
      {!isLaunchpadOpen && <div className="main flex-1 w-screen bg-wallpaper bg-cover">
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
            onClose={() => closeWindow(window.id)}
            toggleMinimize={() => setWindows(windows.map((w) => w.id === window.id ? { ...w, isMinimized: !w.isMinimized } : w))}
            toggleMaximize={() => setWindows(windows.map((w) => w.id === window.id ? { ...w, isMaximized: !w.isMaximized } : w))}
          />
        ))}
      </div>}
      <ModernDock isVisible={isLaunchpadOpen} toggleLaunchpad={toggleLaunchpad} setWindows={setWindows} openWindow={openWindow} windows={windows}  />
      {isLaunchpadOpen && <Launchpad openWindow={openWindow} toggleLaunchpad={toggleLaunchpad}/>}
      {isAppSwitcherVisible && (
        <AppSwitcher openedApps={openedApps} selectedAppIndex={selectedAppIndex} />
      )}
    </div>
  );
}