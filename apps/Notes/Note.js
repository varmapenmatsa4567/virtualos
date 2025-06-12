import { getNonEmptyNodeIndexes, stripHtml } from '@/utils/utils'
import React from 'react'

const Note = ({isSelected, onClick, dateModified, content}) => {

  const { first, second } = getNonEmptyNodeIndexes(content);

  const derivedTitle = stripHtml(content, first);
  const subTitle = stripHtml(content, second)

  return (
    <div onClick={onClick} className={`flex px-5 py-2 text-[13px] font-semibold flex-col ${isSelected ? "bg-[#a0812b]" : null} text-white p-2 rounded-md`}>
        <p>{derivedTitle || "New Note"}</p>
        <div className='flex justify-between font-normal overflow-hidden text-nowrap gap-2'>
            <p>{dateModified}</p>
            <p className={`${isSelected ? "text-[#d5c5a2]" : "text-[#9e9a9b]"}`}>{subTitle != '' ? subTitle : 'No additional text'}</p>
        </div>
    </div>
  )
}

export default Note