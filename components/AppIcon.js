import React from 'react'
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip'

const AppIcon = ({appName, onClick}) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <img onClick={onClick} src={`${appName.toLowerCase()}.png`} className='w-14 transition-transform duration-200 hover:scale-125' />
      </TooltipTrigger>
      <TooltipContent>
        <p>{appName.replace(/\b\w/g, (char) => char.toUpperCase())}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export default AppIcon