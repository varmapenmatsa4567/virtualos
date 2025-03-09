import useGlobalStore from '@/stores/global-store'
import React, { useEffect, useState } from 'react'
import { BsWindow, BsWindowDesktop } from 'react-icons/bs'
import { PiRectangleDashed } from 'react-icons/pi'
import { RxCross2 } from 'react-icons/rx'

const Screenshot = ({onClose, ...props}) => {

    const [selectedItem, setSelectedItem] = useState(0);

    const { setIsFullScreenshot ,setIsWindowScreenshot, closeScreenshot } = useGlobalStore();

    const changeSelection = (index) => {
        closeScreenshot();
        if(index == 1){
            setIsWindowScreenshot(true);
        }
        else if(index == 0){
            setIsFullScreenshot(true);
        }
        setSelectedItem(index);
    }

    const handleClose = () => {
        closeScreenshot();
        onClose();
    }

    useEffect(() => {
        setIsFullScreenshot(true);
    },[])

  return (
    <div id='screenshot' className='fixed bottom-32 left-[50%] flex translate-x-[-50%] z-[9999]'>
      <div className='bg-black bg-opacity-50 flex items-center gap-2 rounded-lg px-2 p-1 shadow-2xl'>
        <div onClick={handleClose} className='text-gray-500 rounded-full text-[10px] p-0.5 bg-white'><RxCross2/></div>
        <div onClick={() => changeSelection(0)} className={`text-white p-1.5 rounded-md text-xs ${selectedItem == 0 && "bg-gray-500"} `}><BsWindowDesktop size={30}/></div>
        <div onClick={() => changeSelection(1)} className={`text-white p-1.5 rounded-md text-xs ${selectedItem == 1 && "bg-gray-500"}`}><BsWindow size={30}/></div>
        <div onClick={() => changeSelection(2)} className={`text-white p-1.5 rounded-md text-xs ${selectedItem == 2 && "bg-gray-500"}`}><PiRectangleDashed size={35}/></div>
      </div>
    </div>
  )
}

export default Screenshot