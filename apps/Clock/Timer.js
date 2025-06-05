import { Input } from '@/components/ui/input';
import React, { useEffect, useState, useRef } from 'react';
import {CircularProgressbarWithChildren} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import {buildStyles} from "react-circular-progressbar";
import Dots from './Dots';
import { FaBell } from "react-icons/fa6";
import useTimerStore from '@/stores/timer-store';
import useNotificationsStore from '@/stores/notifications-store';

const Timer = ({isActive}) => {
    const [selectedItem, setSelectedItem] = useState(-1);
    const [remainingTime, setRemainingTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [alarmText, setAlarmText] = useState("");
    const intervalRef = useRef(null);
    const {addNotification} = useNotificationsStore();
    const {setBalanceTime, setIsTimer} = useTimerStore();

    const [showTimer, setShowTimer] = useState(false);

    const startTimer = () => {
        setShowTimer(true);
        setIsTimer(true);

        if (!isRunning && totalSeconds > 0){
            if(remainingTime === 0){
                setRemainingTime(totalSeconds);
                setBalanceTime(totalSeconds);
            }
            setIsRunning(true);
            intervalRef.current = setInterval(() => {
                setRemainingTime(prev => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current);
                        console.log(alarmText);
                        addNotification({
                            title: "Clock",
                            message: alarmText,
                            icon: "clock",
                            audio: "TimerComplete"
                        });
                        setIsRunning(false);
                        setShowTimer(false);
                        setIsTimer(false);
                        return 0;
                    }
                    setBalanceTime(prev - 1);
                    return prev - 1;
                });
            }, 1000);
        }
    };

    // Pause the countdown
    const pauseTimer = () => {
        clearInterval(intervalRef.current);
        setIsTimer(false);
        setIsRunning(false);
    };

    // Reset the countdown
    const resetTimer = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setRemainingTime(0);
        setShowTimer(false);
        setBalanceTime(0);
        setIsTimer(false);
    };

    const getFinishTime = () => {
        const currentTime = new Date().getTime();
        const finishTime = new Date(currentTime + remainingTime * 1000);
        return finishTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    const handleItemClick = (item) => {
        setSelectedItem(item);
    }

    const [time, setTime] = useState({
        0: 0,
        1: 0,
        2: 0
    });

    const totalSeconds = time[0] * 3600 + time[1] * 60 + time[2];
    const progressPercentage = (remainingTime / totalSeconds) * 100;
    // console.log(remainingTime);

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
                const key = parseInt(event.key);
                if(selectedItem > -1){
                    if(time[selectedItem] < 5){
                        setTime((prev) => ({...prev, [selectedItem]: prev[selectedItem] * 10 + key}));
                    }
                    else if(time[selectedItem] === 5 && key <= 9){
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
    <div className={`${isActive ? "flex" : "hidden"} text-white flex-col w-full h-full overflow-y-auto`}>
        {showTimer ? (
            <div className='mx-auto my-24 w-[350px]'>
                <CircularProgressbarWithChildren
                    value={progressPercentage}
                    maxValue={100}
                    strokeWidth={1.5}
                    styles={buildStyles({
                        textSize: '22px',
                        pathColor: `#ff9f0b`,
                        trailColor: '#3b3b3d',
                        textColor: 'white'
                    })}
                >
                    <div className="relative items-center">
                        <p className={`absolute flex items-center gap-1 -top-10 left-[35%] ${isRunning ? "text-[#929292]" : "text-[#313131]"} `}>
                            <FaBell/>{getFinishTime()}
                        </p>
                        <div className={`flex ${(remainingTime / 3600) >= 1 ? "text-7xl" : "text-8xl"} font-light tabular-nums items-center`}>
                            {(remainingTime / 3600) >= 1 && (
                                <>
                                    <p>{String(Math.floor(remainingTime / 3600)).padStart(2, '0')}</p>
                                    <Dots gap="gap-5"/>
                                </>
                            )}
                            <p>{String(Math.floor((remainingTime % 3600) / 60)).padStart(2, '0')}</p>
                            <Dots gap="gap-5"/>
                            <p>{String((remainingTime % 60)).padStart(2, '0')}</p>
                        </div>
                        <Input onFocus={() => setSelectedItem(-1)} value={alarmText} onChange={(e) => setAlarmText(e.target.value)} type="text" placeholder='Timer' className='bg-[#292929] text-xs mx-auto border-0 focus:border-4 rounded-lg w-48 focus:border-[#8f5f20]' />
                    </div>
                </CircularProgressbarWithChildren>
            </div>
        ) : (
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
                    <Input value={alarmText} onChange={(e) => setAlarmText(e.target.value)} onFocus={() => setSelectedItem(-1)} type="text" placeholder='Timer' className='bg-[#292929] text-xs mx-auto border-0 focus:border-4 rounded-lg w-48 focus:border-[#8f5f20]' />
                </div>
            </div>
        )}
        <div className='flex items-center justify-center gap-4 mb-10 text-white'>
            <button onClick={resetTimer} className={`bg-[#3a3a3a] shadow-md py-1 rounded-md w-36 text-[13px] font-normal`}>Cancel</button>
            <button onClick={isRunning ? pauseTimer : startTimer} className={`${isRunning ? "bg-[#d19a1a]" : "bg-[#26a444]"} py-1 rounded-md shadow-md w-36 text-[13px] font-normal`}>
                {showTimer ? isRunning ? "Pause" : "Resume" : "Start"}
            </button>
        </div>
    </div>
  )
}

export default Timer