import React from 'react'
import AppIcon from '@/components/AppIcon'
import { TooltipProvider } from '@/components/ui/tooltip'

const Launchpad = ({toggleLaunchpad, openWindow}) => {
  return (
    <div onClick={toggleLaunchpad} className='fixed duration-75 transition-all top-0 left-0 bg-wallpaper w-screen h-screen bg-cover'>
        <TooltipProvider>
            <div className='w-full h-full px-32 pt-10 pb-40 backdrop-filter backdrop-blur-md flex gap-10 flex-wrap'>
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
                <AppIcon isAppSwitcher={true} appName={'finder'} />
                <AppIcon isAppSwitcher={true} appName={'finder'} />
                <AppIcon isAppSwitcher={true} appName={'finder'} />
                <AppIcon isAppSwitcher={true} appName={'finder'} />
                <AppIcon isAppSwitcher={true} appName={'finder'} />
                <AppIcon isAppSwitcher={true} appName={'finder'} />
                <AppIcon isAppSwitcher={true} appName={'finder'} />
                <AppIcon isAppSwitcher={true} appName={'finder'} />
                <AppIcon isAppSwitcher={true} appName={'finder'} />
                <AppIcon isAppSwitcher={true} appName={'finder'} />
                <AppIcon isAppSwitcher={true} appName={'finder'} />
                <AppIcon isAppSwitcher={true} appName={'finder'} />
                <AppIcon isAppSwitcher={true} appName={'finder'} />
                <AppIcon isAppSwitcher={true} appName={'finder'} />
                <AppIcon isAppSwitcher={true} appName={'finder'} />
                <AppIcon isAppSwitcher={true} appName={'finder'} />
                <AppIcon isAppSwitcher={true} appName={'finder'} />
                <AppIcon isAppSwitcher={true} appName={'finder'} />
                <AppIcon isAppSwitcher={true} appName={'finder'} />
                <AppIcon isAppSwitcher={true} appName={'finder'} />
                <AppIcon isAppSwitcher={true} appName={'finder'} />
                <AppIcon isAppSwitcher={true} appName={'finder'} />
                <AppIcon isAppSwitcher={true} appName={'finder'} />
                <AppIcon isAppSwitcher={true} appName={'finder'} />
                <AppIcon isAppSwitcher={true} appName={'finder'} />
                <AppIcon isAppSwitcher={true} appName={'finder'} />
                <AppIcon isAppSwitcher={true} appName={'finder'} />
                
            </div>
        </TooltipProvider>
    </div>
  )
}

export default Launchpad