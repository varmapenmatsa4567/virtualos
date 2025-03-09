import React, { useRef } from 'react'
import AppIcon from '@/components/AppIcon'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Input } from '@/components/ui/input'
import useSettingsStore from '@/stores/settings-store'
import { apps } from '@/utils/data'

const Launchpad = ({toggleLaunchpad, openWindow}) => {

  const input = useRef(null);

  const { wallpaper } = useSettingsStore();

  const handleInputClick = (e) => {
    e.stopPropagation(); // Stop event propagation
    input.current.focus();
  };
  return (
    <div onClick={toggleLaunchpad} className={`fixed duration-300 ease-in-out transition-all top-0 left-0 bg-${wallpaper} w-screen h-screen bg-cover z-[60]`}>            
            <div className='w-full h-full px-32 pb-40  backdrop-filter backdrop-blur-lg'>
              <div className='mb-10'>
                <Input ref={input} onClick={handleInputClick} type='text' placeholder='Search' className='w-1/6 placeholder:text-center text-center mx-auto mt-8 text-white' />
              </div>
              <div className='grid grid-cols-9 gap-x-4 gap-y-7'>
                  {apps.map((app, idx) => (
                    <AppIcon
                      titleRequired={true}
                      isAppSwitcher={true}
                      appName={app}
                      key={idx}
                      onClick={() => openWindow(app)}
                    />
                  ))}
              </div>
            </div>
    </div>
  )
}

export default Launchpad