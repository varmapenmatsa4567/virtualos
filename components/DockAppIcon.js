import React from 'react'
import { DockItem, DockLabel, DockIcon } from './ui/dock'

const DockAppIcon = ({onClick, appName, isAppOpen}) => {
  let appLabel = appName;
  if(appName.startsWith("trash")) appLabel = "trash";
  if(appName.startsWith("folder")) {
    appLabel = appName.substring(7);
    appName = "folder";
  }
  return (
    <DockItem
        className='aspect-square'
        onClick={onClick}
    >
        <DockLabel>{appLabel.replace(/\b\w/g, (char) => char.toUpperCase())}</DockLabel>
        <DockIcon>
            <div className='flex flex-col items-center'>
            <img src={`${appName}.png`} alt={appName} />
            {isAppOpen && <div className='w-1 h-1 bg-white rounded-full'></div>}
            </div>
        </DockIcon>
    </DockItem>
  )
}

export default DockAppIcon