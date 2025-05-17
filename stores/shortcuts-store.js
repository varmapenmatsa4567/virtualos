import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWindowsStore = create(
  persist(
    (set) => ({
        shortcuts: [], // Array to hold opened windows
        activeShortcut: null, // Currently active window

        setShortcuts: (shortcuts) => set({ shortcuts }), // Set the windows array
        addShortcut: (shortcut) => set((state) => ({ shortcuts: [...state.shortcuts, shortcut] })),
        removeShortcut: (id) => set((state) => ({
          shortcuts: state.shortcuts.filter(shortcut => shortcut.id !== id)
        }))
    }),
    {
      name: 'shortcuts-storage', // Unique name for localStorage key
      getStorage: () => localStorage, // Use localStorage as the storage
    }
  )
);

export default useWindowsStore;