import React from 'react'
import { Separator } from '../ui/separator';
import useSettingsStore from '@/stores/settings-store';

const SystemMenu = ({ref, openWindow, toggleSystemMenuOpen}) => {

  const {toggleLock, toggleRestart} = useSettingsStore();

  const openSettings = () => {
    toggleSystemMenuOpen();
    openWindow("settings");
  }

  const openAppStore = () => {
    toggleSystemMenuOpen();
    openWindow("appstore");
  }



  return (
    <div ref={ref} className='bg-[#252427] z-[55] backdrop-filter backdrop-blur-lg bg-opacity-60 shadow-lg gap-1 flex-col p-1 px-2 flex w-64 absolute top-[28px] left-0 border border-[#4d494c] rounded-md'>
        <p onClick={toggleSystemMenuOpen} className='text-[13px] hover:bg-blue-600 px-2 rounded-sm py-0.5'>About This Mac</p>
        <Separator className='bg-[#4d494c]'/>
        <p onClick={openSettings} className='text-[13px] hover:bg-blue-600 px-2 rounded-sm py-0.5'>System Settings</p>
        <p onClick={openAppStore} className='text-[13px] hover:bg-blue-600 px-2 rounded-sm py-0.5'>App Store</p>
        <Separator className='bg-[#4d494c]'/>
        <p className='text-[13px] hover:bg-blue-600 px-2 rounded-sm py-0.5'>Sleep</p>
        <p onClick={toggleRestart} className='text-[13px] hover:bg-blue-600 px-2 rounded-sm py-0.5'>Restart</p>
        <p className='text-[13px] hover:bg-blue-600 px-2 rounded-sm py-0.5'>Shutdown</p>
        <Separator className='bg-[#4d494c]'/>
        <p onClick={toggleLock} className='text-[13px] hover:bg-blue-600 px-2 rounded-sm py-0.5'>Lock screen</p>
    </div>
  )
}

export default SystemMenu