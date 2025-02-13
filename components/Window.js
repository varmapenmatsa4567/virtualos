"use client";
import React from 'react';
import { Rnd } from 'react-rnd';
import WnManager from './WnManager';

const Window = ({ onClick, isCustomized, customSize, isActive, isMinimized, isMaximized, onClose, toggleMinimize, toggleMaximize, toolbar, children }) => {
  return (
    <Rnd
      default={{
        x: 150,
        y: 205,
        width: 600,
        height: 400,
      }}
      className={`${isActive && 'z-50'}`}
      size={isMaximized ? { width: "100vw", height: "100vh" } : isCustomized ? customSize : null}
      position={isMaximized ? { x: 0, y: 0 } : null}
      enableResizing={!isMaximized && !isCustomized}
      disableDragging={isMaximized}
      minWidth={500}
      minHeight={200}
      bounds=".main"
      dragHandleClassName="toolbar"
      style={{
        display: isMinimized ? "none" : "block",  
      }}
    >
      <div onClick={onClick} className={`bg-[#242227] overflow-hidden flex flex-col shadow-2xl cursor-default h-full rounded-lg`}>
        <div onDoubleClick={toggleMaximize} className="bg-[#3c3639] rounded-t-lg w-full h-10 flex items-center toolbar">
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
        <div className='flex-1 w-full h-full'>
          {children}
        </div>
      </div>
    </Rnd>
  );
};

export default Window;
