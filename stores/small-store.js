import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSmallStore = create(
  persist(
    (set) => ({
        game2048BestScore: 0, // Best score for the 2048 game
        recentTimers: [],
        selectedClock: "World Clock",
        alarms: [],
        clocks: [],

        setClocks: (clocks) => set({ clocks }),
        addClock: (clock) => set((state) => ({ clocks: [...state.clocks, clock] })),
        removeClock: (offset) => set((state) => ({
          clocks: state.clocks.filter(clock => clock.offset !== offset)
        })),
        setAlarms: (alarms) => set({ alarms }),
        addAlarm: (alarm) => set((state) => ({ alarms: [...state.alarms, alarm] })),
        setSelectedClock: (clock) => set({ selectedClock: clock }), // Set the selected clock
        setGame2048BestScore: (score) => set({ game2048BestScore: score }), // Set the best score for the 2048 game
        setRecentTimers: (timers) => set({ recentTimers: timers }),
        addRecentTimer: (timer) => set((state) => ({ recentTimers: [...state.recentTimers, timer] })),
    }),
    {
      name: 'small-storage', // Unique name for localStorage key
      getStorage: () => localStorage, // Use localStorage as the storage
    }
  )
);

export default useSmallStore;