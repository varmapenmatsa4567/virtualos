import React from 'react'
import { IoFolderOutline } from 'react-icons/io5'

const SidebarItem = ({name, isSelected, onClick}) => {
  return (
    <div onClick={onClick} className={`flex cursor-pointer items-center gap-2 p-1 px-2 ${isSelected && "bg-white/10"} rounded-md text-[13px]`}>
        <IoFolderOutline className='text-[#0092ff]' size={18} />
        <p>{name}</p>
    </div>
  )
}

export default SidebarItem