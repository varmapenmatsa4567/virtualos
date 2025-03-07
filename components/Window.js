"use client";
import React from 'react';
import { Rnd } from 'react-rnd';
import WnManager from './WnManager';
import useSettingsStore from '@/stores/settings-store';

const Window = ({ onClick, isCustomized, isTransparent, isFixed, customSize, isActive, isMinimized, isMaximized, onClose, toggleMinimize, toggleMaximize, toolbar, children }) => {
  
  const height = window.innerHeight - 28;

  const { titleBarAction } = useSettingsStore();

  return (
    <Rnd
      default={{
        x: 300,
        y: 50,
        width: isFixed ? customSize.width : 600,
        height: isFixed ? customSize.height : 400,
      }}
      className={`${isActive && 'z-50'}`}
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
      <div onClick={onClick} className={`${!isTransparent && "bg-[#242227]"} overflow-hidden flex flex-col shadow-2xl cursor-default h-full rounded-lg border-[0.5px] border-[#7f7e7f]`}>
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
    </Rnd>
  );
};

export default Window;
