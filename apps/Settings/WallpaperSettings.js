import useSettingsStore from '@/stores/settings-store'
import React from 'react'

const WallpaperSettings = () => {

  const {wallpaper, setWallpaper} = useSettingsStore();

  return (
    <div className='text-white p-4 flex flex-col gap-2'>
        <p>Select a wallpaper</p>
        <div className='grid grid-cols-3 gap-2'>
          <div onClick={() => setWallpaper("wallpaper0")} className={`bg-wallpaper0 p-1 w-32 h-20 bg-cover rounded-md ${wallpaper == "wallpaper0" && "border-2"} border-gray-300`}></div>
          <div onClick={() => setWallpaper("wallpaper2")} className={`bg-wallpaper2 w-32 h-20 bg-cover rounded-md ${wallpaper == "wallpaper2" && "border-2"} border-gray-300`}></div>
          <div onClick={() => setWallpaper("wallpaper3")} className={`bg-wallpaper3  w-32 h-20 bg-cover rounded-md ${wallpaper == "wallpaper3" && "border-2"} border-gray-300`}></div>
          <div onClick={() => setWallpaper("wallpaper4")} className={`bg-wallpaper4  w-32 h-20 bg-cover rounded-md ${wallpaper == "wallpaper4" && "border-2"} border-gray-300`}></div>
        </div>
    </div>
  )
}

export default WallpaperSettings