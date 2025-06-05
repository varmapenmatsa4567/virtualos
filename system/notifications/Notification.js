import React, { useRef, useEffect } from 'react'
import { RxCross1 } from 'react-icons/rx'
import useNotificationsStore from '@/stores/notifications-store';
import { motion } from 'framer-motion';

const Notification = ({ notification }) => {

  const { removeNotification } = useNotificationsStore();

  const audioRef = useRef(null);

  useEffect(() => {
    // Create and play audio when component mounts
    const audio = new Audio(`/audio/${notification.audio}.mp3`);
    audio.loop = true;
    audio.play();
    audioRef.current = audio;

    // Stop audio when component unmounts
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const closeNotification = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    removeNotification(notification);
  };


  return (
    <motion.div 
    initial={{ opacity: 0, x: 600 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 600 }}
    transition={{ duration: 0.5 }}
    className='bg-notification relative border-[0.5px] flex border-[#7f7e7f] rounded-xl p-2 items-center gap-1'>
        <img src={`./${notification.icon}.png`} className='w-12 h-12' />
        <div className='flex flex-col text-white'>
            <p className='text-[13px] font-semibold'>{notification.title}</p>
            <p className='text-[13px]'>{notification.message}</p>
        </div>
        <div onClick={closeNotification} className='absolute notification bg-notification border-[0.5px] flex border-[#7f7e7f] items-center justify-center rounded-full p-1.5 bg-white'>
            <RxCross1 className='text-gray-300' size={11} />
        </div>
    </motion.div>
  )
}

export default Notification