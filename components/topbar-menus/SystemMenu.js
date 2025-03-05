import React from 'react'
import { Separator } from '../ui/separator'

const SystemMenu = ({ref}) => {
  return (
    <div ref={ref} className='bg-[#252427] backdrop-filter backdrop-blur-lg bg-opacity-90 gap-1 flex-col p-1 px-2 flex w-64 absolute top-[28px] left-0 border border-[#4d494c] rounded-md'>
        <p className='text-[13px] hover:bg-blue-600 px-2 rounded-sm py-0.5'>About This Mac</p>
        <Separator className='bg-[#4d494c]'/>
        <p className='text-[13px] hover:bg-blue-600 px-2 rounded-sm py-0.5'>System Settings</p>
        <p className='text-[13px] hover:bg-blue-600 px-2 rounded-sm py-0.5'>App Store</p>
        <Separator className='bg-[#4d494c]'/>
        <p className='text-[13px] hover:bg-blue-600 px-2 rounded-sm py-0.5'>Sleep</p>
        <p className='text-[13px] hover:bg-blue-600 px-2 rounded-sm py-0.5'>Restart</p>
        <p className='text-[13px] hover:bg-blue-600 px-2 rounded-sm py-0.5'>Shutdown</p>
        <Separator className='bg-[#4d494c]'/>
        <p className='text-[13px] hover:bg-blue-600 px-2 rounded-sm py-0.5'>Lock screen</p>
    </div>
  )
}

export default SystemMenu