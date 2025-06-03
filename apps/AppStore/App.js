import React from 'react'

const App = ({appName, icon, subtitle}) => {
  return (
    <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
                <img src={`${icon}.png`} className='w-16'/>
                <div className='flex flex-col'>
                    <p className='text-white'>{appName}</p>
                    <p className='text-[#a29e9e] text-xs'>{subtitle}</p>
                </div>
            </div>
            <button className='bg-[#f2f2f7] rounded-full text-[#007aff] px-3 p-0.5 font-semibold text-xs'>Install</button>
        </div>
        <img className='w-11/12 self-center rounded-md' src={`./appstore/${icon}-screenshot.png`}/>
    </div>
  )
}

export default App