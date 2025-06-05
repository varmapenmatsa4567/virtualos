import React from 'react';
import Dots from './Dots';

const Lap = ({lapNo, split, total, isSlowest, isFastest}) => {

    // Add leading zeros to the numbers
    const splitMins = String(Math.floor((split / 1000 / 60) % 60)).padStart(2, '0');
    const splitSecs = String(Math.floor((split / 1000) % 60)).padStart(2, '0');
    const splitMs = String(Math.floor((split % 1000) / 10)).padStart(2, '0');

    const totalMins = String(Math.floor((total / 1000 / 60) % 60)).padStart(2, '0');
    const totalSecs = String(Math.floor((total / 1000) % 60)).padStart(2, '0');
    const totalMs = String(Math.floor((total % 1000) / 10)).padStart(2, '0');
    
  return (
    <div className={`${isFastest ? "text-[#32d74b]" : isSlowest ? "text-[#ff453a]" : "text-white"} tabular-nums text-[13px] my-1.5 flex`}>
        <p className='w-1/5'>{"Lap "+lapNo}</p>
        <div className='flex w-2/5 justify-end'>
            <p>{splitMins}</p>
            <Dots color={isFastest ? "bg-[#32d74b]" : isSlowest ? "bg-[#ff453a]" : "bg-white"} height="h-5" gap="gap-[3px]" size='[2px]' px='px-0.5'/>
            <p>{splitSecs}</p>
            <span className=''>.</span>
            <p>{splitMs}</p>
        </div>
        <div className='flex w-2/5 justify-end'>
            <p>{totalMins}</p>
            <Dots color={isFastest ? "bg-[#32d74b]" : isSlowest ? "bg-[#ff453a]" : "bg-white"} height="h-5" gap="gap-[3px]" size='[2px]' px='px-0.5'/>
            <p>{totalSecs}</p>
            <span className=''>.</span>
            <p>{totalMs}</p>
        </div>
    </div>
  )
}

export default Lap