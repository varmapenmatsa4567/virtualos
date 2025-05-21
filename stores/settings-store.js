import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSettingsStore = create(
  persist(
    (set) => ({
      wallpaper: 'wallpaper1', // Default wallpaper
      wifi: false, // Wi-Fi state
      connectedWifi: "", // Wi-Fi connected state
      bluetooth: false, // Bluetooth state
      connectedBluetooth: "", // Bluetooth connected state
      darkMode: false, // Dark mode state
      isLocked: false, // Lock state
      restart: false, // Restart state
      autoDock: true,
      openedAppsDots: true, // Show open apps state
      showOpenedApps: true, // Show opened apps state
      titleBarAction: "maximize", // Default title bar action
      dockPosition: "bottom", // Default dock position
      dockMagnification: 5, // Default dock magnification
      dockSize: 5, // Default dock size
      wifiInMenuBar: "show",
      bluetoothInMenuBar: "show",
      focusInMenuBar: "show",
      soundInMenuBar: "show",
      batteryInMenuBar: true,
      batteryInCtrlCenter: true,
      showBatteryPercentage: true,
      spotlightInMenuBar: "show",
      siriInMenuBar: "show",
      weatherInMenuBar: "show",
      spotlightOptions: {
        "Applications": true,
        "Calculator": true,
        "Conversion": true,
        "Definition": true,
        "Folders": true,
        "Images": true,
        "Movies": true,
        "Music": true,
        "Siri Suggestions": true,
        "System Settings": true,
        "Websites": true
      },

      hydrated: false, // Hydration state

      setDockMagnification: (magnification) => set({ dockMagnification: magnification }),
      setDockSize: (size) => set({ dockSize: size }),
      toggleLock: () => set((state) => ({ isLocked: !state.isLocked })),
      toggleRestart: () => set((state) => ({ restart: !state.restart })),
      setWallpaper: (wallpaper) => set({ wallpaper }),
      toggleWifi: () => set((state) => ({ wifi: !state.wifi })),
      setConnectedWifi: (connected) => set({ connectedWifi: connected }),
      toggleBluetooth: () => set((state) => ({ bluetooth: !state.bluetooth })),
      setConnectedBluetooth: (connected) => set({ connectedBluetooth: connected }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      toggleAutoDock: () => set((state) => ({ autoDock: !state.autoDock })),
      toggleOpenedAppsDots: () => set((state) => ({ openedAppsDots: !state.openedAppsDots })),
      toggleShowOpenedApps: () => set((state) => ({ showOpenedApps: !state.showOpenedApps })),
      setTitleBarAction: (action) => set({ titleBarAction: action }),
      setDockPosition: (position) => set({ dockPosition: position }),
      setWifiInMenuBar: (position) => set({ wifiInMenuBar: position }),
      setBluetoothInMenuBar: (position) => set({ bluetoothInMenuBar: position }),
      setFocusInMenuBar: (position) => set({ focusInMenuBar: position }),
      setSoundInMenuBar: (position) => set({ soundInMenuBar: position }),
      toggleBatteryInMenuBar: () => set((state) => ({ batteryInMenuBar: !state.batteryInMenuBar })),
      toggleBatteryInCtrlCenter: () => set((state) => ({ batteryInCtrlCenter: !state.batteryInCtrlCenter })),
      toggleShowBatteryPercentage: () => set((state) => ({ showBatteryPercentage: !state.showBatteryPercentage })),
      setSpotlightInMenuBar: (position) => set({ spotlightInMenuBar: position }),
      setSiriInMenuBar: (position) => set({ siriInMenuBar: position }),
      setWeatherInMenuBar: (position) => set({ weatherInMenuBar: position }),
      setSpotlightOptions: (options) => set({ spotlightOptions: options }),
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