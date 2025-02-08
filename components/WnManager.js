import React from 'react';
import { Maximize2, Minimize2, Minus, X } from 'lucide-react';

const WnManager = ({ onClose, toggleMinimize, toggleFullScreen, disabled }) => {
  return (
    <div className='flex gap-2 group w-fit p-2'>
        <div onClick={onClose} className='bg-[#fe5f58] w-3 h-3 rounded-full flex items-center justify-center p-[1px]'>
            <X className='hidden group-hover:block'/>
        </div>
        <div onClick={toggleMinimize} className='bg-[#febc30] w-3 h-3 rounded-full flex items-center justify-center p-[1px]'>
            <Minus className='hidden group-hover:block'/>
        </div>
        <div onClick={toggleFullScreen} className="bg-[#28c840] w-3 h-3 rounded-full flex items-center justify-center p-[2px]">
            {!disabled ? <Maximize2 className='hidden group-hover:block'/> : <Minimize2 className='hidden group-hover:block'/>}
        </div>
    </div>
  )
}

export default WnManager