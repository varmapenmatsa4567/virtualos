import React, { useState } from 'react'
import { SlidingNumber } from '@/components/ui/sliding-number';
import Lap from './Lap';
import Dots from './Dots';

const Stopwatch = () => {

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [laps, setLaps] = useState([]);

    const handleReset = () => {
        setIsRunning(false);
        clearInterval(intervalId);
        setTime(0);
        setIsPaused(false);
        setIsStarted(false);
        setLaps([]);
    }

    const handleStart = () => {
        setIsStarted(true);
        setIsRunning(true);
        setIsPaused(false);
        const intervalId = setInterval(() => {
            setTime((prevTime) => prevTime + 10);
        }, 10);
        setIntervalId(intervalId);

    }

    const handleStop = () => {
        setIsRunning(false);
        clearInterval(intervalId);
        setIsPaused(true);
    }

    const handleLap = () => {
        console.log(laps);
        if(laps.length != 0){
            setLaps([...laps, {split: time - laps[laps.length - 1].total, total: time}]);
        }
        else{
            setLaps([...laps, {split: time, total: time}]);
        }
    }

    const minutes = Math.floor((time / 1000 / 60) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor((time % 1000) / 10);

    

  return (
    <div className='w-full h-full p-4 flex flex-col'>
        <div className='flex text-white text-8xl font-extralight items-center justify-center'>
            <SlidingNumber value={minutes} padStart={true} />
            <Dots />
            <SlidingNumber value={seconds} padStart={true} />
            <span className=''>.</span>
            <SlidingNumber value={milliseconds} padStart={true} />
        </div>
        <div className='w-72 mx-auto flex flex-col my-6 flex-1 h-3/6'>
            <div className='text-[#565656] border-b py-1 my-2 text-sm border-[#565656] w-full justify-between flex'>
                <p>Lap No</p>
                <p>Split</p>
                <p>Total</p>
            </div>
            <div className='overflow-y-auto scrollbar-hide'>
                {laps.length > 0 && [...laps].reverse().map((lap, index) => (
                    <Lap key={index} lapNo={laps.length - index} split={lap.split} total={lap.total} />
                ))}
            </div>
        </div>
        <div className='flex items-center justify-center gap-4 mb-10 text-white'>
            <button disabled={!isStarted} onClick={isPaused ? handleReset : handleLap} className={`${isStarted ? "bg-[#565656]" : "bg-[#3a3a3a] text-[#6c6c6c]"} py-1 rounded-md px-16 text-sm font-medium`}>{isPaused ? "Reset" : "Lap"}</button>
            <button onClick={isRunning ? handleStop : handleStart} className={`${isRunning ? "bg-[#be3d27]" : "bg-[#26a444]"} py-1 rounded-md px-16 text-sm font-medium`}>{isRunning ? "Stop" : "Start"}</button>
        </div>
    </div>
  )
}

export default Stopwatch