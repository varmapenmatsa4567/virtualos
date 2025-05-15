import React from 'react'
import { Switch } from '../ui/switch'
import { Separator } from '../ui/separator'
import { PiHeadphonesFill } from "react-icons/pi";
import { FaLock } from 'react-icons/fa'
import useSettingsStore from '@/stores/settings-store';

const BluetoothMenu = ({ref}) => {

    const {bluetooth, toggleBluetooth, connectedBluetooth, setConnectedBluetooth} = useSettingsStore();

    const toggle = () => {
        toggleBluetooth();
        if(!bluetooth) {
            setConnectedBluetooth("");
        }
    }


  return (
    <div ref={ref} className='bg-[#2f292e] z-[55] flex-col p-2 flex w-72 absolute top-[28px] right-0 bg-opacity-40 border border-[#4d494c] rounded-md'>
        <div className='flex justify-between w-full'>
            <p className='text-[13px] font-bold'>Bluetooth</p>
            <Switch onCheckedChange={toggle}  checked={bluetooth} />
        </div>
        <Separator className='bg-[#4d494c] my-2'/>
        {bluetooth && <p className='text-xs font-bold text-white text-opacity-65'>Devices</p>}
        {bluetooth && <div onClick={() => setConnectedBluetooth("Airpods Pro 2")} className='my-1 flex items-center gap-2 hover:bg-white hover:bg-opacity-25 p-1 rounded-md'>
            <div className={`${connectedBluetooth != "" ? "bg-blue-500" : "bg-white bg-opacity-20"} rounded-full w-fit p-1`}>
                <PiHeadphonesFill/>
            </div>
            <p className='text-[13px] font-medium'>Airpods Pro 2</p>
            <FaLock className='ml-auto text-gray-400' size={14}/>
        </div>}
        {bluetooth && <Separator className='bg-[#4d494c] mt-1 mb-2'/>}
        <p className='text-[13px]'>Bluetooth Settings...</p>
    </div>
  )
}

export default BluetoothMenu