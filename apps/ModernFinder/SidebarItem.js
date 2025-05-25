import FinderSidebarItemContextMenu from '@/components/context-menu/FinderSidebarItemContextMenu'
import { ContextMenu, ContextMenuTrigger } from '@/components/ui/context-menu'
import React from 'react'
import { IoFolderOutline } from 'react-icons/io5'

const SidebarItem = ({name, isSelected, onClick, removeItem, showInFolder, addToDock}) => {

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div draggable onClick={onClick} className={`flex cursor-pointer items-center gap-2 p-1 px-2 ${isSelected && "bg-white/10"} rounded-md text-[13px]`}>
            <IoFolderOutline className='text-[#0092ff]' size={18} />
            <p>{name}</p>
        </div>
      </ContextMenuTrigger>
      <FinderSidebarItemContextMenu addToDock={addToDock} openItem={onClick} removeItem={removeItem} showInFolder={showInFolder}/>
    </ContextMenu>
  )
}

export default SidebarItem