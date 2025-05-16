import React, { useEffect, useRef, useState } from 'react';
import { FaApple } from 'react-icons/fa';
import { formatDate } from '../utils/utils';
import { IoBatteryFull, IoSearch, IoTimerOutline } from 'react-icons/io5';
import WifiMenu from './topbar-menus/WifiMenu';
import BluetoothMenu from './topbar-menus/BluetoothMenu';
import { MdOutlineWifiOff, MdOutlineWifi } from "react-icons/md";
import { Bluetooth, BluetoothOff } from 'lucide-react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import useToggle from '@/hooks/useToggle';
import { appMenus } from '@/utils/data';
import SystemMenu from './topbar-menus/SystemMenu';
import useSettingsStore from '@/stores/settings-store';
import useTimerStore from '@/stores/timer-store';
import Dots from '@/apps/Clock/Dots';
import { IoIosSwitch } from 'react-icons/io';

const TopBar = ({activeWindow, openWindow}) => {
  const [formattedDate, setFormattedDate] = useState([]);

  // Wifi
  const [isWifiOpen, toggleWifiOpen] = useToggle(false);
  const {wifi, connectedWifi, wifiInMenuBar} = useSettingsStore();
  const wifiRef = useRef(null);
  useOutsideClick(wifiRef, () => toggleWifiOpen(false));

  // Bluetooth
  const [isBluetoothOpen, toggleBluetoothOpen] = useToggle(false);
  const {bluetooth, connectedBluetooth, bluetoothInMenuBar} = useSettingsStore();
  // const [isDeviceConnected, toggleBluetoothConnected] = useToggle(false);
  const bluetoothRef = useRef(null);
  useOutsideClick(bluetoothRef, () => toggleBluetoothOpen(false));

  // Battery
  const {batteryInMenuBar, showBatteryPercentage} = useSettingsStore();

  // Spotlight
  const { spotlightInMenuBar } = useSettingsStore();

  // Siri
  const { siriInMenuBar } = useSettingsStore();
  

  // System Menu
  const [isSystemMenuOpen, toggleSystemMenuOpen] = useToggle(false);
  const systemMenuRef = useRef(null);
  useOutsideClick(systemMenuRef, () => toggleSystemMenuOpen(false));

  // Timer
  const {isTimer, balanceTime} = useTimerStore();
  

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
        <div ref={systemMenuRef} className={`${isSystemMenuOpen && 'bg-white'} relative p-1 px-2 rounded-md bg-opacity-20`}>
          <FaApple className='text-white text-lg' onClick={toggleSystemMenuOpen}/>
          {isSystemMenuOpen && <SystemMenu openWindow={openWindow}/>}
        </div>
        <p className='text-[13px] font-extrabold capitalize'>{activeWindow && activeWindow.length > 0 && activeWindow[0].appName}</p>
        {activeWindow && activeWindow.length > 0 && <div className='flex ml-3 gap-5'>
          {appMenus[activeWindow[0].appName] && appMenus[activeWindow[0].appName].map((menu, index) => (
            <p key={index} className='text-[13px] capitalize'>{menu}</p>
          ))}
        </div>}
      </div>
      <div className='flex cursor-default items-center gap-3'>
        {isTimer && <div className='flex gap-1 items-center'>
          <IoTimerOutline className='text-white text-md' />
          <div className={`flex text-xs font-light tabular-nums items-center`}>
              {(balanceTime / 3600) >= 1 && (
                  <>
                      <p>{String(Math.floor(balanceTime / 3600)).padStart(2, '0')}</p>
                      <Dots gap="gap-1"/>
                  </>
              )}
              <p>{String(Math.floor((balanceTime % 3600) / 60)).padStart(2, '0')}</p>
              <Dots size='' px='px-[2px]' gap="gap-1"/>
              <p>{String((balanceTime % 60)).padStart(2, '0')}</p>
          </div>
        </div>}
        {bluetoothInMenuBar == "show" && <div ref={bluetoothRef} className={`${isBluetoothOpen && 'bg-white'} relative p-1 px-2 rounded-md bg-opacity-20`}>
          {bluetooth ? <Bluetooth size={17} className={`${connectedBluetooth != "" ? "text-white" : "text-white text-opacity-40"}`} onClick={toggleBluetoothOpen}/> : (
            <BluetoothOff size={17} className='text-white text-opacity-40' onClick={toggleBluetoothOpen}/>
          )}
          {isBluetoothOpen && <BluetoothMenu/>}
        </div>}
        {batteryInMenuBar && <div className='flex items-center gap-1'>
          {showBatteryPercentage &&<p className='text-xs font-semibold'>100%</p>}
          <IoBatteryFull className='text-white text-2xl'/>
          {/* <BatteryIndicator/> */}
        </div>}  
        {spotlightInMenuBar == "show" && <IoSearch className="text-white" />}
        {wifiInMenuBar == "show" && <div ref={wifiRef} className={`${isWifiOpen && 'bg-white'} relative p-1 px-2 rounded-md bg-opacity-20`}>
          {wifi ? <MdOutlineWifi onClick={toggleWifiOpen} className={`${connectedWifi != "" ? "text-white" : "text-white text-opacity-40"} text-lg`}/> : (
            <MdOutlineWifiOff onClick={toggleWifiOpen} className='text-lg text-white text-opacity-40'/>
          )}
          {isWifiOpen && <WifiMenu />}
        </div>}
        <IoIosSwitch className="text-white" />
        {siriInMenuBar == "show" && <img src='/siri.png' alt='siri' className='w-5 h-5'/>}
        <div className='flex items-center gap-2'>
            <p className='text-sm'>{formattedDate[0]}</p>
            <p className='text-sm'>{formattedDate[1]}</p>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
