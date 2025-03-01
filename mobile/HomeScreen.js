import React from 'react';
import { IoSunnySharp } from "react-icons/io5";
import { Search } from "lucide-react";
import AppIcon from "@/components/AppIcon";

const HomeScreen = ({openApp}) => {
  return (
    <div className="w-full px-6 flex flex-col items-center gap-4">
        <div className="flex gap-6">
            <div className="w-[160px] h-[150px] bg-[#376ca2] rounded-3xl text-white flex flex-col px-4 p-3">
            <p className="font-semibold">New Town</p>
            <p className="text-5xl font-light">33°</p>
            <IoSunnySharp className="w-3 mt-2" color="yellow"/>
            <p className="text-sm">Mostly Sunny</p>
            <p className="text-xs font-semibold">H:34° L:22°</p>
            </div>
            <div className="w-[160px] h-[150px] flex flex-col bg-[#1c1c1e] rounded-3xl p-3">
            <div className="flex justify-between items-center">
                <p className="text-[#fd940a] text-sm font-semibold">Reminders</p>
                <p className="text-white text-2xl font-semibold">0</p>
            </div>
            <p className="text-[#8c8c91] text-xs">All Reminders Completed</p>
            </div>
        </div>
        <div className="grid grid-cols-4 gap-x-4 gap-y-3">
            <AppIcon openApp={openApp} appName="files" isMobile={true} titleRequired={true}/>
            <AppIcon openApp={openApp} appName="calendar" isMobile={true} titleRequired={true}/>
            <AppIcon openApp={openApp} appName="photos" isMobile={true} titleRequired={true}/>
            <AppIcon openApp={openApp} appName="reminders" isMobile={true} titleRequired={true}/>
            <AppIcon openApp={openApp} appName="Notes" isMobile={true} titleRequired={true}/>
            <AppIcon openApp={openApp} appName="settings" isMobile={true} titleRequired={true}/>
            <AppIcon openApp={openApp} appName="calculator" isMobile={true} titleRequired={true}/>
            <AppIcon openApp={openApp} appName="sudoko" isMobile={true} titleRequired={true}/>
            <AppIcon openApp={openApp} appName="clock" isMobile={true} titleRequired={true}/>
            <AppIcon openApp={openApp} appName="vlcplayer" isMobile={true} titleRequired={true}/>
            <AppIcon openApp={openApp} appName="compass" isMobile={true} titleRequired={true}/>
            <AppIcon openApp={openApp} appName="weather" isMobile={true} titleRequired={true}/>
            <AppIcon openApp={openApp} appName="music" isMobile={true} titleRequired={true}/>
            <AppIcon openApp={openApp} appName="facetime" isMobile={true} titleRequired={true}/>
            <AppIcon openApp={openApp} appName="appstore" isMobile={true} titleRequired={true}/>
            <AppIcon openApp={openApp} appName="mail" isMobile={true} titleRequired={true}/>
        </div>
        <div className="bg-[#282324] text-[#d0cecf] gap-1 p-1 px-2 items-center text-xs rounded-full flex w-fit ">
            <Search size={12}/>
            <p>Search</p>
        </div>
        <div className="flex gap-4 px-2 py-1 rounded-3xl bg-[#272525]">
            <AppIcon openApp={openApp} appName="phone" isMobile={true}/>
            <AppIcon openApp={openApp} appName="messages" isMobile={true}/>
            <AppIcon openApp={openApp} appName="safari" isMobile={true}/>
            <AppIcon openApp={openApp} appName="camera" isMobile={true}/>
        </div>
    </div>
  )
}

export default HomeScreen