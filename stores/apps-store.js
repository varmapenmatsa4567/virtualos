import { create } from 'zustand';

const useAppsStore = create((set) => ({
    selectedSettings: 0,
    setSelectedSettings: (selectedSettings) => set({ selectedSettings }),
}));

export default useAppsStore;