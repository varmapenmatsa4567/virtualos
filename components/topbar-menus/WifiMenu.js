import React from 'react'
import { Switch } from '../ui/switch'
import { Separator } from '../ui/separator'
import { IoIosWifi } from 'react-icons/io'
import { FaLock } from 'react-icons/fa';
import useSettingsStore from '@/stores/settings-store'

const WifiMenu = ({ref}) => {

    const {wifi, toggleWifi, connectedWifi, setConnectedWifi} = useSettingsStore();

    const toggle = () => {
        toggleWifi();
        if(!wifi) {
            setConnectedWifi("");
        }
    }

  return (
    <div ref={ref} className='bg-[#2f292e] z-[55] flex-col p-2 flex w-72 absolute top-[28px] right-0 bg-opacity-40 border border-[#4d494c] rounded-md'>
        <div className='flex justify-between w-full'>
            <p className='text-[13px] font-bold'>Wi-Fi</p>
            <Switch onCheckedChange={toggle}  checked={wifi} />
        </div>
        <Separator className='bg-[#4d494c] my-1'/>
        {wifi && <p className='text-xs font-bold text-white text-opacity-65'>Personal Hotspots</p>}
        {wifi && <div onClick={() => setConnectedWifi("iPhone")} className='my-1 flex items-center gap-2 hover:bg-white hover:bg-opacity-25 p-1 rounded-md'>
            <div className={`${connectedWifi == "iPhone" ? "bg-blue-500" : "bg-white bg-opacity-20"} rounded-full w-fit p-1`}>
                <IoIosWifi/>
            </div>
            <p className='text-[13px] font-medium'>iPhone</p>
            <FaLock className='ml-auto text-gray-400' size={14}/>
        </div>}
        <Separator className='bg-[#4d494c] my-1'/>
        {wifi && <p className='text-xs font-bold text-white text-opacity-65'>Known Network</p>}
        {wifi && <div onClick={() => setConnectedWifi("Virtual_OS")} className='my-1 flex items-center gap-2 hover:bg-white hover:bg-opacity-25 p-1 rounded-md'>
            <div className={`${connectedWifi == "Virtual_OS" ? "bg-blue-500" : "bg-white bg-opacity-20"} rounded-full w-fit p-1`}>
                <IoIosWifi/>
            </div>
            <p className='text-[13px] font-medium'>Virtual_OS</p>
            <FaLock className='ml-auto text-gray-400' size={14}/>
        </div>}
        {wifi && <Separator className='bg-[#4d494c] mt-1 mb-2'/>}
        <p className='text-[13px]'>Wifi Settings...</p>
    </div>
  )
}

export default WifiMenu