'use client';
import React from 'react';
import AppIcon from './AppIcon';
import { TooltipProvider } from './ui/tooltip';

const Dock = ({ setWindows, openWindow, windows }) => {
  const minimizedWindows = windows.filter((window) => window.isMinimized);

return (
    <TooltipProvider>
        <div className='absolute bottom-1 w-full flex justify-center group'>
            <div className='w-fit invisible group-hover:visible flex z-20 p-1 gap-1 items-center h-fit bg-black bg-opacity-30 border-[0.1px] border-gray-700 px-2 rounded-2xl'>
                <AppIcon appName={'finder'} onClick={() => openWindow('finder')} />
                <AppIcon appName={'clock'} onClick={() => openWindow('clock')} />
                <AppIcon appName={'launchpad'} onClick={() => openWindow('launchpad')} />
                <AppIcon appName={'calculator'} onClick={() => openWindow('calculator')} />
                <AppIcon appName={'notes'} onClick={() => openWindow('notes')} />
                <AppIcon appName={'photos'} onClick={() => openWindow('photos')} />
                <AppIcon appName={'safari'} onClick={() => openWindow('safari')} />
                <AppIcon appName={'settings'} onClick={() => openWindow('settings')} />
                <AppIcon appName={'vscode'} onClick={() => openWindow('vscode')} />
                <AppIcon appName={'calendar'} onClick={() => openWindow('calendar')} />
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