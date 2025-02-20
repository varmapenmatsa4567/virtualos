'use client';
import React from 'react';
import AppIcon from './AppIcon';
import { TooltipProvider } from './ui/tooltip';
import Launchpad from '@/apps/Launchpad/Launchpad';

const Dock = ({ isVisible, toggleLaunchpad, setWindows, openWindow, windows }) => {
  const minimizedWindows = windows.filter((window) => window.isMinimized);

  const isAppOpen = (appName) => {
    return windows.some((window) => window.appName === appName);
  }

return (
    <TooltipProvider>
        <div className='absolute z-20 bottom-1 w-full flex justify-center group'>
            <div className={`w-fit ${isVisible ? "visible" : "invisible"} group-hover:visible flex z-20 p-1 gap-1 items-center h-fit bg-black bg-opacity-30 border-[0.1px] border-gray-700 px-2 rounded-2xl`}>
                <AppIcon appName={'finder'} onClick={() => openWindow('finder')} isOpen={isAppOpen("finder")}/>
                <AppIcon appName={'clock'} onClick={() => openWindow('clock')} isOpen={isAppOpen("clock")}/>
                <AppIcon appName={'terminal'} onClick={() => openWindow('terminal')} isOpen={isAppOpen("terminal")}/>
                <AppIcon appName={'launchpad'} onClick={toggleLaunchpad}  />
                <AppIcon appName={'calculator'} onClick={() => openWindow('calculator')} isOpen={isAppOpen("calculator")}/>
                <AppIcon appName={'notes'} onClick={() => openWindow('notes')} isOpen={isAppOpen("notes")}/>
                <AppIcon appName={'photobooth'} onClick={() => openWindow('photobooth')} isOpen={isAppOpen("photobooth")}/>
                <AppIcon appName={'photos'} onClick={() => openWindow('photos')} isOpen={isAppOpen("photos")}/>
                <AppIcon appName={'safari'} onClick={() => openWindow('safari')} isOpen={isAppOpen("safari")}/>
                <AppIcon appName={'settings'} onClick={() => openWindow('settings')} isOpen={isAppOpen("settings")}/>
                <AppIcon appName={'vscode'} onClick={() => openWindow('vscode')} isOpen={isAppOpen("vscode")}/>
                <AppIcon appName={'calendar'} onClick={() => openWindow('calendar')} isOpen={isAppOpen("calendar")} />
                <AppIcon appName={'sudoko'} onClick={() => openWindow('sudoko')} isOpen={isAppOpen("sudoko")} />
                {minimizedWindows.length > 0 && (
                    <div className='h-14 border-[1px] mx-2'></div>
                )}
                {minimizedWindows && minimizedWindows.map((window) => (
                    <AppIcon
                        appName={window.appName}
                        onClick={() => setWindows(windows.map((w) => w.id === window.id ? { ...w, isMinimized: !w.isMinimized } : w))}
                        key={window.id}
                    />
                ))}
                <div className='h-14 border-l-[1px] mx-2'></div>
                <AppIcon appName={'trash-full'} onClick={() => openWindow('Trash')} />
            </div>
        </div>
    </TooltipProvider>
);
}

export default Dock;