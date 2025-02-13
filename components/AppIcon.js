import React from 'react';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';

const AppIcon = ({ appName, onClick, isOpen, isAppSwitcher }) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <div className='flex flex-col items-center'>
          <img
            onClick={onClick}
            src={`${appName.toLowerCase()}.png`}
            className={`${isAppSwitcher ? 'w-24' : 'w-14'} transition-transform duration-200 hover:scale-125`}
          />
          {isOpen && <div className='w-1 h-1 bg-white rounded-full mt-1'></div>}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{appName.replace(/\b\w/g, (char) => char.toUpperCase())}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default AppIcon;