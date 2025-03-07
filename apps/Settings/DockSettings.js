import React from 'react'
import Box from './common/Box'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import useSettingsStore from '@/stores/settings-store'

const DockSettings = () => {

    const { autoDock, openedAppsDots, toggleAutoDock, toggleOpenedAppsDots,
        showOpenedApps, toggleShowOpenedApps, } = useSettingsStore();

  return (
    <div className='h-full w-full p-2 px-3 flex flex-col gap-2 text-white'>
        <Box padding={"p-1 px-2"}>
            <div className='flex justify-between py-1 items-center'>
                <p className='text-[13px]'>Position on Screen</p>
                <Switch checked={autoDock} onCheckedChange={toggleAutoDock} className='ml-auto h-4 w-7' thumbClassName='h-3 w-3 data-[state=checked]:translate-x-3' />
            </div>
            <Separator className='bg-[#3b363a]'/>
            <div className='flex justify-between py-1 items-center'>
                <p className='text-[13px]'>Double-click a window's title bar to</p>
                <Switch checked={autoDock} onCheckedChange={toggleAutoDock} className='ml-auto h-4 w-7' thumbClassName='h-3 w-3 data-[state=checked]:translate-x-3' />
            </div>
            <Separator className='bg-[#3b363a]'/>
            <div className='flex justify-between py-1 items-center'>
                <p className='text-[13px]'>Minimize windows into application icon</p>
                <Switch checked={!showOpenedApps} onCheckedChange={toggleShowOpenedApps} className='ml-auto h-4 w-7' thumbClassName='h-3 w-3 data-[state=checked]:translate-x-3' />
            </div>
        </Box>
        <Box padding={"p-1 px-2"}>
            <div className='flex justify-between py-1 items-center'>
                <p className='text-[13px]'>Automatically hide and show the Dock</p>
                <Switch checked={autoDock} onCheckedChange={toggleAutoDock} className='ml-auto h-4 w-7' thumbClassName='h-3 w-3 data-[state=checked]:translate-x-3' />
            </div>
            <Separator className='bg-[#3b363a]'/>
            <div className='flex justify-between py-1 items-center'>
                <p className='text-[13px]'>Show indicators for open applications</p>
                <Switch checked={openedAppsDots} onCheckedChange={toggleOpenedAppsDots} className='ml-auto h-4 w-7' thumbClassName='h-3 w-3 data-[state=checked]:translate-x-3' />
            </div>
        </Box>
    </div>
  )
}

export default DockSettings