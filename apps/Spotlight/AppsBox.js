import React from 'react'

const AppsBox = ({openWindow, apps, closeSpotlight}) => {

    const openApp = (appName) => {
        openWindow(appName);
        closeSpotlight();
    }

    if(apps.length === 0) return null;

  return (
    <div className='w-full p-2 flex flex-col gap-0.5'>
        <p className='text-xs font-semibold text-[#b3b4bb] px-2'>Applications</p>
        {apps.map((app, index) => {
            return (
                <AppContainer onClick={() => openApp(app)} app={app} key={index}/>
            )
        })}
    </div>
  )
}

const AppContainer = ({app, onClick}) => {
    // bg-[#1c5ec9]
    return (
        <div>
            <div onClick={onClick} className='flex p-2 rounded-md items-center gap-2'>
                <img 
                    className='w-8'
                    src={`${app.toLowerCase()}.png`}
                />
                <p className='text-white text-sm'>{app.replace(/\b\w/g, (char) => char.toUpperCase())}</p>
            </div>
            <div className='w-full mx-2 border-[0.5px] border-[#4e4e5d]'></div>
        </div>
    )
}

export default AppsBox