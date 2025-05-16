import React from 'react'
import Box from './common/Box'
import { IoSearch } from 'react-icons/io5'
import { Separator } from '@/components/ui/separator'
import useSettingsStore from '@/stores/settings-store'

const SpotlightSettings = () => {

    const {spotlightOptions, setSpotlightOptions} = useSettingsStore();

    console.log(spotlightOptions);


  return (
    <div className='flex flex-col p-4 text-white gap-2'>
        <Box padding="p-2">
            <div className='w-full flex gap-1'>
                <div className='bg-gray-500 p-1 rounded-md w-fit h-fit'>
                    <IoSearch className='text-white text-xl'/>
                </div>
                <div className='flex flex-col'>
                    <p className='text-white text-xs ml-2'>Spotlight</p>
                    <p className='text-[#a2a0a1] text-[11px] ml-2'>Spotlight helps you quickly find things on your computer and shows suggestions from the Internet, Music, App Store, movie showtimes, locations nearby, and more.</p>
                </div>
            </div>
        </Box>
        <Box padding="p-2 flex flex-col items-start">
            <p className='text-white text-xs'>Search results</p>
            <p className='text-[#a2a0a1] text-[11px]'>Only selected categories will appear in Spotlight search results.</p>
            <Separator className='bg-[#3b363a] my-2'/>
            {Object.keys(spotlightOptions).map((key) => (
                <div key={key} className='w-full'>   
                    <div className='flex items-center gap-2'>
                        <input checked={spotlightOptions[key]} onChange={() => setSpotlightOptions({...spotlightOptions, [key]: !spotlightOptions[key]})} type='checkbox' className='my-1 accent-[#156fd0] h-[15px] w-[15px]'/>
                        <span className='text-[13px] text-[#e0e0e0]'>{key}</span>
                    </div>
                    <Separator className='bg-[#3b363a]'/>
                </div>
            ))}
        </Box>
    </div>
  )
}

export default SpotlightSettings