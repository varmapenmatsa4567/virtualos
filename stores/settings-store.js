import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSettingsStore = create(
  persist(
    (set) => ({
      wallpaper: 'wallpaper0', // Default wallpaper
      wifi: false, // Wi-Fi state
      bluetooth: false, // Bluetooth state
      darkMode: false, // Dark mode state
      isLocked: false, // Lock state

      hydrated: false, // Hydration state

      toggleLock: () => set((state) => ({ isLocked: !state.isLocked })),
      setWallpaper: (wallpaper) => set({ wallpaper }),
      toggleWifi: () => set((state) => ({ wifi: !state.wifi })),
      toggleBluetooth: () => set((state) => ({ bluetooth: !state.bluetooth })),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
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