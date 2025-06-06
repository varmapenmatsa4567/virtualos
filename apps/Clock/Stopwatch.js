import React, { useState } from 'react'
import Lap from './Lap';
import Dots from './Dots';

const Stopwatch = ({isActive}) => {

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [laps, setLaps] = useState([]);

    const getFastestLap = () => {
        return laps.reduce((fastest, lap) => {
            return lap.split < fastest.split ? lap : fastest;
        }, laps[0]);
    }

    const getSlowestLap = () => {
        return laps.reduce((slowest, lap) => {
            return lap.split > slowest.split ? lap : slowest;
        }, laps[0]);
    }

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
        if(laps.length !== 0){
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
    <div className={`w-full h-full p-4 ${isActive ? "flex" : "hidden"} flex-col`}>
        <div className='flex tabular-nums text-white text-8xl font-extralight items-center justify-center'>
            <p>{String(minutes).padStart(2, '0')}</p>
            <Dots />
            <p>{String(seconds).padStart(2, '0')}</p>
            <span className=''>.</span>
            <p>{String(milliseconds).padStart(2, '0')}</p>
        </div>
        <div className='w-72 mx-auto flex flex-col my-6 flex-1 h-3/6'>
            <div className='text-[#565656] border-b py-1 my-2 text-sm border-[#565656] w-full flex'>
                <p className='w-1/5'>Lap No</p>
                <p className='w-2/5 text-right'>Split</p>
                <p className='w-2/5 text-right'>Total</p>
            </div>
            <div className='overflow-y-auto scrollbar-hide'>
                {laps.length > 0 && [...laps].reverse().map((lap, index) => (
                    <Lap isSlowest={lap.split == getSlowestLap().split} isFastest={lap.split == getFastestLap().split} key={index} lapNo={laps.length - index} split={lap.split} total={lap.total} />
                ))}
            </div>
        </div>
        <div className='flex items-center justify-center gap-4 mb-10 text-white'>
            <button disabled={!isStarted} onClick={isPaused ? handleReset : handleLap} className={`${isStarted ? "bg-[#565656]" : "bg-[#3a3a3a] text-[#6c6c6c]"} py-1 rounded-md w-36 text-[13px] font-normal`}>{isPaused ? "Reset" : "Lap"}</button>
            <button onClick={isRunning ? handleStop : handleStart} className={`${isRunning ? "bg-[#be3d27]" : "bg-[#26a444]"} py-1 rounded-md w-36 text-[13px] font-normal`}>{isRunning ? "Stop" : "Start"}</button>
        </div>
    </div>
  )
}

export default Stopwatch