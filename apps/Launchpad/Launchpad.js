import React, { useRef } from 'react'
import AppIcon from '@/components/AppIcon'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Input } from '@/components/ui/input'

const Launchpad = ({toggleLaunchpad, openWindow}) => {

  const input = useRef(null);
  return (
    <div  className='fixed duration-75 transition-all top-0 left-0 bg-wallpaper w-screen h-screen bg-cover'>
        <TooltipProvider>
            <div>
              <Input ref={input} onClick={() => input.current.focus()} type='text' placeholder='Search' className='w-1/6 placeholder:text-center text-center mx-auto mt-10 text-white' />
            </div>
            <div className='w-full h-full px-32 pt-10 pb-40 backdrop-filter backdrop-blur-lg'>

              <div className='grid grid-cols-9 gap-x-4 gap-y-7'>
                  <AppIcon isAppSwitcher={true} appName={'finder'} onClick={() => openWindow('finder')} />
                  <AppIcon isAppSwitcher={true} appName={'terminal'} onClick={() => openWindow('terminal')} />
                  <AppIcon isAppSwitcher={true} appName={'clock'} onClick={() => openWindow('clock')} />
                  <AppIcon isAppSwitcher={true} appName={'launchpad'} onClick={toggleLaunchpad}  />
                  <AppIcon isAppSwitcher={true} appName={'calculator'} onClick={() => openWindow('calculator')} />
                  <AppIcon isAppSwitcher={true} appName={'notes'} onClick={() => openWindow('notes')} />
                  <AppIcon isAppSwitcher={true} appName={'photos'} onClick={() => openWindow('photos')} />
                  <AppIcon isAppSwitcher={true} appName={'safari'} onClick={() => openWindow('safari')} />
                  <AppIcon isAppSwitcher={true} appName={'settings'} onClick={() => openWindow('settings')} />
                  <AppIcon isAppSwitcher={true} appName={'vscode'} onClick={() => openWindow('vscode')} />
                  <AppIcon isAppSwitcher={true} appName={'calendar'} onClick={() => openWindow('calendar')}  />
                  <AppIcon isAppSwitcher={true} appName={'sudoko'} onClick={() => openWindow('sudoko')}  />
                  <AppIcon isAppSwitcher={true} appName={'finder'} />
                  <AppIcon isAppSwitcher={true} appName={'vscode'} />
                  <AppIcon isAppSwitcher={true} appName={'finder'} />
                  <AppIcon isAppSwitcher={true} appName={'finder'} />
                  <AppIcon isAppSwitcher={true} appName={'finder'} />
                  <AppIcon isAppSwitcher={true} appName={'finder'} />
                
                
                  
              </div>
            </div>
        </TooltipProvider>
    </div>
  )
}

export default Launchpad