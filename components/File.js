import React from 'react'
import {FileIcon, defaultStyles} from 'react-file-icon'

const File = ({fileName}) => {

  const fileExtension = fileName.split('.').pop()

  return (
    <div className='w-16 h-[83.5px] flex flex-col items-center justify-center gap-2'>
        <FileIcon extension={fileExtension} {...defaultStyles[fileExtension]}/>
        <p className='text-[13px] flex-1 text-white font-medium'>{fileName}</p>
    </div>
  )
}

export default File