import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useNotificationsStore = create(
  persist(
    (set) => ({
        notifications: [],
        
        addNotification: (notification) => set((state) => ({ notifications: [...state.notifications, notification] })),
        removeNotification: (notification) => set((state) => ({ notifications: state.notifications.filter((n) => n !== notification) })),
        setNotifications: (notifications) => set({ notifications }),
    }),
    {
      name: 'notifications-storage', // Unique name for localStorage key
      getStorage: () => localStorage, // Use localStorage as the storage
    }
  )
);

export default useNotificationsStore;