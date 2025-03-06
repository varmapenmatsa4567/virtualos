import useSettingsStore from '@/stores/settings-store'
import { lockScreenDate, lockScreenTime } from '@/utils/utils';
import React, { useState, useEffect } from 'react'
import { MdEmojiEmotions } from 'react-icons/md';

const LockScreen = () => {

    const {wallpaper, toggleLock} = useSettingsStore();
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const updateDate = () => {
          const currentDate = new Date();
          setDate(currentDate);
        };
    
        updateDate(); // Initial call
        const intervalId = setInterval(updateDate, 1000); // Update every minute
    
        return () => clearInterval(intervalId); // Cleanup on unmount
      }, []);

  return (
    <div onClick={toggleLock} className={`bg-${wallpaper} flex-col justify-between bg-cover w-screen h-screen flex items-center py-20`}>
        <div className='flex flex-col text-[#a7a9d7] items-center'>
            <p className='text-xl font-medium'>{lockScreenDate(date)}</p>
            <p className='text-8xl font-semibold'>{lockScreenTime(date)}</p>
        </div>
        <div className='flex flex-col items-center gap-2'>
            <div className='flex items-center justify-center p-1 rounded-full bg-[#989899]'>
                <MdEmojiEmotions className='text-yellow-500 text-xl'/>
            </div>
            <p className='text-white text-sm font-semibold'>Virtual OS</p>
            <p className='text-[#e89ca4] text-xs font-semibold'>Touch ID or Enter Password</p>
        </div>
    </div>
  )
}

export default LockScreen