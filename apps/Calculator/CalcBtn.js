import React from 'react'

const CalcBtn = ({text, isIcon, Icon, isDifColor, onClick}) => {
  return (
    <div onClick={onClick} className={`${isDifColor ? 'bg-[#ff9500]' : 'bg-[#747072]'} text-xl text-white w-11 flex items-center justify-center h-11 rounded-full`}>
        {isIcon ? <Icon/> : text}
    </div>
  )
}

export default CalcBtn