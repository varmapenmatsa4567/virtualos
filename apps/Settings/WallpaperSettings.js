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
          <div onClick={() => setWallpaper("wallpaper1")} className={`bg-wallpaper1 w-32 h-20 bg-cover rounded-md ${wallpaper == "wallpaper1" && "border-2"} border-gray-300`}></div>
          <div onClick={() => setWallpaper("wallpaper2")} className={`bg-wallpaper2 w-32 h-20 bg-cover rounded-md ${wallpaper == "wallpaper2" && "border-2"} border-gray-300`}></div>
          <div onClick={() => setWallpaper("wallpaper3")} className={`bg-wallpaper3 w-32 h-20 bg-cover rounded-md ${wallpaper == "wallpaper3" && "border-2"} border-gray-300`}></div>
          <div onClick={() => setWallpaper("wallpaper4")} className={`bg-wallpaper4 w-32 h-20 bg-cover rounded-md ${wallpaper == "wallpaper4" && "border-2"} border-gray-300`}></div>
          <div onClick={() => setWallpaper("wallpaper5")} className={`bg-wallpaper5 w-32 h-20 bg-cover rounded-md ${wallpaper == "wallpaper5" && "border-2"} border-gray-300`}></div>
          <div onClick={() => setWallpaper("wallpaper6")} className={`bg-wallpaper6 w-32 h-20 bg-cover rounded-md ${wallpaper == "wallpaper6" && "border-2"} border-gray-300`}></div>
          <div onClick={() => setWallpaper("wallpaper7")} className={`bg-wallpaper7 w-32 h-20 bg-cover rounded-md ${wallpaper == "wallpaper7" && "border-2"} border-gray-300`}></div>
          <div onClick={() => setWallpaper("wallpaper8")} className={`bg-wallpaper8 w-32 h-20 bg-cover rounded-md ${wallpaper == "wallpaper8" && "border-2"} border-gray-300`}></div>
          <div onClick={() => setWallpaper("wallpaper9")} className={`bg-wallpaper9 w-32 h-20 bg-cover rounded-md ${wallpaper == "wallpaper9" && "border-2"} border-gray-300`}></div>
          <div onClick={() => setWallpaper("wallpaper10")} className={`bg-wallpaper10 w-32 h-20 bg-cover rounded-md ${wallpaper == "wallpaper10" && "border-2"} border-gray-300`}></div>
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