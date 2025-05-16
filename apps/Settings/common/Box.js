import React from 'react'

const Box = ({children, padding, onClick}) => {
  return (
    <div onClick={onClick} className={`${padding} border rounded-md border-[#514c50] w-full flex flex-col`}>
        {children}
    </div>
  )
}

export default Box