import React from 'react'
import AppIcon from '@/components/AppIcon'
import { TooltipProvider } from '@/components/ui/tooltip'

const Launchpad = ({toggleLaunchpad}) => {
  return (
    <div onClick={toggleLaunchpad} className='fixed duration-75 transition-all top-0 left-0 bg-wallpaper w-screen h-screen bg-cover'>
        <TooltipProvider>
            <div className='w-full h-full px-32 pt-10 pb-40 backdrop-filter backdrop-blur-md flex gap-10 flex-wrap'>
                <AppIcon isAppSwitcher={true} appName={'finder'} />
                <AppIcon isAppSwitcher={true} appName={'calculator'} />
                <AppIcon isAppSwitcher={true} appName={'clock'} />
                <AppIcon isAppSwitcher={true} appName={'notes'} />
                <AppIcon isAppSwitcher={true} appName={'photos'} />
                <AppIcon isAppSwitcher={true} appName={'reminders'} />
                <AppIcon isAppSwitcher={true} appName={'safari'} />
                <AppIcon isAppSwitcher={true} appName={'settings'} />
                <AppIcon isAppSwitcher={true} appName={'sudoko'} />
                <AppIcon isAppSwitcher={true} appName={'terminal'} />
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
                <AppIcon isAppSwitcher={true} appName={'finder'} />
                <AppIcon isAppSwitcher={true} appName={'finder'} />
                
            </div>
        </TooltipProvider>
    </div>
  )
}

export default Launchpad