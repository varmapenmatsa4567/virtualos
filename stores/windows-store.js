import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWindowsStore = create(
  persist(
    (set) => ({
        windows: [], // Array to hold opened windows
        activeWindow: null, // Currently active window
        openedApps: [], // Array to hold opened apps
        appsState: {},

        setWindows: (windows) => set({ windows }), // Set the windows array
        setActiveWindow: (activeWindow) => set({ activeWindow }), // Set the active window
        setOpenedApps: (openedApps) => set({ openedApps }), // Set the opened apps array
        setAppsState: (appsState) => set({ appsState }), // Set the apps state
    }),
    {
      name: 'window-storage', // Unique name for localStorage key
      getStorage: () => localStorage, // Use localStorage as the storage
    }
  )
);

export default useWindowsStore;