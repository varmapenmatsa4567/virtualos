"use client";
import React from 'react';
import { Rnd } from 'react-rnd';
import WnManager from './WnManager';
import useSettingsStore from '@/stores/settings-store';
import html2canvas from 'html2canvas';
import useGlobalStore from '@/stores/global-store';
import useWindowsStore from '@/stores/windows-store';
import { useEffect, useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './ui/resizable';

const ModernWindow = ({db, sidebar, isSmall, appName, onClick, isCustomized, isTransparent, isFixed, customSize, isActive, isMinimized, isMaximized, onClose, toggleMinimize, toggleMaximize, toolbar, children }) => {
  
  const height = window.innerHeight - 28;

  const { windows, setWindows, appsState, setAppsState } = useWindowsStore();
  const { closeScreenshot } = useGlobalStore();

  const { titleBarAction } = useSettingsStore();

  const { isWindowScreenshot, setScreenshotUrl, setShowScreenshot} = useGlobalStore();

  useEffect(() => {
    if (!(appName in appsState)) {
      const newAppState = {
        ...appsState,
        [appName]: {
          x: 300,
          y: 50,
          width: isFixed ? customSize.width : 600,
          height: isFixed ? customSize.height : 400,
        },
      };
      setAppsState(newAppState); // Safe to call setState inside useEffect
    }
  }, [appName, appsState, isFixed, customSize, setAppsState]); // Add dependencies

  let defaults = {
    x: 50,
    y: 50,
    width: isCustomized ? customSize.width : 600,
    height: isCustomized ? customSize.height : 400,
  };

  if(appName in appsState) {
    defaults = appsState[appName];
  }

  const handleDragStop = (e, data) => {
    const app = appsState[appName];
    app.x = data.x;
    app.y = data.y;
    setAppsState({ ...appsState, [appName]: app });
  };

  const handleResizeStop = (e, direction, ref, delta, position) => {
    const app = appsState[appName];
    app.width = ref.style.width;
    app.height = ref.style.height;
    app.x = position.x;
    app.y = position.y;
    setAppsState({ ...appsState, [appName]: app });
  };

  const takeScreenshot = () => {
    const screenshotElement = document.getElementById(appName);
    setWindows(windows.filter((window) => window.appName !== "screenshot"));
    closeScreenshot();
    if (screenshotElement) {
      html2canvas(screenshotElement).then((canvas) => {
        const link = canvas.toDataURL('image/png');
        const audio = new Audio("/audio/ScreenCapture.mp3");
        audio.play();
        setScreenshotUrl(link);
        setShowScreenshot(true);
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
          setShowScreenshot(false);
        }, 2000); // Delay to allow the screenshot to be taken
      });
    }
  }

  return (
    <Rnd
      default={defaults}
      className={`${isActive && 'z-50'} ${isWindowScreenshot && "group relative"}`}
      size={isMaximized ? { width: "100%", height: `${height}px` } : null}
      position={isMaximized ? { x: 0, y: 0 } : null}
      enableResizing={!isMaximized && !isFixed}
      disableDragging={isMaximized}
      minWidth={isCustomized ? customSize.width : 500}
      minHeight={isCustomized ? customSize.height : 300}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      bounds=".main"
      dragHandleClassName="toolbar"
      style={{
        display: isMinimized ? "none" : "block",  
      }}
    >
      <div id={appName} onClick={onClick} className={` ${isSmall && "scale-[0.1]"} overflow-hidden flex flex-col shadow-2xl cursor-default h-full rounded-lg border-[0.5px] border-[#7f7e7f]`}>
        <ResizablePanelGroup
            direction="horizontal"
            className={`w-full`}
        >
            <ResizablePanel minSize={10} maxSize={40} defaultSize={10}>
                <div className="flex h-full bg-black bg-opacity-30 backdrop-filter backdrop-blur-2xl">
                    <div className='flex items-start gap-2 p-2 px-2 flex-col'>
                        <WnManager onClose={onClose} toggleMinimize={toggleMinimize} toggleFullScreen={toggleMaximize} disabled={isMaximized} />
                        {sidebar}
                    </div>
                </div>
            </ResizablePanel>
            <ResizableHandle className={`bg-black`}/>
            <ResizablePanel defaultSize={50}>
                {children}
            </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      {isWindowScreenshot && <div onClick={takeScreenshot} className='hidden group-hover:block cursor-camera absolute top-0 left-0 w-full h-full bg-blue-300 rounded-md bg-opacity-35'></div>}
    </Rnd>
  );
};

export default ModernWindow;
