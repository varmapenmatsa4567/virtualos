import React, { useState, useEffect} from 'react';
import Clock from 'react-clock';

const WorldClock = ({isActive}) => {

    const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className={`w-full h-full bg-white overflow-auto p-4 ${isActive ? "flex" : "hidden"} flex-col`}>
        <Clock value={value} className="mx-auto text-white text-8xl font-extralight"/>
    </div>
  )
}

export default WorldClock