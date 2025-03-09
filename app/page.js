"use client";
import AppManager from "@/components/AppManager";
import TopBar from "@/components/TopBar";
import { useState, useEffect } from "react";
import { initialStructure } from "@/utils/data";
import AppSwitcher from "@/components/AppSwitcher";
import Launchpad from "@/apps/Launchpad/Launchpad";
import { ModernDock } from "@/components/ModernDock";
import Iphone from "@/mobile/Iphone";
import useSettingsStore from "@/stores/settings-store";
import LockScreen from "@/apps/LockScreen";
import RestartScreen from "@/apps/RestartScreen";
import useGlobalStore from "@/stores/global-store";
import html2canvas from "html2canvas";


export default function Home() {
  const [windows, setWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [openedFile, setOpenedFile] = useState(null); // State to track the opened file
  const [openedApps, setOpenedApps] = useState([]); // Track opened apps in order
  const [selectedAppIndex, setSelectedAppIndex] = useState(0); // Track the selected app in the switcher
  const [isAppSwitcherVisible, setIsAppSwitcherVisible] = useState(false); // Control visibility of the app switcher
  const [isShiftKeyPressed, setIsShiftKeyPressed] = useState(false); // Track if Alt key is pressed
  const [isLaunchpadOpen, setIsLaunchpadOpen] = useState(false); // Track if Launchpad is open
  const [db, setDb] = useState(null); // State to hold the IndexedDB instance

  const {wallpaper, isLocked, hydrated, restart} = useSettingsStore();

  const {isFullScreenshot, screenshotUrl, setScreenshotUrl} = useGlobalStore();

  const [fileStructure, setFileStructure] = useState(initialStructure);
  const [isMobile, setIsMobile] = useState(false);

  const toggleLaunchpad = () => {
    setIsLaunchpadOpen(!isLaunchpadOpen);
  }

  useEffect(() => {
    const request = indexedDB.open("PhotoboothDB", 1);

    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("photos")) {
            db.createObjectStore("photos", { keyPath: "id", autoIncrement: true });
        }
    };

    request.onsuccess = (event) => {
        setDb(event.target.result);
    };

    request.onerror = (event) => {
        console.error("Error opening IndexedDB:", event.target.error);
    };
}, []);


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
    if(windows.some((window) => window.appName === appName)) {
      const existingWindow = windows.find((window) => window.appName === appName);
      setActiveWindow(existingWindow.id); // Bring the existing window to the front
      setWindows(windows.map((window) => window.id === existingWindow.id ? { ...window, isMinimized: false } : window)); // Unminimize the existing window
      return;
    }
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

  const takeScreenshot = () => {
    const screenshotElement = document.getElementById("screen");
    const elementToHide = document.getElementById("screenshot");
    elementToHide.style.display = 'hidden';
    if (screenshotElement) {
      html2canvas(screenshotElement).then((canvas) => {
        const link = canvas.toDataURL('image/png');
        setScreenshotUrl(link); 
        if (db) {
          const transaction = db.transaction("photos", "readwrite");
          const store = transaction.objectStore("photos");
          const request = store.add({ imageUrl: link, timestamp: new Date() });

          request.onsuccess = () => {
              console.log("Photo saved to IndexedDB");
          };

          request.onerror = (event) => {
              console.error("Error saving photo to IndexedDB:", event.target.error);
          };
        }
        setTimeout(() => {
          setScreenshotUrl(null);
        }, 2000); // Delay to allow the screenshot to be taken
      });
    }
    setTimeout(() => {
      elementToHide.style.display = 'block';
    }, 1000);
  }

  const closeWindow = (id) => {
    // setOpenedApps(openedApps.filter((app) => app !== windows.find((w) => w.id === id).appName));
    setWindows(windows.filter((window) => window.id !== id));
    setActiveWindow(windows[0]?.id || null); // Set the first window as active if available
    setOpenedApps(openedApps.filter((app) => app !== windows.find((w) => w.id === id).appName)); // Remove the app from openedApps
  }

  const closeAllWindows = (id) => {
    const findApp = windows.find((w) => w.id === id).appName;
    setWindows(windows.filter((window) => window.appName !== findApp));
  }

  // Function to handle file clicks
  const handleFileClick = (file) => {
    setOpenedFile(file); // Set the opened file
    openWindow("vscode"); // Open the Vscode app
  };

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
      if( event.code === 'KeyQ' && event.altKey) {
        console.log('Q');
        event.preventDefault(); // Prevent default behavior
        closeAllWindows(activeWindow); // Close the active window
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

  useEffect(() => {
    // Check screen width on component mount
    const checkScreenWidth = () => {
        setIsMobile(window.innerWidth <= 500);
    };

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenWidth);

    // Initial check
    checkScreenWidth();

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', checkScreenWidth);
}, []);


  if(isMobile) {
    return (
      <Iphone />
    )
  }

  if(restart){
    return <RestartScreen/>
  }

  if(!hydrated) return null;

  if(isLocked) {
    return <LockScreen/>
  }

  return (
    <div className={`relative ${isFullScreenshot && "group"}`}>
      <div id='screen' className="w-screen h-screen flex flex-col items-center">
        {!isLaunchpadOpen && <TopBar openWindow={openWindow} activeWindow={windows.filter((window) => window.id == activeWindow)}/>}
        <div className={`main flex-1 w-screen bg-${wallpaper} bg-cover`}>
          {windows.map((window) => (
            <AppManager
              db={db}
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
        </div>
        <ModernDock isVisible={isLaunchpadOpen} toggleLaunchpad={toggleLaunchpad} setWindows={setWindows} openWindow={openWindow} windows={windows}  />
        {isLaunchpadOpen && <Launchpad openWindow={openWindow} toggleLaunchpad={toggleLaunchpad}/>}
        {isAppSwitcherVisible && (
          <AppSwitcher openedApps={openedApps} selectedAppIndex={selectedAppIndex} />
        )}
      </div>
      {isFullScreenshot && <div onClick={takeScreenshot} className='hidden group-hover:block cursor-camera absolute top-0 left-0 w-full h-full bg-blue-300 rounded-md bg-opacity-35'></div>}
      {screenshotUrl && <div className="fixed w-40 right-2 bottom-2 border border-gray-100 rounded-md"><img className="rounded-md" src={screenshotUrl}/></div>}
    </div>
  );
}