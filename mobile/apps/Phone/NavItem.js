import React from 'react'
import { FaStar } from 'react-icons/fa'

const NavItem = ({activeTab, icon, text, setActiveTab}) => {
    const isActive = activeTab === text;

  return (
    <div onClick={() => setActiveTab(text)} className={`flex flex-col items-center gap-1 ${isActive ? "text-[#0d83ff]" : "text-[#878789]"} `}>
        {icon}
        <p className='text-xs'>{text}</p>
    </div>
  )
}

export default NavItem