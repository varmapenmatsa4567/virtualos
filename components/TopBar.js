import React, { useEffect, useRef, useState } from 'react';
import { FaApple } from 'react-icons/fa';
import { formatDate } from '../utils/utils';
import { IoBatteryFull, IoSearch, IoBluetooth } from 'react-icons/io5';
import { IoIosWifi } from 'react-icons/io';
import WifiMenu from './topbar-menus/WifiMenu';
import BluetoothMenu from './topbar-menus/BluetoothMenu';
import { MdOutlineWifiOff, MdOutlineWifi } from "react-icons/md";
import { Bluetooth, BluetoothOff } from 'lucide-react';
import { useOutsideClick } from '@/hooks/useOutsideClick';

const TopBar = ({activeWindow}) => {
  const [formattedDate, setFormattedDate] = useState([]);

  // Wifi
  const [isWifiOpen, setIsWifiOpen] = useState(false);
  const [isWifiOn, setIsWifiOn] = useState(false);
  const [isWifiConnected, setIsWifiConnected] = useState(false);
  const wifiRef = useRef(null);
  useOutsideClick(wifiRef, () => setIsWifiOpen(false));

  // Bluetooth
  const [isBluetoothOpen, setIsBluetoothOpen] = useState(false);
  const [isBluetoothOn, setIsBluetoothOn] = useState(false);
  const [isDeviceConnected, setIsDeviceConnected] = useState(false);
  const bluetoothRef = useRef(null);
  useOutsideClick(bluetoothRef, () => setIsBluetoothOpen(false));
  

  // console.log(activeWindow);

  useEffect(() => {
    const updateDate = () => {
      const currentDate = new Date();
      setFormattedDate(formatDate(currentDate));
    };

    updateDate(); // Initial call
    const intervalId = setInterval(updateDate, 1000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div className='w-screen h-7 bg-[#1a1e4b] px-4 flex items-center text-white justify-between'>
      <div className='flex items-center gap-2'>
        <FaApple className='text-white text-lg' />
        <p className='text-[13px] font-extrabold capitalize'>{activeWindow && activeWindow.length > 0 && activeWindow[0].appName}</p>
      </div>
      <div className='flex cursor-default items-center gap-3'>
        <div className={`${isBluetoothOpen && 'bg-white'} relative p-1 px-2 rounded-md bg-opacity-20`}>
          {isBluetoothOn ? <Bluetooth size={17} className={`${isDeviceConnected ? "text-white" : "text-white text-opacity-40"}`} onClick={() => setIsBluetoothOpen(!isBluetoothOpen)}/> : (
            <BluetoothOff size={17} className='text-white text-opacity-40' onClick={() => setIsBluetoothOpen(!isBluetoothOpen)}/>
          )}
          {isBluetoothOpen && <BluetoothMenu ref={bluetoothRef} isDeviceConnected={isDeviceConnected} setIsDeviceConnected={setIsDeviceConnected} isBluetoothOn={isBluetoothOn} setIsBluetoothOn={setIsBluetoothOn}/>}
        </div>
        <div className='flex items-center gap-1'>
          <p className='text-xs font-semibold'>100%</p>
          <IoBatteryFull className='text-white text-2xl'/>
        </div>
        <div className={`${isWifiOpen && 'bg-white'} relative p-1 px-2 rounded-md bg-opacity-20`}>
          {isWifiOn ? <MdOutlineWifi onClick={() => setIsWifiOpen(!isWifiOpen)} className={`${isWifiConnected ? "text-white" : "text-white text-opacity-40"} text-lg`}/> : (
            <MdOutlineWifiOff onClick={() => setIsWifiOpen(!isWifiOpen)} className='text-lg text-white text-opacity-40'/>
          )}
          {isWifiOpen && <WifiMenu ref={wifiRef} isWifiConnected={isWifiConnected} setIsWifiConnected={setIsWifiConnected} isWifiOn={isWifiOn} setIsWifiOn={setIsWifiOn}/>}
        </div>
        <IoSearch className="text-white" />
        <div className='flex items-center gap-2'>
            <p className='text-sm'>{formattedDate[0]}</p>
            <p className='text-sm'>{formattedDate[1]}</p>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
