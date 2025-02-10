import React from 'react'
import {FileIcon, defaultStyles} from 'react-file-icon'
import FileContextMenu from './context-menu/FileContextMenu';
import {ContextMenu, ContextMenuTrigger} from '@/components/ui/context-menu';

const File = ({fileName, onCopyItem, onDeleteItem, onCutItem, onSelect, isSelected}) => {

  const fileExtension = fileName.split('.').pop()

  return (
    <ContextMenu>
        <ContextMenuTrigger>
          <div onClick={onSelect} className={`${isSelected ? "bg-[#3b373a] rounded-md" : null} w-16 h-[83.5px] flex flex-col items-center justify-center gap-2`}>
              <FileIcon className="w-23" extension={fileExtension} {...defaultStyles[fileExtension]}/>
              <p className='text-[13px] flex-1 text-white font-medium'>{fileName}</p>
          </div>
        </ContextMenuTrigger>
        <FileContextMenu onDeleteItem={onDeleteItem} onCopyItem={onCopyItem} onCutItem={onCutItem}/>
    </ContextMenu>
  )
}

export default File