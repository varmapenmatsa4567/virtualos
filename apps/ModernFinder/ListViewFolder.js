import React from 'react'
import {ContextMenu, ContextMenuTrigger} from '@/components/ui/context-menu';
import FolderContextMenu from '../../components/context-menu/FolderContextMenu';
import { formatDateTimeforFinder } from '@/utils/utils';

const ListViewFolder = ({folderName, openFolder, onFolderDelete, onFolderDuplicate, onCopyItem, onCutItem, onSelect, isSelected, index, item}) => {
  const bgColor = index % 2 === 0 ? "bg-[#29292a]" : "bg-[#333334]";
  return (
    <ContextMenu>
        <ContextMenuTrigger onContextMenu={onSelect}>
          <div  onClick={onSelect} onDoubleClick={openFolder} className={`${isSelected ? "bg-[#0059d0]" : bgColor} rounded-md flex items-center px-2 p-0.5`}>
            <div className={`flex items-center gap-1 w-5/12 truncate`}>
                <img src='folder.png' className={`w-4 h-4`}/>
                <p className={`text-white text-[12px] font-medium text-clip w-20 text-start`}>{folderName}</p>
            </div>
            <div className='w-3/12 text-[#c3c0c0] text-[12px] font-medium'>
                {formatDateTimeforFinder(item.dateModified)}
            </div>
            <div className='w-1/12 text-[#c3c0c0] text-[12px] font-medium pl-1'>
                ---
            </div>
            <div className='w-3/12 text-[#c3c0c0] text-[12px] font-medium'>
                Folder
            </div>
          </div>
        </ContextMenuTrigger>
        <FolderContextMenu onCutItem={onCutItem} onCopyItem={onCopyItem} onFolderOpen={openFolder} onFolderDelete={onFolderDelete} onFolderDuplicate={onFolderDuplicate}/>
    </ContextMenu>
  )
}

export default ListViewFolder