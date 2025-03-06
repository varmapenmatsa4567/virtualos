import useSettingsStore from '@/stores/settings-store'
import React from 'react'

const WallpaperSettings = () => {

  const {wallpaper, setWallpaper} = useSettingsStore();

  const getColor = (color) => {
    const colorName = color.split("-")[1];
    return colorName+"-500";
  }

  const colors = ["bg-blue-500", "bg-red-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500", "bg-gray-500", "bg-orange-500", "bg-teal-500", "bg-indigo-500", "bg-lime-500", "bg-emerald-500", "bg-sky-500", "bg-rose-500"];

  return (
    <div className='text-white p-4 flex flex-col gap-2'>
        <p className='text-sm'>Wallpapers</p>
        <div className='grid grid-cols-3 gap-2'>
          <div onClick={() => setWallpaper("wallpaper0")} className={`bg-wallpaper0 p-1 w-32 h-20 bg-cover rounded-md ${wallpaper == "wallpaper0" && "border-2"} border-gray-300`}></div>
          <div onClick={() => setWallpaper("wallpaper2")} className={`bg-wallpaper2 w-32 h-20 bg-cover rounded-md ${wallpaper == "wallpaper2" && "border-2"} border-gray-300`}></div>
          <div onClick={() => setWallpaper("wallpaper3")} className={`bg-wallpaper3  w-32 h-20 bg-cover rounded-md ${wallpaper == "wallpaper3" && "border-2"} border-gray-300`}></div>
          <div onClick={() => setWallpaper("wallpaper4")} className={`bg-wallpaper4  w-32 h-20 bg-cover rounded-md ${wallpaper == "wallpaper4" && "border-2"} border-gray-300`}></div>
        </div>
        <p className='text-sm'>Colors</p>
        <div className='grid grid-cols-7 gap-2'>
          {colors.map((color) => (
            <div key={color} onClick={() => setWallpaper(getColor(color))} className={`${color} w-12 h-12 rounded-full ${wallpaper == getColor(color) && "border-2"} border-gray-300`}></div>
          ))}
        </div>
    </div>
  )
}

export default WallpaperSettings