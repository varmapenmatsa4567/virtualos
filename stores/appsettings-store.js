import { create } from 'zustand';

const useAppSettingsStore = create((set) => ({
    selectedSettings: 0,
    
    setSelectedSettings: (selectedSettings) => set({ selectedSettings }),
    }
));

export default useAppSettingsStore;