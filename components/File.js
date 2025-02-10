import React from 'react';
import FileContextMenu from './context-menu/FileContextMenu';
import { ContextMenu, ContextMenuTrigger } from '@/components/ui/context-menu';

const File = ({ fileName, onCopyItem, onDeleteItem, onCutItem, onSelect, isSelected }) => {
  const fileExtension = fileName.split('.').pop();
  const fileNameWithoutExtension = fileName.slice(0, fileName.lastIndexOf('.'));

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          onClick={onSelect}
          className={`${isSelected ? "bg-[#3b373a] rounded-md" : null} flex flex-col items-center`}
        >
          <img src='file.png' className='w-16 h-16' />
          <p className='text-white text-[12px] font-medium text-clip w-20 text-center'>
            {isSelected ? (
              fileName
            ) : (
              fileNameWithoutExtension.length > 10 ? `${fileNameWithoutExtension.slice(0, 10)}...${fileExtension}` : fileName
            )}
          </p>
        </div>
      </ContextMenuTrigger>
      <FileContextMenu onDeleteItem={onDeleteItem} onCopyItem={onCopyItem} onCutItem={onCutItem} />
    </ContextMenu>
  );
};

export default File;