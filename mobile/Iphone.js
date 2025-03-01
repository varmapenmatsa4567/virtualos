import React from 'react';
import AppIcon from "@/components/AppIcon";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BiSignal4 } from "react-icons/bi";
import { IoIosBatteryFull } from "react-icons/io";
import { IoSunnySharp } from "react-icons/io5";
import { Search } from "lucide-react";

const Iphone = () => {
  return (
    <TooltipProvider>
        <div className="w-screen h-screen bg-black">
          <div className="w-full h-8 py-1 flex justify-between px-8 bg-black mb-2 text-white">
            <p className="font-semibold">3:05</p>
            <div className="flex items-center justify-center gap-1">
              <BiSignal4 size={20}/>
              <p className="text-sm">4G</p>
              <IoIosBatteryFull size={22}/>
            </div>
          </div>
          <div className="w-full px-6 flex flex-col items-center gap-4">
            <div className="flex gap-6">
              <div className="w-40 h-40 bg-[#376ca2] rounded-3xl text-white flex flex-col px-4 p-3">
                <p className="font-semibold">New Town</p>
                <p className="text-5xl font-light">33°</p>
                <IoSunnySharp className="w-3 mt-2" color="yellow"/>
                <p className="text-sm">Mostly Sunny</p>
                <p className="text-xs font-semibold">H:34° L:22°</p>
              </div>
              <div className="w-40 h-40 flex flex-col bg-[#1c1c1e] rounded-3xl p-3">
                <div className="flex justify-between items-center">
                  <p className="text-[#fd940a] text-sm font-semibold">Reminders</p>
                  <p className="text-white text-2xl font-semibold">0</p>
                </div>
                <p className="text-[#8c8c91] text-xs">All Reminders Completed</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-x-4 gap-y-4">
              <AppIcon appName="files" isMobile={true}/>
              <AppIcon appName="calendar" isMobile={true}/>
              <AppIcon appName="photos" isMobile={true}/>
              <AppIcon appName="reminders" isMobile={true}/>
              <AppIcon appName="Notes" isMobile={true}/>
              <AppIcon appName="settings" isMobile={true}/>
              <AppIcon appName="calculator" isMobile={true}/>
              <AppIcon appName="sudoko" isMobile={true}/>
              <AppIcon appName="clock" isMobile={true}/>
              <AppIcon appName="vlcplayer" isMobile={true}/>
              <AppIcon appName="compass" isMobile={true}/>
              <AppIcon appName="weather" isMobile={true}/>
              <AppIcon appName="music" isMobile={true}/>
              <AppIcon appName="facetime" isMobile={true}/>
              <AppIcon appName="appstore" isMobile={true}/>
              <AppIcon appName="mail" isMobile={true}/>
            </div>
            <div className=""></div>
            <div className="bg-[#282324] text-[#d0cecf] gap-1 p-1 px-2 items-center text-xs rounded-full flex w-fit ">
              <Search size={12}/>
              <p>Search</p>
            </div>
            <div className="flex gap-4 px-2 py-1 rounded-3xl bg-[#272525]">
              <AppIcon appName="phone" isMobile={true}/>
              <AppIcon appName="messages" isMobile={true}/>
              <AppIcon appName="safari" isMobile={true}/>
              <AppIcon appName="camera" isMobile={true}/>
            </div>
          </div>
        </div>
      </TooltipProvider>
  )
}

export default Iphone