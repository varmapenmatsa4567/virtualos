import React from 'react'

const Box = ({children, padding}) => {
  return (
    <div className={`${padding} border rounded-md border-[#514c50] w-full flex flex-col`}>
        {children}
    </div>
  )
}

export default Box