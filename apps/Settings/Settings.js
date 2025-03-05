import Window from "@/components/Window";
import SidebarItem from "./SidebarItem";
import { useState } from "react";
import { IoIosBluetooth, IoIosFingerPrint, IoIosGlobe, IoIosNotifications, IoIosSwitch, IoIosWifi } from 'react-icons/io'
import { IoAccessibility, IoBatteryFull, IoHandLeft, IoSearch, IoSettingsOutline, IoSunny, IoVolumeHigh } from "react-icons/io5";
import { CgDarkMode, CgSandClock } from "react-icons/cg";
import Spacer from "./Spacer";
import { MdAssistant, MdDarkMode, MdWallpaper } from "react-icons/md";
import { FaLock, FaUsers } from "react-icons/fa";
import { LuDock } from "react-icons/lu";
import WallpaperSettings from "./WallpaperSettings";

const Settings = ({fileStructure, setFileStructure, toggleMaximize, ...props}) => {
  const [selected, setSelected] = useState(0);
  
  const settingsItems = [
    { id: 0, text: "Wi-Fi", icon: IoIosWifi, bgColor: "bg-blue-500" },
    { id: 1, text: "Bluetooth", icon: IoIosBluetooth, bgColor: "bg-blue-500" },
    { id: 2, text: "Network", icon: IoIosGlobe, bgColor: "bg-blue-500" },
    { id: 3, text: "Battery", icon: IoBatteryFull, bgColor: "bg-green-500" },
    { type: "spacer" },
    { id: 4, text: "General", icon: IoSettingsOutline, bgColor: "bg-gray-500" },
    { id: 5, text: "Accessibility", icon: IoAccessibility, bgColor: "bg-blue-500" },
    { id: 6, text: "Appearance", icon: CgDarkMode, bgColor: "bg-black" },
    { id: 20, text: "Apple Intelligence & Siri", icon: MdAssistant, bgColor: "bg-teal-500" },
    { id: 19, text: "Control Center", icon: IoIosSwitch, bgColor: "bg-gray-500" },
    { id: 7, text: "Displays", icon: IoSunny, bgColor: "bg-blue-500" },
    { id: 17, text: "Desktop & Dock", icon: LuDock, bgColor: "bg-black" },
    { id: 8, text: "Spotlight", icon: IoSearch, bgColor: "bg-gray-500" },
    { id: 18, text: "Wallpaper", icon: MdWallpaper, bgColor: "bg-cyan-500" },
    { type: "spacer" },
    { id: 9, text: "Notifications", icon: IoIosNotifications, bgColor: "bg-red-500" },
    { id: 10, text: "Sound", icon: IoVolumeHigh, bgColor: "bg-red-500" },
    { id: 11, text: "Focus", icon: MdDarkMode, bgColor: "bg-violet-500" },
    { id: 12, text: "Screen Time", icon: CgSandClock, bgColor: "bg-violet-500" },
    { type: "spacer" },
    { id: 13, text: "Lock Screen", icon: FaLock, bgColor: "bg-black" },
    { id: 14, text: "Privacy & Security", icon: IoHandLeft, bgColor: "bg-blue-500" },
    { id: 15, text: "Touch ID & Password", icon: IoIosFingerPrint, bgColor: "bg-white", iconColor: "text-red-500" },
    { id: 16, text: "Users & Groups", icon: FaUsers, bgColor: "bg-blue-500" },
  ];

  const renderContent = () => {
    switch (selected) {
      case 0:
        return <div className='p-4 text-white'>Wi-Fi Settings Content</div>;
      case 1:
        return <div className='p-4 text-white'>Bluetooth Settings Content</div>;
      case 2:
        return <div className='p-4 text-white'>Network Settings Content</div>;
      case 18:
        return <WallpaperSettings />;
      default:
        return <div className='p-4 text-white'>Select a setting from the sidebar</div>;
    }
  };

  return (
    <Window isFixed={true} isCustomized={true} customSize={{width: 650, height: 700}} {...props}>
      <div className="flex w-full h-full">
        <div className="w-1/3 bg-[#252427] bg- p-2 px-2 flex flex-col">
          {settingsItems.map((item, index) => (
            item.type === "spacer" ? (
              <Spacer key={`spacer-${index}`} />
            ) : (
              <SidebarItem 
                key={item.id}
                Icon={
                  <item.icon 
                    className={`${item.iconColor || "text-white"} text-xl ${item.bgColor} p-0.5 rounded-sm`}
                  />
                }
                onClick={() => setSelected(item.id)} 
                text={item.text} 
                isSelected={selected === item.id}
              />
            )
          ))}
        </div>
        <div className="h-full w-[1.5px] bg-black"></div>
        <div className="w-2/3 bg-[#312c30]">
          {renderContent()}
        </div>
      </div>
    </Window>
  )
}

export default Settings;