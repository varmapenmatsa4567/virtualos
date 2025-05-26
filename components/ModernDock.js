
import { Dock } from '@/components/ui/dock';
import { Separator } from './ui/separator';
import DockAppIcon from './DockAppIcon';
import useSettingsStore from '@/stores/settings-store';
import useDockStore from '@/stores/dock-store';
import useFinderStore from '@/stores/finder-store';
  
export function ModernDock({ isVisible, toggleLaunchpad, setWindows, openWindow, windows }) {

  const minimizedWindows = windows.filter((window) => window.isMinimized);

  const { autoDock, openedAppsDots, showOpenedApps, dockSize, dockMagnification } = useSettingsStore();

  const { finderItems } = useFinderStore();

  const isTrashEmpty = finderItems.filter((item) => item.parentId === "trash").length === 0;

  const { apps, addApp, folders } = useDockStore();

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
    onDrop={handleDrop} className='absolute bottom-2 group left-1/2 max-w-full -translate-x-1/2 z-[65]'>
      <Dock
      magnification={50 + dockMagnification * 10}
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
        {folders.map((folder, idx) => {
          const folderName = finderItems.find((item) => item.id === folder)?.name || 'Unknown Folder';
          return <DockAppIcon 
            onClick={() => openWindow('finder', { requiredItemId: folder })}
            appName={`folder-${folderName}`}
            key={idx}
          />
      })}
        <DockAppIcon 
          onClick={() => openWindow('finder', { requiredItemId: 'trash', isTrash: true })}
          appName={isTrashEmpty ? 'trash-empty' : 'trash-full'}
        />
      </Dock>
    </div>
  );
}
  