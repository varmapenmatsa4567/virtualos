import React, {useRef, useEffect} from 'react';
import FileContextMenu from './context-menu/FileContextMenu';
import { ContextMenu, ContextMenuTrigger } from '@/components/ui/context-menu';

const File = ({ onFileOpen, fileName, onCopyItem, onDeleteItem, onCutItem, onSelect, isSelected, onRename }) => {
  // const fileExtension = fileName.split('.').pop();
  // const fileNameWithoutExtension = fileName.slice(0, fileName.lastIndexOf('.'));

  const [isEditing, setIsEditing] = React.useState(false);
  const [newFileName, setNewFileName] = React.useState(fileName);
  const inputRef = useRef(null); // Create a reference for the input field

  const fileExtension = newFileName.split('.').pop();
  const fileNameWithoutExtension = newFileName.slice(0, newFileName.lastIndexOf('.'));

  const handleRename = () => {
    if(isEditing) return;
    setIsEditing(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  }

  const handleSave = () => {
    setIsEditing(false);
    onRename(newFileName);
  }

  const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
          handleSave();
      }
  };
  
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          onClick={onSelect}
          className={`${isSelected ? "bg-[#3b373a] rounded-md" : null} flex flex-col items-center`}
        >
          <img src='file.png' className='w-16 h-16' />
          {isEditing ? (
            <input 
              ref={inputRef}
              onKeyDown={handleKeyDown}
              onChange={(e) => setNewFileName(e.target.value)}
              type='text'
              className='bg-transparent cursor-pointer text-white text-[12px] w-16 text-center'
              value={newFileName}
          />
          ) : (
            <p className='text-white text-[12px] font-medium text-clip w-20 text-center'>
            {isSelected ? (
              fileName
            ) : (
              fileNameWithoutExtension.length > 10 ? `${fileNameWithoutExtension.slice(0, 10)}...${fileExtension}` : fileName
            )}
          </p>
          )}
          
        </div>
      </ContextMenuTrigger>
      <FileContextMenu onFileOpen={onFileOpen} onRename={handleRename} onDeleteItem={onDeleteItem} onCopyItem={onCopyItem} onCutItem={onCutItem} />
    </ContextMenu>
  );
};

export default File;