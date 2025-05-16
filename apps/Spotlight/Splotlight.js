import React from 'react'
import { IoIosSearch } from 'react-icons/io'
import { Rnd } from 'react-rnd'

const Splotlight = () => {
  return (
    <Rnd
        bounds=".main"
    >
        <div className='bg-[#27283e] flex flex-col w-[600px] cursor-default rounded-2xl shadow-2xl border border-gray-700'>
            <div className='h-14 w-full flex items-center px-2'>
                <IoIosSearch className='text-[#a4bfd3] text-3xl'/>
                <input type="text" className='bg-transparent w-full outline-none text-white'/>
            </div>
        </div>
    </Rnd>
  )
}

export default Splotlight