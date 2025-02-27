import React from 'react';
import { SlidingNumber } from '@/components/ui/sliding-number';
import Dots from './Dots';

const Lap = ({lapNo, split, total}) => {

    // Add leading zeros to the numbers
    const splitMins = String(Math.floor((split / 1000 / 60) % 60)).padStart(2, '0');
    const splitSecs = String(Math.floor((split / 1000) % 60)).padStart(2, '0');
    const splitMs = String(Math.floor((split % 1000) / 10)).padStart(2, '0');

    const totalMins = String(Math.floor((total / 1000 / 60) % 60)).padStart(2, '0');
    const totalSecs = String(Math.floor((total / 1000) % 60)).padStart(2, '0');
    const totalMs = String(Math.floor((total % 1000) / 10)).padStart(2, '0');
    
  return (
    <div className='text-white tabular-nums text-[13px] my-1.5 font-medium flex justify-between'>
        <p>{"Lap "+lapNo}</p>
        <div className='flex'>
            <p>{splitMins}</p>
            <Dots height="h-5" gap="gap-[3px]" size='[2px]' px='px-0.5'/>
            <p>{splitSecs}</p>
            <span className=''>.</span>
            <p>{splitMs}</p>
        </div>
        <div className='flex'>
            <p>{totalMins}</p>
            <Dots height="h-5" gap="gap-[3px]" size='[2px]' px='px-0.5'/>
            <p>{totalSecs}</p>
            <span className=''>.</span>
            <p>{totalMs}</p>
        </div>
    </div>
  )
}

export default Lap