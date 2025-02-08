import React from 'react'
import Window from '@/components/Window'
import Folder from '@/components/Folder'
import File from '../components/File'

const Finder = (props) => {
  return (
    <Window {...props}>
        <div className='w-full p-3 px-6 flex gap-x-4 gap-y-2 flex-wrap'>
            <Folder folderName="React"/>
            <Folder folderName="Node"/>
            <File fileName="sample.pdf"/>
            <File fileName="sample.docx"/>
            <File fileName="main.py"/>
        </div>
    </Window>
  )
}

export default Finder