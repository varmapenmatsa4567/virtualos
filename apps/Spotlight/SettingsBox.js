import { settingsItems } from '@/utils/data'
import React from 'react'

const SettingsBox = ({searchText, openWindow, closeSpotlight }) => {

    const items = settingsItems.filter((item) => item.text?.toLowerCase().includes(searchText.toLowerCase()));

    if(items.length === 0) return null;

    const openSettings = (item) => {
        openWindow("settings", {requiredSettings: item.id});
        closeSpotlight();
    }


  return (
    <div className='w-full p-2 flex flex-col gap-0.5'>
        <p className='text-xs font-semibold text-[#b3b4bb] px-2'>System Settings</p>
        {items.length > 0 && items.map((item, index) => {
            return (
                <SettingsContainer onClick={() => openSettings(item)} item={item} key={index}/>
            )
        })}
    </div>
  )
}

const SettingsContainer = ({item, onClick}) => {
    return (
        <div>    
            <div onClick={onClick} className='flex p-2 rounded-md items-center gap-2'>
                <img 
                    className='w-8'
                    src={`settings.png`}
                />
                <p className='text-white text-sm'>{item.text.replace(/\b\w/g, (char) => char.toUpperCase())}</p>
            </div>
            <div className='w-full mx-2 border-[0.5px] border-[#4e4e5d]'></div>
        </div>
    )
}

export default SettingsBox