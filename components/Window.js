"use client";
import React from 'react';
import { Rnd } from 'react-rnd';
import WnManager from './WnManager';
import useSettingsStore from '@/stores/settings-store';
import html2canvas from 'html2canvas';
import useGlobalStore from '@/stores/global-store';
import useWindowsStore from '@/stores/windows-store';
import { useEffect, useState } from 'react';
import { stopPropagation } from '@/utils/utils';
import { motion, AnimatePresence } from 'framer-motion';

const Window = ({db, isSmall, appName, onClick, isCustomized, isTransparent, isFixed, customSize, isActive, isMinimized, isMaximized, onClose, toggleMinimize, toggleMaximize, toolbar, toolbarColor, toolbarHeight, children, isSepNot }) => {
  
  const height = window.innerHeight - 28;

  const { windows, setWindows, appsState, setAppsState } = useWindowsStore();
  const { closeScreenshot } = useGlobalStore();

  const { titleBarAction } = useSettingsStore();

  const { isWindowScreenshot, setScreenshotUrl, setShowScreenshot} = useGlobalStore();

  const { dbChange, setDbChange } = useGlobalStore();

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
      setAppsState(newAppState);
    }
  }, [appName, appsState, isFixed, customSize, setAppsState]);

  let defaults = {
    x: 300,
    y: 50,
    width: isFixed ? customSize.width : 600,
    height: isFixed ? customSize.height : 400,
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
        console.log("Screenshot taken");
        if (db) {
          console.log("Saving to IndexedDB");
          const transaction = db.transaction("photos", "readwrite");
          const store = transaction.objectStore("photos");
          const request = store.add({ imageUrl: link, timestamp: new Date() });

          request.onsuccess = () => {
              console.log("Photo saved to IndexedDB");
          };

          request.onerror = (event) => {
              console.error("Error saving photo to IndexedDB:", event.target.error);
          };

          setDbChange(dbChange + 1);
      }
        setTimeout(() => {
          setScreenshotUrl(null);
          setShowScreenshot(false);
        }, 2000);
      });
    }
  }

  const variants = {
    minimized: {
      scale: 0,
      y: 700,
      x: 500,
      transition: { 
        duration: 0.3,
      }
    },
    normal: {
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.3,
      }
    }
  };

  return (
    <AnimatePresence>
      {!isMinimized && (
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
        >
          <motion.div 
            id={appName} 
            onClick={onClick} 
            className={`${!isTransparent && "bg-[#242227]"} ${isSmall && "scale-[0.1]"} overflow-hidden flex flex-col shadow-2xl cursor-default h-full rounded-lg border-[0.5px] border-[#7f7e7f]`}
            initial="normal"
            animate={isMinimized ? "minimized" : "normal"}
            variants={variants}
            exit="minimized"
          >
            <div onDoubleClick={titleBarAction == "maximize" ? toggleMaximize : titleBarAction == "minimize" ? toggleMinimize : null} className={`${toolbarColor != null ? toolbarColor : "bg-[#3c3639]"} rounded-t-lg w-full ${toolbarHeight != null ? toolbarHeight : "h-10"} flex items-center toolbar ${!isSepNot && "border-b border-black"}`}>
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
            <div onContextMenu={stopPropagation} className='h-[calc(100%-40px)] w-full'>
              {children}
            </div>
          </motion.div>
          {isWindowScreenshot && <div onClick={takeScreenshot} className='hidden group-hover:block cursor-camera absolute top-0 left-0 w-full h-full bg-blue-300 rounded-md bg-opacity-35'></div>}
        </Rnd>
      )}
    </AnimatePresence>
  );
};

export default Window;