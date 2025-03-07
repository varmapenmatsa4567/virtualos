import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useDockStore = create(
  persist(
    (set) => ({
        apps: [
            { appName: 'finder'},
            { appName: 'clock'},
            { appName: 'launchpad'},
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
          ],
        
        addApp: (appName) => set((state) => {
          const appExists = state.apps.some(app => app.appName === appName);
          if (!appExists) {
            return { apps: [...state.apps, { appName }] };
          }
          return state;
        }),

        removeApp: (appName) => set((state) => ({
          apps: state.apps.filter(app => app.appName !== appName)
        })),
    }),
    {
      name: 'dock-storage', // Unique name for localStorage key
      getStorage: () => localStorage, // Use localStorage as the storage
    }
  )
);

export default useDockStore;