import React from 'react'
import Box from './common/Box';
import { IoIosBluetooth, IoIosWifi } from 'react-icons/io';
import useSettingsStore from '@/stores/settings-store';
import { Separator } from '@/components/ui/separator';
import { MdAssistant, MdDarkMode } from 'react-icons/md';
import { IoBatteryFull, IoSearch, IoVolumeHigh } from 'react-icons/io5';
import { Switch } from '@/components/ui/switch';
import { TiWeatherPartlySunny } from 'react-icons/ti';


const ControlCentreSettings = () => {

    const { wifiInMenuBar, setWifiInMenuBar, bluetoothInMenuBar, setBluetoothInMenuBar
        , focusInMenuBar, setFocusInMenuBar, soundInMenuBar, setSoundInMenuBar
        , batteryInMenuBar, toggleBatteryInMenuBar, batteryInCtrlCenter, toggleBatteryInCtrlCenter
        , showBatteryPercentage, toggleShowBatteryPercentage
        , spotlightInMenuBar, setSpotlightInMenuBar
        , siriInMenuBar, setSiriInMenuBar
        , weatherInMenuBar, setWeatherInMenuBar
    } = useSettingsStore();

  return (
    <div className='flex flex-col p-4 text-white'>
        <p className='text-[13px] font-semibold'>Control Center Modules</p>
        <p className='text-[11px] font-medium text-[#a2a1a2]'>These modules are always visible in Control Center. You can choose when they should also show in the Menu Bar.</p>
        <Box padding="p-2 mt-2">
            <div className='flex justify-between items-center w-full'>
                <div className='flex items-center gap-1'>
                    <div className='bg-blue-500 p-0.5 rounded-md w-fit h-fit'>
                        <IoIosWifi className='text-white text-lg'/>
                    </div>
                    <p className='text-white text-xs ml-2'>Wi-Fi</p>
                </div>
                <select value={wifiInMenuBar} onChange={(e) => setWifiInMenuBar(e.target.value)} className="rounded-md text-right bg-transparent text-xs outline-none">
                    <option value="show">Show in Menu Bar</option>
                    <option value="noshow">Don't Show in Menu Bar</option>
                </select>
            </div>
            <Separator className='bg-[#3b363a] my-2'/>
            <div className='flex justify-between items-center w-full'>
                <div className='flex items-center gap-1'>
                    <div className='bg-blue-500 p-0.5 rounded-md w-fit h-fit'>
                        <IoIosBluetooth className='text-white text-lg'/>
                    </div>
                    <p className='text-white text-xs ml-2'>Bluetooth</p>
                </div>
                <select value={bluetoothInMenuBar} onChange={(e) => setBluetoothInMenuBar(e.target.value)} className="rounded-md text-right bg-transparent text-xs outline-none">
                    <option value="show">Show in Menu Bar</option>
                    <option value="noshow">Don't Show in Menu Bar</option>
                </select>
            </div>
            <Separator className='bg-[#3b363a] my-2'/>
            <div className='flex justify-between items-center w-full'>
                <div className='flex items-center gap-1'>
                    <div className='bg-violet-500 p-0.5 rounded-md w-fit h-fit'>
                        <MdDarkMode className='text-white text-lg'/>
                    </div>
                    <p className='text-white text-xs ml-2'>Focus</p>
                </div>
                <select value={focusInMenuBar} onChange={(e) => setFocusInMenuBar(e.target.value)} className="rounded-md text-right bg-transparent text-xs outline-none">
                    <option value="show">Always Show in Menu Bar</option>
                    <option value="noshow">Don't Show in Menu Bar</option>
                </select>
            </div>
            <Separator className='bg-[#3b363a] my-2'/>
            <div className='flex justify-between items-center w-full'>
                <div className='flex items-center gap-1'>
                    <div className='bg-red-500 p-0.5 rounded-md w-fit h-fit'>
                        <IoVolumeHigh className='text-white text-lg'/>
                    </div>
                    <p className='text-white text-xs ml-2'>Sound</p>
                </div>
                <select value={soundInMenuBar} onChange={(e) => setSoundInMenuBar(e.target.value)} className="rounded-md text-right bg-transparent text-xs outline-none">
                    <option value="show">Always Show in Menu Bar</option>
                    <option value="noshow">Don't Show in Menu Bar</option>
                </select>
            </div>
        </Box>
        <p className='text-[13px] mt-3 font-semibold'>Other Modules</p>
        <p className='text-[11px] font-medium text-[#a2a1a2]'>These modules can be added to Control Center and Menu Bar.</p>
        <Box padding="p-2 mt-2">
            <div className='flex justify-between items-center w-full'>
                <div className='flex items-center gap-1'>
                    <div className='bg-green-500 p-0.5 rounded-md w-fit h-fit'>
                        <IoBatteryFull className='text-white text-lg'/>
                    </div>
                    <p className='text-white text-xs ml-2'>Battery</p>
                </div>
            </div>
            <Separator className='bg-[#3b363a] my-2'/>
            <div>
                <div className='flex justify-between items-center w-full'>
                    <div className='flex items-center gap-1'>
                        <div className='w-6 h-5'></div>
                        <p className='text-white text-xs ml-2'>Show in Menu Bar</p>
                    </div>
                    <Switch checked={batteryInMenuBar} onCheckedChange={toggleBatteryInMenuBar} className='ml-auto h-4 w-7' thumbClassName='h-3 w-3 data-[state=checked]:translate-x-3' />
                </div>
            </div>
            <Separator className='bg-[#3b363a] my-2'/>
            <div>
                <div className='flex justify-between items-center w-full'>
                    <div className='flex items-center gap-1'>
                        <div className='w-6 h-5'></div>
                        <p className='text-white text-xs ml-2'>Show in Control Center</p>
                    </div>
                    <Switch checked={batteryInCtrlCenter} onCheckedChange={toggleBatteryInCtrlCenter} className='ml-auto h-4 w-7' thumbClassName='h-3 w-3 data-[state=checked]:translate-x-3' />
                </div>
            </div>
            <Separator className='bg-[#3b363a] my-2'/>
            <div>
                <div className='flex justify-between items-center w-full'>
                    <div className='flex items-center gap-1'>
                        <div className='w-6 h-5 '></div>
                        <p className='text-white text-xs ml-2'>Show Percentage</p>
                    </div>
                    <Switch checked={showBatteryPercentage} onCheckedChange={toggleShowBatteryPercentage} className='ml-auto h-4 w-7' thumbClassName='h-3 w-3 data-[state=checked]:translate-x-3' />
                </div>
            </div>
        </Box>
        <p className='text-[13px] mt-3 font-semibold'>Menu Bar Only</p>
        <Box padding="p-2 mt-2">
            <div className='flex justify-between items-center w-full'>
                <div className='flex items-center gap-1'>
                    <div className='bg-gray-500 p-0.5 rounded-md w-fit h-fit'>
                        <IoSearch className='text-white text-lg'/>
                    </div>
                    <p className='text-white text-xs ml-2'>Spotlight</p>
                </div>
                <select value={spotlightInMenuBar} onChange={(e) => setSpotlightInMenuBar(e.target.value)} className="rounded-md text-right bg-transparent text-xs outline-none">
                    <option value="show">Show in Menu Bar</option>
                    <option value="noshow">Don't Show in Menu Bar</option>
                </select>
            </div>
            <Separator className='bg-[#3b363a] my-2'/>
            <div className='flex justify-between items-center w-full'>
                <div className='flex items-center gap-1'>
                    <div className='bg-teal-500 p-0.5 rounded-md w-fit h-fit'>
                        <MdAssistant className='text-white text-lg'/>
                    </div>
                    <p className='text-white text-xs ml-2'>Siri</p>
                </div>
                <select value={siriInMenuBar} onChange={(e) => setSiriInMenuBar(e.target.value)} className="rounded-md text-right bg-transparent text-xs outline-none">
                    <option value="show">Show in Menu Bar</option>
                    <option value="noshow">Don't Show in Menu Bar</option>
                </select>
            </div>
            <Separator className='bg-[#3b363a] my-2'/>
            <div className='flex justify-between items-center w-full'>
                <div className='flex items-center gap-1'>
                    <div className='bg-[#1664ba] p-0.5 rounded-md w-fit h-fit'>
                        <TiWeatherPartlySunny className='text-white text-lg'/>
                    </div>
                    <p className='text-white text-xs ml-2'>Weather</p>
                </div>
                <select value={weatherInMenuBar} onChange={(e) => setWeatherInMenuBar(e.target.value)} className="rounded-md text-right bg-transparent text-xs outline-none">
                    <option value="show">Show in Menu Bar</option>
                    <option value="noshow">Don't Show in Menu Bar</option>
                </select>
            </div>
            <Separator className='bg-[#3b363a] my-2'/>
            <div className='flex justify-between items-center w-full'>
                <div className='flex items-center gap-1'>
                    <div className='bg-red-500 p-0.5 rounded-md w-fit h-fit'>
                        <IoVolumeHigh className='text-white text-lg'/>
                    </div>
                    <p className='text-white text-xs ml-2'>Sound</p>
                </div>
                <select value={soundInMenuBar} onChange={(e) => setSoundInMenuBar(e.target.value)} className="rounded-md text-right bg-transparent text-xs outline-none">
                    <option value="show">Always Show in Menu Bar</option>
                    <option value="noshow">Don't Show in Menu Bar</option>
                </select>
            </div>
        </Box>
    </div>
  )
}

export default ControlCentreSettings