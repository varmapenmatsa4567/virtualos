import React, { useRef, useState } from 'react'
import AppIcon from '@/components/AppIcon'
import { Input } from '@/components/ui/input'
import useSettingsStore from '@/stores/settings-store'
import useAppsStore from '@/stores/apps-store'

const Launchpad = ({ toggleLaunchpad, openWindow }) => {
  const input = useRef(null);
  const { wallpaper } = useSettingsStore();
  const { apps } = useAppsStore();
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverItem, setDraggedOverItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputClick = (e) => {
    e.stopPropagation();
    input.current.focus();
  };

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDraggedOverItem(index);
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === index) return;
    
    const newApps = [...apps];
    const movedItem = newApps[draggedItem];
    newApps.splice(draggedItem, 1);
    newApps.splice(index, 0, movedItem);
    
    setApps(newApps);
    setDraggedOverItem(null);
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDraggedOverItem(null);
  };

  const getFilteredApps = () => {
    if (!searchQuery) return apps;
    const query = searchQuery.toLowerCase();
    return apps.filter(app => app.toLowerCase().includes(query));
  }

  const filteredApps = getFilteredApps();

  return (
    <div 
      onClick={toggleLaunchpad} 
      className={`fixed duration-300 ease-in-out transition-all top-0 left-0 bg-${wallpaper} w-screen h-screen bg-cover z-[60]`}
    >            
      <div className='w-full h-full px-32 pb-40 backdrop-filter backdrop-blur-lg'>
        <div className='mb-10'>
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            ref={input} 
            onClick={handleInputClick} 
            type='text' 
            placeholder='Search' 
            className='w-1/6 placeholder:text-center text-center mx-auto mt-8 text-white' 
          />
        </div>
        { filteredApps.length !== 0 ? (
          <div className='grid grid-cols-9 gap-x-4 gap-y-7'>
            {filteredApps.map((app, idx) => (
              <div
                key={idx}
                draggable
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDrop={(e) => handleDrop(e, idx)}
                onDragEnd={handleDragEnd}
                className={`transition-transform duration-200 ${
                  draggedItem === idx ? 'opacity-50' : ''
                } ${
                  draggedOverItem === idx ? 'scale-110' : ''
                }`}
              >
                <AppIcon
                  titleRequired={true}
                  isAppSwitcher={true}
                  appName={app}
                  onClick={() => openWindow(app)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className='text-white w-full h-full flex items-center justify-center font-light text-4xl'>No Results</div>
        )}
      </div>
    </div>
  )
}

export default Launchpad