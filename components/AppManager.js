// import Finder from '@/apps/Finder/Finder'
import Vscode from '@/apps/Vscode'
import Terminal from '@/apps/Terminal/Terminal'
import React from 'react'
import Safari from '@/apps/Safari'
import Sudoko from '@/apps/Sudoko/Sudoko'
import Notes from '@/apps/Notes/Notes'
import Photos from '@/apps/Photos/Photos'
import Photobooth from '@/apps/Photobooth/Photobooth'
import VlcPlayer from '@/apps/VlcPlayer/VlcPlayer'
import Calculator from '@/apps/Calculator/Calculator'
import Clock from '@/apps/Clock/Clock'
import Compiler from '@/apps/Compiler'
import Settings from '@/apps/Settings/Settings'
import TicTacToe from '@/apps/TicTacToe/TicTacToe'
import Screenshot from '@/apps/Screenshot/Screenshot'
import useGlobalStore from '@/stores/global-store'
import ImageViewer from '@/apps/Viewers/ImageViewer'
import Tips from '@/apps/Tips/Tips'
import Finder from '@/apps/ModernFinder/Finder'
import Shortcuts from '@/apps/Shortcuts/Shortcuts'
import Calendar from '@/apps/Calendar/Calendar'
import AppStore from '@/apps/AppStore/AppStore'
import Siri from '@/apps/Siri/Siri'
import Game2048 from '@/apps/2048/2048'
import Chess from '@/apps/Chess/Chess'
import News from '@/apps/News/News'
import Music from '@/apps/Music/Music'
import Reminders from '@/apps/Reminders/Reminders'
import Facetime from '@/apps/Facetime/Facetime'
import Weather from '@/apps/Weather/Weather'
import Dictionary from '@/apps/Dictionary/Dictionary'

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
    else if(props.appName === 'compiler') {
        return <Compiler {...props}/>
    }
    else if(props.appName === 'settings') {
        return <Settings {...props}/>
    }
    else if(props.appName === 'tictactoe') {
        return <TicTacToe {...props}/>
    }
    else if(props.appName === 'screenshot') {
        return <Screenshot {...props}/>
    }
    else if(props.appName === 'imageviewer') {
        return <ImageViewer {...props}/>
    }
    else if(props.appName === 'tips') {
        return <Tips {...props}/>
    }
    else if(props.appName === 'shortcuts'){
        return <Shortcuts {...props}/>
    }
    else if(props.appName === 'calendar') {
        return <Calendar {...props}/>
    }
    else if(props.appName === 'appstore') {
        return <AppStore {...props}/>
    }
    else if(props.appName === 'siri') {
        return <Siri {...props}/>
    }
    else if(props.appName === '2048') {
        return <Game2048 {...props}/>
    }
    else if(props.appName === 'chess') {
        return <Chess {...props}/>
    }
    else if(props.appName === 'news') {
        return <News {...props}/>
    }
    else if(props.appName === 'music') {
        return <Music {...props}/>
    }
    else if(props.appName === 'reminders') {
        return <Reminders {...props}/>
    }
    else if(props.appName === 'facetime') {
        return <Facetime {...props}/>
    }
    else if(props.appName === 'weather') {
        return <Weather {...props}/>
    }
    else if(props.appName === 'dictionary') {
        return <Dictionary {...props}/>
    }

  return null;
}

export default AppManager