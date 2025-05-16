import React from 'react';
import Box from './common/Box';
import { IoIosWifi, IoIosBluetooth } from 'react-icons/io';
import useSettingsStore from '@/stores/settings-store';


const NetworkSettings = ({onWifiClick, onBluetoothClick}) => {

    const { wifi, connectedWifi, bluetooth, connectedBluetooth} = useSettingsStore();
  return (
    <div className='flex flex-col p-4 gap-3'>
        <Box padding="p-3" onClick={onWifiClick}>
            <div className='w-full flex gap-1 cursor-pointer'>
                <div className='bg-blue-500 p-1 rounded-md w-fit h-fit'>
                    <IoIosWifi  className='text-white text-xl'/>
                </div>
                <div className='flex flex-col'>
                    <p className='text-white text-xs ml-2'>Wi-Fi</p>
                    <div className='flex items-center gap-1 ml-2'>
                        <div className={`w-[9px] h-[9px] rounded-full ${wifi ? connectedWifi == "" ? "bg-[#fed709]" : "bg-[#32d74b]" : "bg-[#ff453a]"}`}></div>
                        <p className='text-[#a2a0a2] text-[12px]'>{wifi ? connectedWifi == "" ? "On" : "Connected" : "Off"}</p>
                    </div>
                </div>
            </div>
        </Box>
        <Box padding="p-3" onClick={onBluetoothClick}>
            <div className='w-full flex gap-1 cursor-pointer'>
                <div className='bg-blue-500 p-1 rounded-md w-fit h-fit'>
                    <IoIosBluetooth  className='text-white text-xl'/>
                </div>
                <div className='flex flex-col'>
                    <p className='text-white text-xs ml-2'>Bluetooth</p>
                    <div className='flex items-center gap-1 ml-2'>
                        <div className={`w-[9px] h-[9px] rounded-full ${bluetooth ? connectedBluetooth == "" ? "bg-[#fed709]" : "bg-[#32d74b]" : "bg-[#ff453a]"}`}></div>
                        <p className='text-[#a2a0a2] text-[12px]'>{bluetooth ? connectedBluetooth == "" ? "On" : "Connected" : "Off"}</p>
                    </div>
                </div>
            </div>
        </Box>
    </div>
  )
}

export default NetworkSettings