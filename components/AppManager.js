import Finder from '@/apps/Finder'
import React from 'react'

const AppManager = (props) => {

    if(props.appName === 'finder') {
        return <Finder {...props}/>
    }
  return (
    <div>AppManager</div>
  )
}

export default AppManager