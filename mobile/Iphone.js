import React, {useEffect} from 'react';
import { TooltipProvider } from "@/components/ui/tooltip";
import { BiSignal4 } from "react-icons/bi";
import { IoIosBatteryFull } from "react-icons/io";

import { formatDate } from '@/utils/utils';
import HomeScreen from './HomeScreen';
import Phone from './apps/Phone/Phone';
import useToggle from '@/hooks/useToggle';
import MobileAppManager from './MobileAppManager';

const Iphone = () => {
    const [formattedDate, setFormattedDate] = React.useState('');
    const [isHomeScreen, toggleHomeScreen] = useToggle(true);
    const [apps, setApps] = React.useState([]);
    const [activeApp, setActiveApp] = React.useState("");

    const openApp = (appName) => {
        console.log(appName);
        setActiveApp(appName);
        toggleHomeScreen();
        if(apps.includes(appName)) return;
        setApps([...apps, appName]);
    }

    const minimizeApp = () => {
        setActiveApp("");
        toggleHomeScreen();
    }

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
    <TooltipProvider>
        <div className="w-screen h-screen bg-black flex flex-col">
          <div className="w-full h-8 py-1 flex justify-between px-8 bg-black mb-2 text-white">
            <p className="font-semibold">{formattedDate && formattedDate[1].split(" ")[0]}</p>
            <div className="flex items-center justify-center gap-1">
              <BiSignal4 size={20}/>
              <p className="text-sm">4G</p>
              <IoIosBatteryFull size={22}/>
            </div>
          </div>
          {isHomeScreen && <HomeScreen openApp={openApp}/>}
          {apps && apps.map((app, index) => (
            <MobileAppManager minimizeApp={minimizeApp} app={app} key={index} isActive={activeApp === app}/>
          ))}
          {/* {!isHomeScreen && <Phone toggleHomeScreen={toggleHomeScreen}/>} */}
        </div>
      </TooltipProvider>
  )
}

export default Iphone