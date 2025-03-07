import { Progress } from '@/components/ui/progress';
import useSettingsStore from '@/stores/settings-store';
import React, { useEffect } from 'react';
import { FaApple } from 'react-icons/fa';

const RestartScreen = () => {

    const [progress, setProgress] = React.useState(0);
    const {toggleRestart, toggleLock} = useSettingsStore();

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 10;
            });
        }, 500);

        return () => {
            clearInterval(interval);
        };   
    }, [progress]);

    useEffect(() => {
        if (progress >= 100) {
            toggleRestart(); // Update the global state to stop rendering RestartScreen
            toggleLock();
        }
    }, [progress, toggleRestart]);


  return (
    <div className='w-screen h-screen bg-black flex items-center justify-center'>
        <FaApple className='text-white text-[110px]'/>
        <div className='absolute bottom-20 text-white text-[30px] font-semibold'>
            <Progress value={progress} className='w-[400px] bg-black border-[1px] border-gray-800' />
        </div>
    </div>
  )
}

export default RestartScreen