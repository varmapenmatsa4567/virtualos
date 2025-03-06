import React from 'react';
import Box from './common/Box';
import { IoIosWifi, IoMdCheckmark } from 'react-icons/io';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { HiLockClosed } from "react-icons/hi";
import useSettingsStore from '@/stores/settings-store';

const WifiSettings = () => {

    const { wifi, toggleWifi, connectedWifi, setConnectedWifi } = useSettingsStore();

    const toggle = () => {
        toggleWifi();
        if(!wifi) {
            setConnectedWifi("");
        }
    }

  return (
    <div className='w-full h-full p-4 flex flex-col gap-2'>
        <Box padding="p-3">
            <div className='w-full flex gap-1'>
                <div className='bg-blue-500 p-1 rounded-md w-fit h-fit'>
                    <IoIosWifi  className='text-white text-xl'/>
                </div>
                <div className='flex flex-col'>
                    <p className='text-white text-xs ml-2'>Wi-Fi</p>
                    <p className='text-[#a2a0a1] text-[11px] ml-2'>Set up Wi-Fi to wirelessly connect your Mac to the internet. Turn on Wi-Fi, then choose a network to join.</p>
                </div>
                <Switch checked={wifi} onCheckedChange={toggle} className='ml-auto' />
            </div>
            <Separator className='bg-[#3b363a] my-2'/>
            <div className='w-full flex justify-between items-start'>
                <div className='flex flex-col'>
                    {connectedWifi != "" && <p className='text-white text-[13px]'>{connectedWifi}</p>}
                    <div className='flex items-center gap-1'>
                        <div className={`w-[10px] h-[10px] rounded-full ${wifi ? connectedWifi == "" ? "bg-[#fed709]" : "bg-[#32d74b]" : "bg-[#ff453a]"}`}></div>
                        <p className='text-[#a2a0a2] text-[13px]'>{wifi ? connectedWifi == "" ? "Not Connected" : "Connected" : "Wi-Fi is off"}</p>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    {connectedWifi != "" && <HiLockClosed className='text-white ml-auto' size={16}/>}
                    {connectedWifi != "" && <IoIosWifi  className='text-white text-lg'/>}
                    <button className='bg-[#656164] text-[#e8e7e8] text-xs px-2 rounded-md p-1'>Details..</button>
                </div>
            </div>
        </Box>
        {wifi && <p className='text-white text-[13px] mt-2 ml-2 font-semibold'>Personal Hotspots</p>}
        {wifi && <Box padding="p-1 px-5">
            <div className='text-white flex items-center justify-between group'>
                <div className='flex items-center gap-2'>
                    <IoMdCheckmark className={`text-white ${connectedWifi == "iPhone" ? "visible" : "invisible"}`} size={16}/>
                    <p className='text-sm'>iPhone</p>
                </div>
                <div className='flex items-center gap-2'>
                    <button onClick={() => setConnectedWifi("iPhone")} className='bg-[#656164] invisible group-hover:visible text-[#e8e7e8] text-xs px-2 rounded-md p-1'>Connect</button>
                    <HiLockClosed className={`text-white ml-auto`} size={16}/>
                    <IoIosWifi  className='text-white text-lg'/>
                </div>
            </div>
        </Box>}
        {wifi && <p className='text-white text-[13px] mt-4 ml-2 font-semibold'>Available Networks</p>}
        {wifi && <Box padding="p-1 px-5">
            <div className='text-white flex items-center justify-between group'>
                <div className='flex items-center gap-2'>
                    <IoMdCheckmark className={`text-white ${connectedWifi == "Virtual_OS" ? "visible" : "invisible"}`} size={16}/>
                    <p className='text-sm'>Virtual_OS</p>
                </div>
                <div className='flex items-center gap-2'>
                    <button onClick={() => setConnectedWifi("Virtual_OS")} className='bg-[#656164] invisible group-hover:visible text-[#e8e7e8] text-xs px-2 rounded-md p-1'>Connect</button>
                    <HiLockClosed className='text-white ml-auto' size={16}/>
                    <IoIosWifi  className='text-white text-lg'/>
                </div>
            </div>
        </Box>}
    </div>
  )
}

export default WifiSettings