import React from 'react';
import Box from './common/Box';
import { IoIosBluetooth, IoIosWifi, IoMdCheckmark, IoMdHeadset } from 'react-icons/io';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { HiLockClosed } from "react-icons/hi";
import useSettingsStore from '@/stores/settings-store';
import { IoHeadset, IoInformationCircleOutline } from 'react-icons/io5';

const BluetoothSettings = () => {

    const { bluetooth, toggleBluetooth, connectedBluetooth, setConnectedBluetooth } = useSettingsStore();

    const toggle = () => {
        toggleBluetooth();
        if(!bluetooth) {
            setConnectedBluetooth("");
        }
    }

    const devices = ["Airpods Pro 2", "OnePlus Nord Buds 2r", "Boult Audio X60"]

  return (
    <div className='w-full h-full p-4 flex flex-col gap-2'>
        <Box padding="p-3">
            <div className='w-full flex gap-1'>
                <div className='bg-blue-500 p-1 rounded-md w-fit h-fit'>
                    <IoIosBluetooth  className='text-white text-xl'/>
                </div>
                <div className='flex flex-col'>
                    <p className='text-white text-xs ml-2'>Bluetooth</p>
                    <p className='text-[#a2a0a1] text-[11px] ml-2'>Connect to accessories you can use for activities such as streaming music, typing, and gaming.</p>
                </div>
                <Switch checked={bluetooth} onCheckedChange={toggle} className='ml-auto' />
            </div>
            <Separator className='bg-[#3b363a] my-2'/>
            <div className='w-full flex justify-between items-start text-[#a39fa1] text-xs'>
                This Mac is discoverable as "Virutal MacBook" while Bluetooth
                Settings is open.
            </div>
        </Box>
        {bluetooth && <p className='text-white text-[13px] mt-2 ml-2 font-semibold'>My Devices</p>}
        {bluetooth && <Box padding="p-1 px-2 gap-2">
            {devices.map((device, index) => (
                <div key={index} className='text-white flex items-center justify-between group'>
                    <div className='flex items-center gap-2'>
                        <IoHeadset className={`text-[#434343]`} size={30}/>
                        <div>
                            <p className='text-sm text-[#dad9da]'>{device}</p>
                            <p className='text-xs text-[#a39fa1]'>{connectedBluetooth == device ? "Connected" : "Not Connected"}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <button onClick={() => setConnectedBluetooth(device)} className='bg-[#656164] invisible group-hover:visible text-[#e8e7e8] text-xs px-2 rounded-md p-1'>Connect</button>
                        <IoInformationCircleOutline  className='text-[#a39fa1] text-2xl'/>
                    </div>
                </div>
            ))}
            
        </Box>}
    </div>
  )
}

export default BluetoothSettings