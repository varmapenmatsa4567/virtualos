import React from 'react'
import { Switch } from '../ui/switch'
import { Separator } from '../ui/separator'
import { IoIosWifi } from 'react-icons/io'
import { FaLock } from 'react-icons/fa'

const WifiMenu = ({ref, isWifiOn, setIsWifiOn, isWifiConnected, setIsWifiConnected}) => {

    const toggleWifi = () => {
        setIsWifiOn(!isWifiOn);
    }

    const toggleWifiConnectivity = () => {
        setIsWifiConnected(!isWifiConnected);
    }

  return (
    <div ref={ref} className='bg-[#2f292e] flex-col p-2 flex w-72 absolute top-[28px] right-0 bg-opacity-40 border border-[#4d494c] rounded-md'>
        <div className='flex justify-between w-full'>
            <p className='text-[13px] font-bold'>Wi-Fi</p>
            <Switch onCheckedChange={toggleWifi}  checked={isWifiOn} />
        </div>
        <Separator className='bg-[#4d494c] my-2'/>
        {isWifiOn && <p className='text-xs font-bold text-white text-opacity-65'>Known Network</p>}
        {isWifiOn && <div onClick={toggleWifiConnectivity} className='my-1 flex items-center gap-2 hover:bg-white hover:bg-opacity-25 p-1 rounded-md'>
            <div className={`${isWifiConnected ? "bg-blue-500" : "bg-white bg-opacity-20"} rounded-full w-fit p-1`}>
                <IoIosWifi/>
            </div>
            <p className='text-[13px] font-medium'>VirtualOS</p>
            <FaLock className='ml-auto text-gray-400' size={14}/>
        </div>}
        {isWifiOn && <Separator className='bg-[#4d494c] mt-1 mb-2'/>}
        <p className='text-[13px]'>Wifi Settings...</p>
    </div>
  )
}

export default WifiMenu