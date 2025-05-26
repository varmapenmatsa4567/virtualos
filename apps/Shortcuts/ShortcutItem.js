import React from 'react'
import { FaPlay } from 'react-icons/fa'
import { FaCirclePlay } from 'react-icons/fa6'
import { IoIosWifi } from 'react-icons/io'

const ShortcutItem = ({color, openShortcut, shortcut}) => {

  return (
    <div onDoubleClick={openShortcut} className={`bg-shortcut${color} w-36 h-24 group p-2 px-3 rounded-2xl flex flex-col justify-between text-white`}>
        <div className='flex justify-between'>
            <img src={shortcut.image} className='w-6 h-6' alt={shortcut.name} />
            <FaCirclePlay className='text-xl hidden group-hover:block'/> 
        </div>
        <p className='text-sm font-semibold'>{shortcut.name}</p>
    </div>
  )
}

export default ShortcutItem