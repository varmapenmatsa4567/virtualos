import React from 'react'

const Dots = ({height = "h-24", gap = "gap-8", size = "2", px = "px-2"}) => {
  return (
    <div className={`${height} flex flex-col justify-center ${gap} ${px}`}>
        <div className={`bg-white w-${size} h-${size} rounded-full`}></div>
        <div className={`bg-white w-${size} h-${size} rounded-full`}></div>
    </div>
  )
}

//h-24 gap-8
export default Dots