import { apps } from '@/utils/data';
import React, { useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { Rnd } from 'react-rnd'
import AppsBox from './AppsBox';

const Splotlight = ({openWindow}) => {

    const [searchText, setSearchText] = useState('');

    const openSettings = () => {
        console.log("opening settinsg");
        openWindow("settings", {requiredSettings: 2});
    }

  return (
    <Rnd
        default={{x: 400, y: 100}}
        bounds=".main"
        className='shadow-2xl z-[100]'
    >
        <div className='bg-[#27283e] flex flex-col w-[600px] cursor-default rounded-2xl shadow-2xl border border-gray-700'>
            <div className='h-[50px] w-full gap-1 flex items-center px-2'>
                <IoIosSearch className='text-[#a4bfd3] text-3xl'/>
                <input value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='Spotlight Search' type="text" className='bg-transparent cursor-text caret-blue-700 text-2xl font-normal w-full outline-none text-white'/>
            </div>
            {searchText.length > 0 && <div className='w-full border-[0.5px] border-[#4e4e5d]'></div>}
            {searchText.length > 0 && <div className='w-full h-96'>
                <AppsBox apps={apps.filter((app) => app.toLowerCase().startsWith(searchText.toLowerCase()))}/>
                <button onClick={openSettings}>open settings</button>
            </div>}
        </div>
    </Rnd>
  )
}

export default Splotlight