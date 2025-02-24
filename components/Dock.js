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

  const apps = [
    { appName: 'finder'},
    { appName: 'clock'},
    // { appName: 'terminal'},
    { appName: 'launchpad', onClick: toggleLaunchpad, isApp: false},
    { appName: 'calculator'},
    { appName: 'notes'},
    { appName: 'photobooth'},
    { appName: 'photos'},
    { appName: 'safari'},
    { appName: 'settings'},
    { appName: 'vscode'},
    { appName: 'calendar'},
    { appName: 'sudoko'},
    { appName: 'vlcplayer'},

  ]

return (
    <TooltipProvider>
        <div className='absolute z-20 bottom-1 w-full flex justify-center group'>
            <div className={`w-fit ${isVisible ? "visible" : "invisible"} group-hover:visible flex z-20 p-1 gap-1 items-center h-fit bg-black bg-opacity-30 border-[0.1px] border-gray-700 px-2 rounded-2xl`}>
                {apps.map((app) => (
                    <AppIcon
                        appName={app.appName}
                        onClick={() => app.onClick ? app.onClick() : openWindow(app.appName)}
                        key={app.appName}
                        isOpen={app.onClick ? false: isAppOpen(app.appName)}
                    />
                ))}
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