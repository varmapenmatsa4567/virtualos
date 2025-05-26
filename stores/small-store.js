import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSmallStore = create(
  persist(
    (set) => ({
        game2048BestScore: 0, // Best score for the 2048 game
        setGame2048BestScore: (score) => set({ game2048BestScore: score }), // Set the best score for the 2048 game
    }),
    {
      name: 'small-storage', // Unique name for localStorage key
      getStorage: () => localStorage, // Use localStorage as the storage
    }
  )
);

export default useSmallStore;