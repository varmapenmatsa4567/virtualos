
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
import { Separator } from './ui/separator';
import DockAppIcon from './DockAppIcon';
  
export function ModernDock({ isVisible, toggleLaunchpad, setWindows, openWindow, windows }) {

  const minimizedWindows = windows.filter((window) => window.isMinimized);

  const isAppOpen = (appName) => {
    return windows.some((window) => window.appName === appName);
  }

  const apps = [
    { appName: 'finder'},
    { appName: 'clock'},
    { appName: 'launchpad', onClick: toggleLaunchpad, isApp: false},
    { appName: 'calculator'},
    { appName: 'notes'},
    { appName: 'photobooth'},
    { appName: 'photos'},
    { appName: 'safari'},
    { appName: 'settings'},
    { appName: 'vscode'},
    { appName: 'compiler'},
    { appName: 'calendar'},
    { appName: 'sudoko'},
    { appName: 'vlcplayer'},
  
  ]

  return (
    <div className='absolute bottom-2 left-1/2 max-w-full -translate-x-1/2'>
      <Dock className='items-end p-1.5 px-2 bg-black/30'>
        {apps.map((app, idx) => (
          <DockAppIcon 
            onClick={() => app.onClick ? app.onClick() : openWindow(app.appName)}
            appName={app.appName}
            key={idx}
            isAppOpen={app.onClick ? false: isAppOpen(app.appName)}
          />
        ))}
        {minimizedWindows.length > 0 && <Separator orientation='vertical' className='h-10 mb-1 bg-gray-200' />}
        {minimizedWindows && minimizedWindows.map((window, idx) => (
            <DockAppIcon 
              onClick={() => setWindows(windows.map((w) => w.id === window.id ? { ...w, isMinimized: !w.isMinimized } : w))}
              appName={window.appName}
              key={idx}
            />
        ))}
        <Separator orientation='vertical' className='h-10 mb-1 bg-gray-200' />
        <DockAppIcon 
          appName={'trash-full'}
        />
      </Dock>
    </div>
  );
}
  