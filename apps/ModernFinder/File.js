import FileContextMenu from '@/components/context-menu/FileContextMenu';
import { ContextMenu, ContextMenuTrigger } from '@/components/ui/context-menu';
import React from 'react'

const File = ({item, openFile, onSelect, isSelected, deleteItem, copyItem, cutItem, duplicateItem}) => {
  const filename = item.name;
  const fileExtension = filename.split('.').pop();
  const fileNameWithoutExtension = filename.slice(0, filename.lastIndexOf('.'));

  return (
    <ContextMenu>
      <ContextMenuTrigger onContextMenu={onSelect}>
        <div onDoubleClick={openFile} onClick={onSelect} className='flex flex-col items-center gap-1'>
            <img src={getImageSrc(item)} className={`w-16 h-16 object-contain p-1 ${isSelected ? "bg-[#3b373a] rounded-md" : null}`} />
            <p className={`text-white text-[12px] font-medium w-20 truncate text-center px-1 ${isSelected ? "bg-[#0059d0] rounded-sm" : null}`}>
              {fileNameWithoutExtension.length > 7 ? `${fileNameWithoutExtension.slice(0, 7)}...${fileExtension}` : filename}
            </p>
        </div>
      </ContextMenuTrigger>
      <FileContextMenu onDeleteItem={deleteItem} onCopyItem={copyItem} onCutItem={cutItem} onItemDuplicate={duplicateItem} />
    </ContextMenu>
  )
}

export default File


const getImageSrc = (item) => {
  if (item.type.startsWith('image')) {
    return item.content;
  } else if (item.type.endsWith('pdf')) {
    return './files/pdf-file.png';
  } else if (item.type == ""){
    return './vlcplayer.png';
  } 
  else {
    return 'file.png';
  }
}