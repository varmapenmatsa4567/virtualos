import { getNonEmptyNodeIndexes, stripHtml } from '@/utils/utils'
import React from 'react'

const Note = ({isSelected, onClick, dateModified, title, content}) => {

  const { titleIndex, subTitleIndex } = getNonEmptyNodeIndexes(content);

  const derivedTitle = stripHtml(content, titleIndex);
  const subTitle = stripHtml(content, subTitleIndex)

  return (
    <div onClick={onClick} className={`flex px-5 py-2 text-[13px] font-semibold flex-col ${isSelected ? "bg-[#a0812b]" : null} text-white p-2 rounded-md`}>
        <p>{derivedTitle || title}</p>
        <div className='flex justify-between font-normal overflow-hidden text-nowrap gap-2'>
            <p>{dateModified}</p>
            <p className={`${isSelected ? "text-[#d5c5a2]" : "text-[#9e9a9b]"}`}>{subTitle || ''}</p>
        </div>
    </div>
  )
}

export default Note