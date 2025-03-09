"use client";
import React from 'react';
import { Rnd } from 'react-rnd';
import WnManager from './WnManager';
import useSettingsStore from '@/stores/settings-store';
import html2canvas from 'html2canvas';
import useGlobalStore from '@/stores/global-store';
import useWindowsStore from '@/stores/windows-store';

const Window = ({
  db,
  appName,
  onClick,
  isCustomized,
  isTransparent,
  isFixed,
  customSize,
  isActive,
  isMinimized,
  isMaximized,
  onClose,
  toggleMinimize,
  toggleMaximize,
  toolbar,
  children,
}) => {
  const height = window.innerHeight - 28;

  const { windows, setWindows, appsState, setAppsState } = useWindowsStore();
  const { closeScreenshot } = useGlobalStore();
  const { titleBarAction } = useSettingsStore();
  const { isWindowScreenshot, setScreenshotUrl } = useGlobalStore();

  // Initialize app state if it doesn't exist
  if (!(appName in appsState)) {
    const newAppState = {
      ...appsState,
      [appName]: {
        x: 300,
        y: 50,
        width: isFixed ? customSize.width : 600,
        height: isFixed ? customSize.height : 400,
        isMaximized: false, // Track maximize state
        original: null, // Store original dimensions and position
      },
    };
    setAppsState(newAppState);
  }

  const defaults = appsState[appName];

  // Handle window drag
  const handleDragStop = (e, data) => {
    const app = appsState[appName];
    app.x = data.x;
    app.y = data.y;
    setAppsState({ ...appsState, [appName]: app });
  };

  // Handle window resize
  const handleResizeStop = (e, direction, ref, delta, position) => {
    const app = appsState[appName];
    app.width = ref.style.width;
    app.height = ref.style.height;
    app.x = position.x;
    app.y = position.y;
    setAppsState({ ...appsState, [appName]: app });
  };

  // Handle maximize/restore
  const handleMaximize = () => {
    const app = appsState[appName];
    if (!app.isMaximized) {
      // Store original dimensions and position before maximizing
      app.original = {
        x: app.x,
        y: app.y,
        width: app.width,
        height: app.height,
      };
      // Set maximized state
      app.x = 0;
      app.y = 0;
      app.width = '100%';
      app.height = `${height}px`;
      app.isMaximized = true;
    } else {
      // Restore original dimensions and position
      app.x = app.original.x;
      app.y = app.original.y;
      app.width = app.original.width;
      app.height = app.original.height;
      app.isMaximized = false;
    }
    setAppsState({ ...appsState, [appName]: app });
    toggleMaximize(); // Trigger the maximize toggle in the parent component
  };

  const takeScreenshot = () => {
    const screenshotElement = document.getElementById(appName);
    setWindows(windows.filter((window) => window.appName !== 'screenshot'));
    closeScreenshot();
    if (screenshotElement) {
      html2canvas(screenshotElement).then((canvas) => {
        const link = canvas.toDataURL('image/png');
        const audio = new Audio('/audio/ScreenCapture.mp3');
        audio.play();
        setScreenshotUrl(link);
        if (db) {
          const transaction = db.transaction('photos', 'readwrite');
          const store = transaction.objectStore('photos');
          const request = store.add({ imageUrl: link, timestamp: new Date() });

          request.onsuccess = () => {
            console.log('Photo saved to IndexedDB');
          };

          request.onerror = (event) => {
            console.error('Error saving photo to IndexedDB:', event.target.error);
          };
        }
        setTimeout(() => {
          setScreenshotUrl(null);
        }, 2000); // Delay to allow the screenshot to be taken
      });
    }
  };

  return (
    <Rnd
      default={defaults}
      className={`${isActive && 'z-50'} ${isWindowScreenshot && 'group relative'}`}
      size={isMaximized ? { width: '100%', height: `${height}px` } : null}
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
        display: isMinimized ? 'none' : 'block',
      }}
    >
      <div
        id={appName}
        onClick={onClick}
        className={`${!isTransparent && 'bg-[#242227]'} overflow-hidden flex flex-col shadow-2xl cursor-default h-full rounded-lg border-[0.5px] border-[#7f7e7f]`}
      >
        <div
          onDoubleClick={titleBarAction == 'maximize' ? handleMaximize : titleBarAction == 'minimize' ? toggleMinimize : null}
          className="bg-[#3c3639] rounded-t-lg w-full h-10 flex items-center toolbar"
        >
          <WnManager
            onClose={onClose}
            toggleMinimize={toggleMinimize}
            toggleFullScreen={handleMaximize}
            disabled={isMaximized}
          />
          <div className="flex-1">{toolbar}</div>
        </div>
        <div className="h-[calc(100%-40px)] w-full">{children}</div>
      </div>
      {isWindowScreenshot && (
        <div
          onClick={takeScreenshot}
          className="hidden group-hover:block cursor-camera absolute top-0 left-0 w-full h-full bg-blue-300 rounded-md bg-opacity-35"
        ></div>
      )}
    </Rnd>
  );
};

export default Window;