import React from 'react'

const SidebarItem = ({name, isSelected, onClick}) => {
  return (
    <div onClick={onClick} className={`flex cursor-pointer items-center gap-2 p-1 px-2 ${isSelected && "bg-white/10"} rounded-md text-[13px]`}>
        <img className='w-5 h-5' src='folder.png'/>
        <p>{name}</p>
    </div>
  )
}

export default SidebarItem