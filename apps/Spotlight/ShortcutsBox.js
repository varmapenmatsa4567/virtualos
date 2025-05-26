import React from 'react'

const ShortcutsBox = ({openWindow, shortcuts, closeSpotlight}) => {

    if(shortcuts.length === 0) return null;

  return (
    <div className='w-full p-2 flex flex-col gap-0.5'>
        <p className='text-xs font-semibold text-[#b3b4bb] px-2'>Shortcuts</p>
        {shortcuts.map((shortcut, index) => {
            return (
                <ShortcutContainer shortcut={shortcut} key={index}/>
            )
        })}
    </div>
  )
}

const ShortcutContainer = ({shortcut}) => {
    // bg-[#1c5ec9]
    return (
        <div>
            <div className='flex p-2 rounded-md items-center gap-2'>
                <img 
                    className='w-8'
                    src={shortcut.image}
                />
                <p className='text-white text-sm'>{shortcut.name.replace(/\b\w/g, (char) => char.toUpperCase())}</p>
            </div>
            <div className='w-full mx-2 border-[0.5px] border-[#4e4e5d]'></div>
        </div>
    )
}

export default ShortcutsBox