import useSettingsStore from '@/stores/settings-store'
import React from 'react'

const WallpaperSettings = () => {

  const {wallpaper, setWallpaper} = useSettingsStore();

  return (
    <div className='text-white p-4 flex flex-col gap-2'>
        <p>Select a wallpaper</p>
        <div onClick={() => setWallpaper("wallpaper")} className={`bg-wallpaper w-36 h-20 bg-cover rounded-md ${wallpaper == "wallpaper" && "border"} border-gray-200`}></div>
        <div onClick={() => setWallpaper("wallpaper2")} className={`bg-wallpaper2 w-36 h-20 bg-cover rounded-md ${wallpaper == "wallpaper2" && "border"} border-gray-200`}></div>
        <div onClick={() => setWallpaper("wallpaper3")} className={`bg-wallpaper3  w-36 h-20 bg-cover rounded-md ${wallpaper == "wallpaper3" && "border"} border-gray-200`}></div>
    </div>
  )
}

export default WallpaperSettings