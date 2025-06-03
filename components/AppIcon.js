import { appLabels, unavailableApps } from '@/utils/data';
import React from 'react';

const AppIcon = ({ appName, openApp, onClick, isOpen, isAppSwitcher, isMobile, titleRequired }) => {

  let appLabel = appName;

  if(appName in appLabels) {
    appLabel = appLabels[appName];
  }

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', appName);
  }

  return (
    <div draggable onDragStart={handleDragStart} onClick={isMobile ? () => openApp(appName) : onClick} className='flex flex-col items-center'>
      <img
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
        src={`${appName.toLowerCase()}.png`}
        className={`${isAppSwitcher ? 'w-[90px]' : isMobile ? 'w-28' : 'w-14'} ${unavailableApps.includes(appName) && "opacity-40"} pointer-events-none transition-transform duration-200 ${isMobile ? "" : "hover:scale-125"}`}
      />
      {titleRequired && <p className={`text-white select-none ${isAppSwitcher ? "text-[13px]" : "text-xs"}`}>{appLabel.replace(/\b\w/g, (char) => char.toUpperCase())}</p>}
      {isOpen && <div className='w-1 h-1 bg-white rounded-full mt-1'></div>}
    </div>
  );
};

export default AppIcon;