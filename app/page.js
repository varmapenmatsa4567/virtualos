"use client";
import AppManager from "@/components/AppManager";
import TopBar from "@/components/TopBar";
import { useState, useEffect, useRef } from "react";
import { initialStructure } from "@/utils/data";
import Launchpad from "@/apps/Launchpad/Launchpad";
import { ModernDock } from "@/components/ModernDock";
import Iphone from "@/mobile/Iphone";
import useSettingsStore from "@/stores/settings-store";
import LockScreen from "@/apps/LockScreen";
import RestartScreen from "@/apps/RestartScreen";
import useGlobalStore from "@/stores/global-store";
import html2canvas from "html2canvas";
import useWindowsStore from "@/stores/windows-store";
import Splotlight from "@/apps/Spotlight/Splotlight";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import useFinderStore from "@/stores/finder-store";
import Folder from "@/apps/ModernFinder/Folder";


export default function Home() {

  const { spotlightVisible, toggleSpotlightVisible } = useGlobalStore();

  const {finderItems, setFinderItems} = useFinderStore();
  const desktop = finderItems.filter(item => item.isSpecial && item.name === "Desktop")[0];
  const desktopItems = finderItems.filter(item => item.parentId === desktop.id);

  const {windows, setWindows, activeWindow, setActiveWindow, openedApps, setOpenedApps} = useWindowsStore();
  const [openedFile, setOpenedFile] = useState(null); // State to track the opened file
  const [selectedAppIndex, setSelectedAppIndex] = useState(0); // Track the selected app in the switcher
  const [isAppSwitcherVisible, setIsAppSwitcherVisible] = useState(false); // Control visibility of the app switcher
  const [isShiftKeyPressed, setIsShiftKeyPressed] = useState(false); // Track if Alt key is pressed
  const [isLaunchpadOpen, setIsLaunchpadOpen] = useState(false); // Track if Launchpad is open
  const [db, setDb] = useState(null); // State to hold the IndexedDB instance
  const [isTriggerKeyPressed, setIsTriggerKeyPressed] = useState(false); // Track if the trigger key is pressed

  const {wallpaper, isLocked, hydrated, restart} = useSettingsStore();
  const userAgent = navigator.userAgent;

  const {isFullScreenshot, screenshotUrl, setScreenshotUrl, closeScreenshot, showScreenshot, setShowScreenshot} = useGlobalStore();

  const {dbChange, setDbChange} = useGlobalStore();
  const [fileStructure, setFileStructure] = useState(initialStructure);
  const [isMobile, setIsMobile] = useState(false);

  // Spotlight
  const spotlightRef = useRef(null);
  useOutsideClick(spotlightRef, () => toggleSpotlightVisible(false));

  // Launchpad

  const toggleLaunchpad = () => {
    setIsLaunchpadOpen(!isLaunchpadOpen);
  }

  const getOS = () => {
    if(userAgent.includes("Windows")) {
      return "Windows";
    }
    return "Mac";
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

  const openWindow = (appName, extraProps = {}) => {
    setIsLaunchpadOpen(false); // Close the Launchpad when opening a new window
    if(windows.some((window) => window.appName === appName) && appName !== "imageviewer") {
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
      extraProps: extraProps
    };
    setWindows([...windows, newWindow]);
    if(appName !== "screenshot" && appName !== "imageviewer") setActiveWindow(newWindow.id);

    // Add the app to the openedApps list if it's not already there
    if (!openedApps.includes(appName) && appName !== "screenshot" && appName !== "imageviewer") {
      setOpenedApps([...openedApps, appName]);
    }
  };

  const openScreenshot = () => {
    const imageUrl = screenshotUrl;
    openWindow("imageviewer", { imageUrl });
  }

  const takeScreenshot = () => {
    const screenshotElement = document.getElementById("screen");
    setWindows(windows.filter((window) => window.appName !== "screenshot"));
    closeScreenshot();
    if (screenshotElement) {
      html2canvas(screenshotElement).then((canvas) => {
        const link = canvas.toDataURL('image/png');
        setScreenshotUrl(link); 
        setShowScreenshot(true);
        const audio = new Audio("/audio/ScreenCapture.mp3");
        audio.play();
        if (db) {
          const transaction = db.transaction("photos", "readwrite");
          const store = transaction.objectStore("photos");
          const request = store.add({ imageUrl: link, timestamp: new Date(), isScreenshot: true });

          request.onsuccess = () => {
              console.log("Photo saved to IndexedDB");
          };

          request.onerror = (event) => {
              console.error("Error saving photo to IndexedDB:", event.target.error);
          };

          setDbChange(dbChange + 1);
        }
        setTimeout(() => {
          setShowScreenshot(false);
        }, 2000); // Delay to allow the screenshot to be taken
      });
    }
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
    const os = getOS();
    const handleKeyDown = (event) => {
      console.log(event);
      // event.preventDefault();
      if( event.altKey && os === "Mac") {
        setIsTriggerKeyPressed(true); // Set Alt key as pressed
        setIsAppSwitcherVisible(true); // Show the app switcher
      }

      if (event.key === 'Tab' && isTriggerKeyPressed) {
        // event.preventDefault(); // Prevent default Tab behavior
        setSelectedAppIndex((prevIndex) => (prevIndex + 1) % openedApps.length); // Cycle through apps
      }

      if( event.code === 'KeyW' && event.altKey) {
        // event.preventDefault(); // Prevent default behavior
        closeWindow(activeWindow); // Close the active window
      }
      if( event.code === 'KeyQ' && event.altKey) {
        console.log('Q');
        // event.preventDefault(); // Prevent default behavior
        closeAllWindows(activeWindow); // Close the active window
      }
    };

    const handleKeyUp = (event) => {
      if (event.altKey && os === "Mac") {
        setIsTriggerKeyPressed(false); // Set Alt key as released
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
          <div className='w-full h-full p-3 px-6 flex gap-x-4 gap-y-2 flex-wrap'>
            {desktopItems && desktopItems.map((item, index) => {
              if(item.isDir) {
                return (
                  <Folder
                    openFolder={() => openWindow("finder", { requiredItemId: item.id })}
                    folderName={item.name} 
                    key={index}
                    item={item}
                  />
                )
              }
            })}
          </div>
          {windows.map((window) => (
            <AppManager
              db={db}
              openedFile={openedFile}
              fileStructure={fileStructure}
              setFileStructure={setFileStructure}
              handleFileClick={handleFileClick}
              appName={window.appName}
              key={window.id}
              extraProps={window.extraProps}
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
        {/* <SiriChat /> */}
        {isLaunchpadOpen && <Launchpad openWindow={openWindow} toggleLaunchpad={toggleLaunchpad}/>}
        {spotlightVisible && <Splotlight ref={spotlightRef} openWindow={openWindow}/>}
        {/* {isAppSwitcherVisible && (
          <AppSwitcher openedApps={openedApps} selectedAppIndex={selectedAppIndex} />
        )} */}
      </div>

      {isFullScreenshot && <div onClick={takeScreenshot} className='hidden group-hover:block z-[65] cursor-camera absolute top-0 left-0 w-full h-full bg-blue-300 rounded-md bg-opacity-35'></div>}
      {showScreenshot && <div onClick={openScreenshot} className="fixed w-40 right-2 bottom-2 border border-gray-100 rounded-md"><img className="rounded-md" src={screenshotUrl}/></div>}
    </div>
  );
}