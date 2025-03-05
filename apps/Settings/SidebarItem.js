import React from 'react'
import { IoIosWifi } from 'react-icons/io'

const SidebarItem = ({onClick, isSelected, text, Icon}) => {
  return (
    <div onClick={onClick} className={`flex gap-1.5 text-white items-center ${isSelected && "bg-blue-600"} p-1 px-2 rounded-md`}>
        {/* <IoIosWifi className={`text-white text-xl bg-[#1287ff] p-0.5 rounded-sm`}/> */}
        {Icon}
        <p className='text-xs'>{text}</p>
    </div>
  )
}

export default SidebarItem