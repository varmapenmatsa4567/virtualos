import { formatDate, getTimeByGMTOffset } from '@/utils/utils';
import React, { useRef, useState, useEffect} from 'react';
import { useTimezoneSelect, allTimezones } from "react-timezone-select"
import { motion } from 'framer-motion';
import useSmallStore from '@/stores/small-store';
import { RxCross1 } from 'react-icons/rx';

const WorldClock = ({isActive, isPlusClick, setIsPlusClick}) => {

  const labelStyle = "original"

  const { clocks, addClock, removeClock } = useSmallStore();
  const { options, parseTimezone } = useTimezoneSelect({ labelStyle, allTimezones });
  const [date, setDate] = useState(new Date());

  const selectRef = useRef(null);

  const handleButtonClick = () => {
    if (selectRef.current) {
      selectRef.current.click(); // Simulate click on the select element
      selectRef.current.focus(); // Focus the select element
    }
  };

  const createClock = (optionValue) => {
    const timezone = parseTimezone(optionValue);
    addClock({label: timezone.label, offset: timezone.offset});
    setIsPlusClick(false);
  }

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
    <div className={`relative w-full p-4 h-full overflow-auto bg-[#1e1e1e] ${isActive ? "flex" : "hidden"} flex-col`}>
      <div className='text-white flex flex-col gap-2'>
        {clocks.length > 0 && clocks.map((clock, index) => (
          <div className='flex relative group flex-col rounded-lg p-4 bg-[#323232]' key={index}>
            <p>{clock.label}</p>
            <p className='text-2xl'>{formatDate(getTimeByGMTOffset(clock.offset, date))[1]}</p>
            <div className='absolute right-2 top-2 bg-gray-500 p-1 rounded-full hidden group-hover:flex'>
              <RxCross1 onClick={() => removeClock(clock.offset)} size={10} className='text-black cursor-pointer'/>
            </div>
          </div>
        ))}
      </div>
      {isPlusClick && <motion.div
      initial={{ opacity: 0}}
      animate={{ opacity: 1}} 
      className='absolute flex gap-2 flex-col text-white p-2 items-center max-w-[500px] w-3/4 h-3/4 left-1/2 top-1/2 border border-[#4b4b4b] rounded-xl shadow-2xl -translate-x-1/2 -translate-y-1/2 bg-[#1e1e1e]'>
        <p className='text-xs'>Choose a Timezone</p>
        <div className='flex w-full gap-2'>
          <input className='flex-1 bg-transparent text-xs px-2 p-1 text-white outline-none border-[#8f5f20] rounded-lg focus:border-4' placeholder='Search' type='text'/>
          <button onClick={() => setIsPlusClick(false)} className='text-[#ff9f0b] text-[13px]'>Cancel</button>
        </div>
        <div className='flex flex-col overflow-auto'>
          {options.map((option, index) => (
            <p onClick={() => createClock(option.value)} className='border-b border-[#343434] text-sm' key={index} value={option.value}>{option.label}</p>
          ))}
        </div>
      </motion.div>}
    </div>
  )
}

export default WorldClock