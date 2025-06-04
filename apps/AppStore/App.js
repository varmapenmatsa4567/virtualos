import React from 'react'

const App = ({appName, icon, subtitle, isInstalled, onClick}) => {
  return (
    <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
                <img src={`${icon}.png`} className='w-16'/>
                <div className='flex flex-col'>
                    <p className='text-white'>{appName.replace(/\b\w/g, (char) => char.toUpperCase())}</p>
                    <p className='text-[#a29e9e] text-xs'>{subtitle}</p>
                </div>
            </div>
            <button onClick={onClick} className='bg-[#f2f2f7] rounded-full text-[#007aff] px-3 p-0.5 font-semibold text-xs'>{isInstalled ? "Open" : "Install"}</button>
        </div>
        <img className='w-11/12 self-center rounded-md' src={`./appstore/${icon}-screenshot.png`}/>
    </div>
  )
}

export default App