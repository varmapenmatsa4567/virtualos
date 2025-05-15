import React from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { IoIosWifi } from 'react-icons/io'

const SidebarItem = ({onClick, isSelected, text, Icon, isMenu, isSubItem}) => {
  return (
    <div onClick={onClick} className={`flex text-white items-center ${isSelected && "bg-[#454647]"} ${isSubItem ? "pl-8" : isMenu ? "" : "pl-5"} p-1.5 rounded-md`}>
        {isMenu && <FaAngleDown className='text-[#b6bdae] text-xs mr-0.5'/>}
        {Icon}
        <p className='text-xs ml-1.5'>{text}</p>
    </div>
  )
}

export default SidebarItem