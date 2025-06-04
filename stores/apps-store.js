import { apps } from '@/utils/data';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAppsStore = create(
  persist(
    (set) => ({
        apps: apps,

        addApp: (app) => set((state) => ({ apps: [...state.apps, app] })),
        setApps: (apps) => set({ apps }),
    }),
    {
      name: 'apps-storage', // Unique name for localStorage key
      getStorage: () => localStorage, // Use localStorage as the storage
    }
  )
);

export default useAppsStore;