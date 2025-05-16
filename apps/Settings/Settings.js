import Window from "@/components/Window";
import SidebarItem from "./SidebarItem";
import Spacer from "./common/Spacer";
import WallpaperSettings from "./WallpaperSettings";
import { ChevronLeft, ChevronRight } from "lucide-react";
import WifiSettings from "./WifiSettings";
import DockSettings from "./DockSettings";
import BluetoothSettings from "./BluetoothSettings";
import NetworkSettings from "./NetworkSettings";
import ControlCentreSettings from "./ControlCentreSettings";
import useAppsStore from "@/stores/apps-store";
import { settingsItems } from "@/utils/data";
import { useEffect } from "react";
import SpotlightSettings from "./SpotlightSettings";

const Settings = ({fileStructure, setFileStructure, toggleMaximize, extraProps, ...props}) => {

  const { selectedSettings, setSelectedSettings } = useAppsStore();

  const {requiredSettings} = extraProps;

  useEffect(() => {
    if(requiredSettings) {
      setSelectedSettings(requiredSettings);
    }
  }, [])

  const renderContent = () => {
    switch (selectedSettings) {
      case 0:
        return <WifiSettings/>;
      case 1:
        return <BluetoothSettings />;
      case 2:
        return <NetworkSettings onWifiClick={() => setSelectedSettings(0)} onBluetoothClick={() => setSelectedSettings(1)}/>;
      case 9:
        return <ControlCentreSettings />;
      case 11:
        return <DockSettings />;
      case 12:
        return <SpotlightSettings />;
      case 13:
        return <WallpaperSettings />;
      default:
        return <div className='p-4 text-white'>Select a setting from the sidebar</div>;
    }
  };


  return (
    <Window isTransparent={true} isFixed={true} isCustomized={true} customSize={{width: 650, height: 700}} {...props}
      toolbar={
        <div className='flex items-center gap-2'>
          <button className='p-0.5 hover:bg-[#242227] rounded-md'>
            <ChevronLeft className={`${'text-white'}`} />
          </button>
          <button className='p-0.5 hover:bg-[#242227] rounded-md'>
            <ChevronRight className={`${'text-white'}`} />
          </button>
          <p className='text-white text-sm font-semibold'>
            {settingsItems[selectedSettings]?.text || "Settings"}
          </p>
        </div>
      }
    >
      <div className="flex w-full h-full">
        <div className="w-1/3 bg-[#2e292d] overflow-auto h-full bg-opacity-70 backdrop-filter backdrop-blur-2xl p-2 px-2 flex flex-col">
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
                onClick={() => setSelectedSettings(item.id)} 
                text={item.text} 
                isSelected={selectedSettings === item.id}
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