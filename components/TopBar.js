import React, { useEffect, useState } from 'react';
import { FaApple } from 'react-icons/fa';
import { formatDate } from '../utils/utils';
import { IoBatteryFull, IoSearch, IoBluetooth } from 'react-icons/io5';
import { IoIosWifi } from 'react-icons/io';

const TopBar = ({activeWindow}) => {
  const [formattedDate, setFormattedDate] = useState([]);
  // console.log(activeWindow);

  useEffect(() => {
    const updateDate = () => {
      const currentDate = new Date();
      setFormattedDate(formatDate(currentDate));
    };

    updateDate(); // Initial call
    const intervalId = setInterval(updateDate, 1000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div className='w-screen h-7 bg-[#1a1e4b] px-4 flex items-center text-white justify-between'>
      <div className='flex items-center gap-2'>
        <FaApple className='text-white text-lg' />
        <p className='text-[13px] font-extrabold capitalize'>{activeWindow && activeWindow.length > 0 && activeWindow[0].appName}</p>
      </div>
      <div className='flex cursor-default items-center gap-3'>
        <IoBluetooth />
        <div className='flex items-center gap-1'>
          <p className='text-xs'>100%</p>
          <IoBatteryFull className='text-white text-2xl'/>
        </div>
        <IoIosWifi className='text-lg'/>
        <IoSearch className="text-white" />
        <div className='flex items-center gap-2'>
            <p className='text-sm'>{formattedDate[0]}</p>
            <p className='text-sm'>{formattedDate[1]}</p>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
