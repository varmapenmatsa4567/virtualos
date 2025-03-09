"use client";
import React from 'react';
import { Rnd } from 'react-rnd';
import WnManager from './WnManager';
import useSettingsStore from '@/stores/settings-store';
import html2canvas from 'html2canvas';
import useGlobalStore from '@/stores/global-store';

const Window = ({db, appName, onClick, isCustomized, isTransparent, isFixed, customSize, isActive, isMinimized, isMaximized, onClose, toggleMinimize, toggleMaximize, toolbar, children }) => {
  
  const height = window.innerHeight - 28;

  const { titleBarAction } = useSettingsStore();

  const { isWindowScreenshot, setScreenshotUrl } = useGlobalStore();

  const takeScreenshot = () => {
    const screenshotElement = document.getElementById(appName);
    if (screenshotElement) {
      html2canvas(screenshotElement).then((canvas) => {
        const link = canvas.toDataURL('image/png');
        const audio = new Audio("/audio/ScreenCapture.mp3");
        audio.play();
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
  }

  return (
    <Rnd
      default={{
        x: 300,
        y: 50,
        width: isFixed ? customSize.width : 600,
        height: isFixed ? customSize.height : 400,
      }}
      className={`${isActive && 'z-50'} ${isWindowScreenshot && "group relative"}`}
      size={isMaximized ? { width: "100%", height: `${height}px` } : null}
      position={isMaximized ? { x: 0, y: 0 } : null}
      enableResizing={!isMaximized && !isFixed}
      disableDragging={isMaximized}
      minWidth={isCustomized ? customSize.width : 500}
      minHeight={isCustomized ? customSize.height : 300}
      bounds=".main"
      dragHandleClassName="toolbar"
      style={{
        display: isMinimized ? "none" : "block",  
      }}
    >
      <div id={appName} onClick={onClick} className={`${!isTransparent && "bg-[#242227]"} overflow-hidden flex flex-col shadow-2xl cursor-default h-full rounded-lg border-[0.5px] border-[#7f7e7f]`}>
        <div onDoubleClick={titleBarAction == "maximize" ? toggleMaximize : titleBarAction == "minimize" ? toggleMinimize : null} className="bg-[#3c3639] rounded-t-lg w-full h-10 flex items-center toolbar">
          <WnManager
            onClose={onClose}
            toggleMinimize={toggleMinimize}
            toggleFullScreen={toggleMaximize}
            disabled={isMaximized}
          />
          <div className='flex-1'>
            {toolbar}
          </div>
        </div>
        <div className='h-[calc(100%-40px)] w-full'>
          {children}
        </div>
      </div>
      {isWindowScreenshot && <div onClick={takeScreenshot} className='hidden group-hover:block cursor-camera absolute top-0 left-0 w-full h-full bg-blue-300 rounded-md bg-opacity-35'></div>}
    </Rnd>
  );
};

export default Window;
