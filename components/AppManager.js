import Finder from '@/apps/Finder/Finder'
import Vscode from '@/apps/Vscode'
import Terminal from '@/apps/Terminal'
import React from 'react'
import Safari from '@/apps/Safari'
import Sudoko from '@/apps/Sudoko/Sudoko'
import Notes from '@/apps/Notes/Notes'
import Photos from '@/apps/Photos/Photos'
import Photobooth from '@/apps/Photobooth/Photobooth'
import VlcPlayer from '@/apps/VlcPlayer/VlcPlayer'
import Calculator from '@/apps/Calculator/Calculator'
import Clock from '@/apps/Clock/Clock'

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
    else if(props.appName === 'notes') {
        return <Notes {...props}/>
    }
    else if(props.appName === 'photos') {
        return <Photos {...props}/>
    }
    else if(props.appName === 'photobooth'){
        return <Photobooth {...props}/>
    }
    else if(props.appName === 'vlcplayer') {
        return <VlcPlayer {...props}/>
    }
    else if(props.appName === 'calculator') {
        return <Calculator {...props}/>
    }
    else if(props.appName === 'clock') {
        return <Clock {...props}/>
    }
  return null;
}

export default AppManager