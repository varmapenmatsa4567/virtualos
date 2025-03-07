
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
import { Separator } from './ui/separator';
import DockAppIcon from './DockAppIcon';
import useSettingsStore from '@/stores/settings-store';
import useDockStore from '@/stores/dock-store';
  
export function ModernDock({ isVisible, toggleLaunchpad, setWindows, openWindow, windows }) {

  const minimizedWindows = windows.filter((window) => window.isMinimized);

  const { autoDock, openedAppsDots, showOpenedApps } = useSettingsStore();

  const { apps, addApp } = useDockStore();

  const isAppOpen = (appName) => {
    return windows.some((window) => window.appName === appName);
  }

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const appName = e.dataTransfer.getData('text/plain'); // Get the app name from the drag event
    if(apps.some((app) => app.appName === appName)) return;
    if(appName === "") return; 
    addApp(appName); // Add the app to the dock
  };

  return (
    <div onDragOver={handleDragOver}
    onDrop={handleDrop} className='absolute bottom-2 group left-1/2 max-w-full -translate-x-1/2 z-50'>
      <Dock
       className={`${autoDock && !isVisible && "invisible"} group-hover:visible items-end p-1.5 px-2 bg-black/50`}>
        {apps.map((app, idx) => (
          <DockAppIcon 
            onClick={() => app.appName == "launchpad" ? toggleLaunchpad() : openWindow(app.appName)}
            appName={app.appName}
            key={idx}
            isAppOpen={app.isApp ? false: openedAppsDots && isAppOpen(app.appName)}
          />
        ))}
        {showOpenedApps && minimizedWindows.length > 0 && <Separator orientation='vertical' className='h-10 mb-1 bg-gray-200' />}
        {showOpenedApps && minimizedWindows && minimizedWindows.map((window, idx) => (
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
  