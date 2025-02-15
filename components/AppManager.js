import Finder from '@/apps/Finder/Finder'
import Vscode from '@/apps/Vscode'
import Terminal from '@/apps/Terminal'
import React from 'react'
import Safari from '@/apps/Safari'
import Sudoko from '@/apps/Sudoko/Sudoko'

const AppManager = (props) => {

    if(props.appName === 'finder') {
        return <Finder {...props}/>
    }
    else if(props.appName === 'vscode') {
        return <Vscode {...props}/>
    }
    else if(props.appName === 'terminal') {
        return <Terminal {...props}/>
    }
    else if(props.appName === 'safari') {
        return <Safari {...props}/>
    }
    else if(props.appName === 'sudoko') {
        return <Sudoko {...props}/>
    }
  return null;
}

export default AppManager