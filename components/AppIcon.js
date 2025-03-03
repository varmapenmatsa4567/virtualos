import React from 'react';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';

const AppIcon = ({ appName, openApp, onClick, isOpen, isAppSwitcher, isMobile, titleRequired }) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <div onClick={isMobile ? () => openApp(appName) : onClick} className='flex flex-col items-center'>
          <img
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            src={`${appName.toLowerCase()}.png`}
            className={`${isAppSwitcher ? 'w-24' : isMobile ? 'w-28' : 'w-14'} pointer-events-none transition-transform duration-200 ${isMobile ? "" : "hover:scale-125"}`}
          />
          {titleRequired && <p className='text-white select-none text-xs'>{appName.replace(/\b\w/g, (char) => char.toUpperCase())}</p>}
          {isOpen && <div className='w-1 h-1 bg-white rounded-full mt-1'></div>}
        </div>
      </TooltipTrigger>
      {!isMobile && (
        <TooltipContent>
          <p>{appName.replace(/\b\w/g, (char) => char.toUpperCase())}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export default AppIcon;