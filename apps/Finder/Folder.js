import React from 'react'
import {ContextMenu, ContextMenuTrigger} from '@/components/ui/context-menu';
import FolderContextMenu from '../../components/context-menu/FolderContextMenu';

const Folder = ({folderName, onClick, onFolderDelete, onFolderDuplicate, onCopyItem, onCutItem, onSelect, isSelected}) => {
  return (
    <ContextMenu>
        <ContextMenuTrigger>
          <div onClick={onSelect} onDoubleClick={onClick} className={`${isSelected ? "bg-[#3b373a] rounded-md" : null} flex flex-col items-center`}>
              <img src='folder.png' className='w-16 h-16'/>
              <p className='text-white text-[12px] font-medium text-clip w-20 text-center'>{folderName}</p>
          </div>
        </ContextMenuTrigger>
        <FolderContextMenu onCutItem={onCutItem} onCopyItem={onCopyItem}  onFolderOpen={onClick} onFolderDelete={onFolderDelete} onFolderDuplicate={onFolderDuplicate}/>
    </ContextMenu>
  )
}

export default Folder