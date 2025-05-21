import { getDefaultFinderItems } from '@/utils/fs-utils';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFinderStore = create(
  persist(
    (set) => ({
      finderItems: getDefaultFinderItems(), // List of finder items
      favourites: [], // List of favourite items
      currentFinderItem: null, // Currently selected finder item

      hydrated: false, // Hydration state

      setFinderItems: (finderItems) => set({ finderItems }), // Set finder items
      setFavourites: (favourites) => set({ favourites }), // Set favourites
      setCurrentFinderItem: (currentFinderItem) => set({ currentFinderItem }), // Set current finder item
    }),
    {
      name: 'finder-storage', // Unique name for localStorage key
      getStorage: () => localStorage, // Use localStorage as the storage
      onRehydrateStorage: () => (state) => {
        // Called after rehydration
        state.hydrated = true;
      }
    }
  )
);

export default useFinderStore;