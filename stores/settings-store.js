import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSettingsStore = create(
  persist(
    (set) => ({
      wallpaper: 'wallpaper0', // Default wallpaper
      wifi: false, // Wi-Fi state
      connectedWifi: "", // Wi-Fi connected state
      bluetooth: false, // Bluetooth state
      darkMode: false, // Dark mode state
      isLocked: false, // Lock state
      restart: false, // Restart state
      autoDock: true,
      openedAppsDots: true, // Show open apps state
      showOpenedApps: true, // Show opened apps state
      titleBarAction: "maximize", // Default title bar action

      hydrated: false, // Hydration state

      toggleLock: () => set((state) => ({ isLocked: !state.isLocked })),
      toggleRestart: () => set((state) => ({ restart: !state.restart })),
      setWallpaper: (wallpaper) => set({ wallpaper }),
      toggleWifi: () => set((state) => ({ wifi: !state.wifi })),
      setConnectedWifi: (connected) => set({ connectedWifi: connected }),
      toggleBluetooth: () => set((state) => ({ bluetooth: !state.bluetooth })),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      toggleAutoDock: () => set((state) => ({ autoDock: !state.autoDock })),
      toggleOpenedAppsDots: () => set((state) => ({ openedAppsDots: !state.openedAppsDots })),
      toggleShowOpenedApps: () => set((state) => ({ showOpenedApps: !state.showOpenedApps })),
      setTitleBarAction: (action) => set({ titleBarAction: action }),
    }),
    {
      name: 'settings-storage', // Unique name for localStorage key
      getStorage: () => localStorage, // Use localStorage as the storage
      onRehydrateStorage: () => (state) => {
        // Called after rehydration
        state.hydrated = true;
      }
    }
  )
);

export default useSettingsStore;