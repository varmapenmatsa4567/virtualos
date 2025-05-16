import React from 'react'

const AppsBox = ({apps}) => {
  return (
    <div className='w-full p-2 flex flex-col gap-0.5'>
        {apps.map((app, index) => {
            return (
                <AppContainer app={app} key={index}/>
            )
        })}
    </div>
  )
}

const AppContainer = ({app}) => {
    // bg-[#1c5ec9]
    return (
        <div className='flex p-2 rounded-md items-center gap-2'>
            <img 
                className='w-8'
                src={`${app.toLowerCase()}.png`}
            />
            <p className='text-white text-sm'>{app.replace(/\b\w/g, (char) => char.toUpperCase())}</p>
        </div>
    )
}

export default AppsBox