import React from 'react'

const Folder = ({folderName}) => {
  return (
    <div className='flex flex-col items-center'>
        <img src='folder.png' className='w-16 h-16'/>
        <p className='text-white text-[13px] font-medium'>{folderName}</p>
    </div>
  )
}

export default Folder