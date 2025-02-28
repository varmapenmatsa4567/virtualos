import React from 'react'

const Dots = ({height = "h-24", gap = "gap-8", size = "2", px = "px-2"}) => {

    var dim = "w-2 h-2";
    if(size !== "2"){
        dim = "w-[2px] h-[2px]";
    }

  return (
    <div className={`${height} flex flex-col justify-center ${gap} ${px}`}>
        <div className={`bg-white ${dim} rounded-full`}></div>
        <div className={`bg-white ${dim} rounded-full`}></div>
    </div>
  )
}

//h-24 gap-8
export default Dots