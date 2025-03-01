import React from 'react'
import Phone from './apps/Phone/Phone'

const MobileAppManager = ({app, isActive, minimizeApp}) => {
  console.log("app", app);
    if(app === "phone") {
        return <Phone isActive={isActive} minimizeApp={minimizeApp} />
    }
  return null;
}

export default MobileAppManager