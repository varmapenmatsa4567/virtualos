
import Window from "@/components/Window";
import App from "./App";
import { appLabels, appStoreApps } from "@/utils/data";
import useAppsStore from "@/stores/apps-store";

const AppStore = ({openWindow, ...props}) => {

  const {apps, addApp} = useAppsStore();

  const onClick = (appName) => {
    if(apps.includes(appName)) {
      setTimeout(() => {
        openWindow(appName);
      }, 500);
      return;
    }
    addApp(appName)
  }

  return (
    <Window {...props} 
    isCustomized={true}
    customSize={{width: 750, height: 350}}
    >
      <div className="w-full h-full overflow-auto">
        <div className="grid grid-cols-2 overflow-y-scroll p-5 gap-x-8 gap-y-4">
          {appStoreApps.map((app, index) => {
            const appName = app["appName"];
            let appLabel = appName;
            if(appName in appLabels) {
              appLabel = appLabels[appName];
            }
            return <App
              key={index}
              appName={appLabel} 
              icon={appName}
              isInstalled={apps.includes(appName)}
              onClick={() => onClick(appName)}
              subtitle={app["category"]}
            />
          })}
        </div>
      </div>
    </Window>
  )
}

export default AppStore;