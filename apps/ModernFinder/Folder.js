import React from 'react'
import {ContextMenu, ContextMenuTrigger} from '@/components/ui/context-menu';
import FolderContextMenu from '../../components/context-menu/FolderContextMenu';

const Folder = ({folderName, openFolder, onFolderDelete, onFolderDuplicate, onCopyItem, onCutItem, onSelect, isSelected, isNotDeletable, item}) => {
  
  const onDragStart = (e) => {
    e.dataTransfer.setData('item', JSON.stringify(item));
  }

  return (
    <ContextMenu>
        <ContextMenuTrigger onContextMenu={onSelect}>
          <div onDragStart={onDragStart} draggable onClick={onSelect} onDoubleClick={openFolder} className={`flex flex-col items-center gap-1 draggable-element`}>
              <img draggable={false} src={item.isSpecial ? `./folders/${item.name.toLowerCase()}-folder.png` : 'folder.png'} className={`w-18 h-16 ${isSelected ? "bg-[#3b373a] rounded-md px-2" : null}`}/>
              <p className={`${isSelected ? "bg-[#0059d0] rounded-sm w-fit px-1" : null} text-white text-[12px] font-medium text-clip w-20 text-center`}>{folderName}</p>
          </div>
        </ContextMenuTrigger>
        <FolderContextMenu isSpecial={item.isSpecial} onCutItem={onCutItem} onCopyItem={onCopyItem} onFolderOpen={openFolder} onFolderDelete={onFolderDelete} onFolderDuplicate={onFolderDuplicate}/>
    </ContextMenu>
  )
}

export default Folder