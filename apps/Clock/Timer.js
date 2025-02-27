import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react'
import Dots from './Dots';


const Timer = () => {
    const [selectedItem, setSelectedItem] = useState(-1);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    var total = 0;

    const handleItemClick = (item) => {
        setSelectedItem(item);
    }

    const [time, setTime] = useState({
        0: 0,
        1: 0,
        2: 0
    })

    const startTimer = () => {
        setIsRunning(true);
        if(total == 0) total = time[0] * 3600 + time[1] * 60 + time[2];
        var intervalId = setInterval(() => {
            if(total <= 0){
                clearInterval(intervalId);
                return;
            }
            total--;
            console.log(total);
        }, 1000);
        setIntervalId(intervalId);
    }

    const pauseTimer = () => {
        clearInterval(intervalId);
        setIsRunning(false);
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if(event.key === 'ArrowRight'){
                setSelectedItem((prev) => (prev + 1) % 3);
            }
            else if(event.key === 'ArrowLeft'){
                setSelectedItem((prev) => (prev - 1 + 3) % 3);
            }
            // if it is number
            else if(event.key >= 0 && event.key <= 9){
                var key = parseInt(event.key);
                if(selectedItem > -1){
                    if(time[selectedItem] < 5){
                        setTime((prev) => ({...prev, [selectedItem]: prev[selectedItem] * 10 + key}));
                    }
                    else if(time[selectedItem] == 5 && key <= 9){
                        setTime((prev) => ({...prev, [selectedItem]: prev[selectedItem] * 10 + key}));
                    }
                    else {
                        setTime((prev) => ({...prev, [selectedItem]: key}));
                    }
                }

            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    })

  return (
    <div className='flex text-white flex-col w-full h-full overflow-y-auto'>
        <div className='mx-auto my-40'>
            <div className='flex justify-around text-[#969696] text-xs py-2'>
                <p>hr</p>
                <p>min</p>
                <p>sec</p>
            </div>
            <div className='flex tabular-nums items-center bg-[#292929] font-[250] px-4 p-2 text-8xl justify-center'>
                <p className={`${selectedItem === 0 && 'bg-[#ce841f]'} rounded-md`} onClick={() => handleItemClick(0)}>{time[0].toString().padStart(2, '0')}</p>
                <Dots/>
                <p className={`${selectedItem === 1 && 'bg-[#ce841f]'} rounded-md`} onClick={() => handleItemClick(1)}>{time[1].toString().padStart(2, '0')}</p>
                <Dots/>
                <p className={`${selectedItem === 2 && 'bg-[#ce841f]'} rounded-md`} onClick={() => handleItemClick(2)}>{time[2].toString().padStart(2, '0')}</p>
            </div>
            <div className='my-2'>
                <Input type="text" placeholder='Timer' className='bg-[#292929] text-xs mx-auto border-2 w-48 border-[#8f5f20]' />
            </div>
        </div>
        <div className='flex items-center justify-center gap-4 mb-10 text-white'>
            <button onClick={pauseTimer} className={`bg-[#3a3a3a] text-[#6c6c6c] shadow-md py-1 rounded-md w-36 text-[13px] font-normal`}>Cancel</button>
            <button onClick={startTimer} className={`bg-[#26a444] py-1 rounded-md shadow-md w-36 text-[13px] font-normal`}>Start</button>
        </div>
    </div>
  )
}

export default Timer