import Finder from '@/apps/Finder'
import Vscode from '@/apps/Vscode'
import React from 'react'

const AppManager = (props) => {

    if(props.appName === 'finder') {
        return <Finder {...props}/>
    }
    else if(props.appName === 'vscode') {
        return <Vscode {...props}/>
    }
  return (
    <div>AppManager</div>
  )
}

export default AppManager