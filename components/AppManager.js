import React, { Suspense } from 'react'

const appComponents = {
  finder: React.lazy(() => import('@/apps/ModernFinder/Finder')),
  vscode: React.lazy(() => import('@/apps/Vscode')),
  terminal: React.lazy(() => import('@/apps/Terminal/Terminal')),
  safari: React.lazy(() => import('@/apps/Safari')),
  sudoku: React.lazy(() => import('@/apps/Sudoko/Sudoko')),
  notes: React.lazy(() => import('@/apps/Notes/Notes')),
  photos: React.lazy(() => import('@/apps/Photos/Photos')),
  photobooth: React.lazy(() => import('@/apps/Photobooth/Photobooth')),
  vlcplayer: React.lazy(() => import('@/apps/VlcPlayer/VlcPlayer')),
  calculator: React.lazy(() => import('@/apps/Calculator/Calculator')),
  clock: React.lazy(() => import('@/apps/Clock/Clock')),
  compiler: React.lazy(() => import('@/apps/Compiler')),
  settings: React.lazy(() => import('@/apps/Settings/Settings')),
  tictactoe: React.lazy(() => import('@/apps/TicTacToe/TicTacToe')),
  screenshot: React.lazy(() => import('@/apps/Screenshot/Screenshot')),
  imageviewer: React.lazy(() => import('@/apps/Viewers/ImageViewer')),
  tips: React.lazy(() => import('@/apps/Tips/Tips')),
  shortcuts: React.lazy(() => import('@/apps/Shortcuts/Shortcuts')),
  calendar: React.lazy(() => import('@/apps/Calendar/Calendar')),
  appstore: React.lazy(() => import('@/apps/AppStore/AppStore')),
  siri: React.lazy(() => import('@/apps/Siri/Siri')),
  2048: React.lazy(() => import('@/apps/2048/2048')),
  chess: React.lazy(() => import('@/apps/Chess/Chess')),
  news: React.lazy(() => import('@/apps/News/News')),
  music: React.lazy(() => import('@/apps/Music/Music')),
  reminders: React.lazy(() => import('@/apps/Reminders/Reminders')),
  facetime: React.lazy(() => import('@/apps/Facetime/Facetime')),
  weather: React.lazy(() => import('@/apps/Weather/Weather')),
  dictionary: React.lazy(() => import('@/apps/Dictionary/Dictionary')),
  preview: React.lazy(() => import('@/apps/Preview/Preview')),
  stickies: React.lazy(() => import('@/apps/Stickies/Stickies')),
};

const AppManager = (props) => {
    const AppComponent = appComponents[props.appName];

    if (!AppComponent) return null;

    return (
        <Suspense fallback={null}>
            <AppComponent {...props} />
        </Suspense>
    );
}

export default AppManager
