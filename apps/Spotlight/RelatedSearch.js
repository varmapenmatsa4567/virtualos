import React from 'react'

const RelatedSearch = ({searchText, closeSpotlight}) => {

    const openSearch = () => {
        window.open(`https://www.google.com/search?q=${searchText}`, '_blank');
        closeSpotlight();
    }

  return (
    <div className='w-full p-2 flex flex-col gap-0.5'>
        <p className='text-xs font-semibold text-[#b3b4bb] px-2'>Related Searches</p>
        <div onClick={openSearch} className='flex p-2 rounded-md items-center gap-2'>
            <img 
                className='w-6'
                src={`safari.png`}
            />
            <p className='text-white text-[13px]'>Search in the Web</p>
        </div>
    </div>
  )
}

export default RelatedSearch