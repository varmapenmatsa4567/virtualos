import FileContextMenu from '@/components/context-menu/FileContextMenu';
import { ContextMenu, ContextMenuTrigger } from '@/components/ui/context-menu';
import { formatDateTimeforFinder } from '@/utils/utils';
import React from 'react'

const ListFile = ({item, openFile, index, isSelected, onSelect, deleteItem, copyItem, cutItem, duplicateItem}) => {
  const filename = item.name;
//   const fileExtension = filename.split('.').pop();
//   const fileNameWithoutExtension = filename.slice(0, filename.lastIndexOf('.'));
  console.log(item);

  const bgColor = index % 2 === 0 ? "bg-[#29292a]" : "bg-[#333334]";

  return (
    <ContextMenu>
      <ContextMenuTrigger onContextMenu={onSelect}>
        <div onDoubleClick={openFile} onClick={onSelect} className={`rounded-sm flex items-center px-2 p-0.5 ${isSelected ? "bg-[#0059d0]" : bgColor}`}>
            <div className='flex items-center gap-1 w-5/12 truncate'>
                <img src={getImageSrc(item)} className='w-4 h-4 object-contain' />
                <p className={`text-white text-[12px] font-medium w-20 text-center`}>
                    {filename}
                </p>
            </div>
            <div className='w-3/12 text-[#c3c0c0] text-[12px] font-medium'>
                {formatDateTimeforFinder(item.dateModified)}
            </div>
            <div className='w-2/12 text-[#c3c0c0] text-[12px] font-medium pl-1'>
                {getFileSize(item.size)}
            </div>
            <div className='w-2/12 text-[#c3c0c0] text-[12px] font-medium'>
                {getFileType(item)}
            </div>
        </div>
      </ContextMenuTrigger>
      <FileContextMenu onDeleteItem={deleteItem} onCopyItem={copyItem} onCutItem={cutItem} onItemDuplicate={duplicateItem} />
    </ContextMenu>
  )
}

export default ListFile


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

const getFileType = (item) => {
    if (item.type.startsWith('image')) {
        const fileExtension = item.type.split('/')[1];
        return `${fileExtension.toUpperCase()} image`;
    } else if (item.type.endsWith('pdf')) {
        return 'PDF Document';
    } else if (item.type.endsWith('docx')) {
        return 'Word Document';
    } else if (item.type.endsWith('xlsx')) {
        return 'Excel Spreadsheet';
    } else if (item.type.endsWith('pptx')) {
        return 'PowerPoint Presentation';
    } else if (item.type == "") {
        return "Video"
    }
    else {
        return 'File';
    }
}

const getFileSize = (size) => {
    if (size < 1024) {
        return `${size} B`;
    } else if (size < 1048576) {
        return `${(size / 1024).toFixed(0)} KB`;
    } else if (size < 1073741824) {
        return `${(size / 1048576).toFixed(1)} MB`;
    } else {
        return `${(size / 1073741824).toFixed(2)} GB`;
    }
}