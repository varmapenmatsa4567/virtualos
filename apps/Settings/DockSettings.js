import React from 'react'
import Box from './common/Box'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import useSettingsStore from '@/stores/settings-store'
import { Slider } from '@/components/ui/slider'

const DockSettings = () => {

    const { autoDock, openedAppsDots, toggleAutoDock, toggleOpenedAppsDots,
        showOpenedApps, toggleShowOpenedApps, titleBarAction, setTitleBarAction,
        dockPosition, setDockPosition, dockMagnification, setDockMagnification,
        dockSize, setDockSize } = useSettingsStore();

    console.log(dockMagnification);

  return (
    <div className='h-full w-full p-2 px-3 flex flex-col gap-2 text-white'>
        <Box padding={"p-2"}>
            <div className='flex gap-3'>
                <div className='w-1/2'>
                    <p className='text-[13px]'>Size</p>
                    <Slider
                        onValueChange ={(e) => setDockSize(e)}
                        defaultValue={[0]}
                        min={0}
                        max={10}
                        step={1}
                        className="w-full my-2"
                        value={[dockSize]}
                    />
                    <div className='flex justify-between text-[11px]'>
                        <p>Small</p>
                        <p>Large</p>
                    </div>
                </div>
                <div className='w-1/2'>
                    <p className='text-[13px]'>Magnification</p>
                    <Slider
                        onValueChange ={(e) => setDockMagnification(e)}
                        defaultValue={[0]}
                        min={0}
                        max={10}
                        step={1}
                        className="w-full my-2"
                        value={[dockMagnification]}
                    />
                    <div className='flex justify-between text-[11px]'>
                        <p>Small</p>
                        <p>Large</p>
                    </div>
                </div>
            </div>
        </Box>
        <Box padding={"p-1 px-2"}>
            <div className='flex justify-between py-1 items-center'>
                <p className='text-[13px]'>Position on Screen</p>
                <select value={dockPosition} onChange={(e) => setDockPosition(e.target.value)} className="rounded-md text-right bg-transparent text-xs outline-none">
                    <option value="left">Left</option>
                    <option value="bottom">Bottom</option>
                    <option value="right">Right</option>
                </select>
            </div>
            <Separator className='bg-[#3b363a]'/>
            <div className='flex justify-between py-1 items-center'>
                <p className='text-[13px]'>Double-click a window's title bar to</p>
                <select value={titleBarAction} onChange={(e) => setTitleBarAction(e.target.value)} className="rounded-md text-right bg-transparent text-xs outline-none">
                    <option value="minimize">Minimize</option>
                    <option value="maximize">Maximize</option>
                    <option value="nothing">Do Nothing</option>
                </select>
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
            <Separator className='bg-[#3b363a]'/>
            <div className='flex justify-between py-1 items-center'>
                <p className='text-[13px]'>Show suggested and recent apps in Dock</p>
                <Switch className='ml-auto h-4 w-7' thumbClassName='h-3 w-3 data-[state=checked]:translate-x-3' />
            </div>
        </Box>
    </div>
  )
}

export default DockSettings