import React from 'react'
import { Separator } from '../ui/separator'

const SystemMenu = ({ref}) => {
  return (
    <div ref={ref} className='bg-[#252427] backdrop-filter backdrop-blur-lg bg-opacity-90 gap-1.5 flex-col p-2 px-4 flex w-64 absolute top-[28px] left-0 border border-[#4d494c] rounded-md'>
        <p className='text-[13px]'>About This Mac</p>
        <Separator className='bg-[#4d494c]'/>
        <p className='text-[13px]'>System Settings</p>
        <p className='text-[13px]'>App Store</p>
        <Separator className='bg-[#4d494c]'/>
        <p className='text-[13px]'>Sleep</p>
        <p className='text-[13px]'>Restart</p>
        <p className='text-[13px]'>Shutdown</p>
        <Separator className='bg-[#4d494c]'/>
        <p className='text-[13px]'>Lock screen</p>
    </div>
  )
}

export default SystemMenu