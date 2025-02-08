import React from 'react'

const AppIcon = ({appName, onClick}) => {
  return (
    <img onClick={onClick} src={`${appName.toLowerCase()}.png`} className='w-14 transition-transform duration-200 hover:scale-125' />
  )
}

export default AppIcon