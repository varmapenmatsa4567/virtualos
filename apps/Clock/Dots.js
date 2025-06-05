import React from 'react'

const Dots = ({height = "h-24", gap = "gap-8", size = "2", px = "px-2", color = "bg-white"}) => {

    var dim = "w-2 h-2";
    if(size !== "2"){
        dim = size;
    }

  return (
    <div className={`flex flex-col justify-center ${gap} ${px}`}>
        <div className={`${color} ${dim} rounded-full`}></div>
        <div className={`${color} ${dim} rounded-full`}></div>
    </div>
  )
}

//h-24 gap-8
export default Dots