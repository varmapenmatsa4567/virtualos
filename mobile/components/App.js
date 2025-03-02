import React from 'react';

const App = ({ children, minimizeApp, isActive }) => {
  return (
    <div className={`w-full h-[calc(100%-32px)] ${isActive ? "flex" : "hidden"} flex-col justify-between items-center`}>
      <div className='flex-grow w-full'>
        {children}
      </div>
      <div 
        onClick={minimizeApp}
        className='bg-white h-2 my-1 text-white rounded-full w-40'
      >
      </div>
    </div>
  );
};

export default App;