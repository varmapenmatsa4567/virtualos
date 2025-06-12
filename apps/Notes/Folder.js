import { useOutsideClick } from '@/hooks/useOutsideClick';
import { FolderClosed } from 'lucide-react'
import React, { useEffect, useRef } from 'react'

const Folder = ({isSelected, onEdit, onClick ,folderName, count, isBlur, isEdit, editingFolderName, setEditingFolderName, saveFolderName}) => {
  
  const inputRef = useRef(null);

  useOutsideClick(inputRef, () => {
    saveFolderName();
  });

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      saveFolderName();
    }
  }

  useEffect(() => {
    if (isEdit) {
      inputRef.current.focus();
    }
  })

  return (
    <div onClick={onClick} className={`flex ${isSelected ? isBlur ? "bg-[#484746]" : "bg-[#ad8d24]" : "hover:bg-[#433f41]"} py-1 px-2 items-center rounded-md justify-between`}>
        <div className='flex items-center gap-2 px-1'>
            <FolderClosed color={`${isSelected && !isBlur ? "white" : "#fea900"}`} size={16} />
            {!isEdit ? <p className='text-white text-[13px] font-semibold'>{folderName}</p> :
            <input onKeyDown={handleEnter} ref={inputRef} type='text' value={editingFolderName} onChange={(e) => setEditingFolderName(e.target.value)} className='w-[170px] text-[13px] text-white font-semibold bg-[#2a282c] px-1'/>}
        </div>
        <p className={`${isSelected ? "text-white" : "text-[#6b6769]"} text-sm`}>{count}</p>
    </div>  
  )
}

export default Folder