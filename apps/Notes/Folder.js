import { FolderClosed } from 'lucide-react'
import React from 'react'

const Folder = ({isSelected, onClick ,folderName, count}) => {
  return (
    <div onClick={onClick} className={`flex ${isSelected ? "bg-[#ad8d24]" : "hover:bg-[#433f41]"} py-1 px-2 items-center rounded-md justify-between`}>
        <div className='flex items-center gap-2 px-1'>
            <FolderClosed color={`${isSelected ? "white" : "#fea900"}`} size={16} />
            <p className='text-white text-[13px] font-semibold'>{folderName}</p>
        </div>
        <p className={`${isSelected ? "text-white" : "text-[#6b6769]"} text-sm`}>{count}</p>
    </div>  
  )
}

export default Folder