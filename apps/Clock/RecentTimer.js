import React from 'react'
import { FaPlay } from 'react-icons/fa'
import { RxCross1 } from 'react-icons/rx'
import Dots from './Dots';

const RecentTimer = ({timer}) => {
    const remainingTime = timer.time;
  return (
    <div className='bg-[#323232] w-48 h-48 rounded-2xl p-5 relative flex flex-col'>
        <div className={`w-full ${(remainingTime / 3600) >= 1 ? "text-3xl" : "text-4xl"} text-[#a2a2a2] h-full border-[6px] border-[#49494b] rounded-full flex font-light items-center justify-center`}>
            {(remainingTime / 3600) >= 1 && (
                <>
                    <p>{String(Math.floor(remainingTime / 3600)).padStart(2, '0')}</p>
                    <Dots color='bg-[#a2a2a2]' height="h-5" gap="gap-[3px]" size='w-[5px] h-[5px]' px='px-1'/>
                </>
            )}
            <p>{String(Math.floor((remainingTime % 3600) / 60)).padStart(2, '0')}</p>
            <Dots color='bg-[#a2a2a2]' height="h-10" gap="gap-[8px]" size='w-[5px] h-[5px]' px='px-1'/>
            <p>{String((remainingTime % 60)).padStart(2, '0')}</p>
        </div>
        <div className='absolute bg-[#464646] rounded-full p-1.5 cross-recent w-fit bottom-3 left-3 h-fit flex items-center justify-center'>
            <RxCross1 className='text-gray-400 text-sm' />
        </div>
        <div className='absolute bg-[#39613b] rounded-full p-1.5 cross-recent w-fit bottom-3 right-3 h-fit flex items-center justify-center'>
            <FaPlay className='text-[#32d74b] pl-0.5 text-xs' />
        </div>
    </div>
  )
}

export default RecentTimer