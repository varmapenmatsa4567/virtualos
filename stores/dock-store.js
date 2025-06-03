import { add } from 'mathjs';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useDockStore = create(
  persist(
    (set) => ({
        apps: [
            { appName: 'finder'},
            { appName: 'launchpad'},
            { appName: 'clock'},
            { appName: 'calculator'},
            { appName: 'notes'},
            { appName: 'photobooth'},
            { appName: 'photos'},
            { appName: 'safari'},
            { appName: 'settings'},
            { appName: 'calendar'},
          ],
        folders: ['downloads'],
        
        addApp: (appName) => set((state) => ({ apps: [...state.apps, { appName }] })),
        addFolder: (folderId) => set((state) => ({
          folders: [...state.folders,  folderId ]
        })),

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