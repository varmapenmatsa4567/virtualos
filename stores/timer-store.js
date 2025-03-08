import { create } from 'zustand';

const useTimerStore = create((set) => ({
    balanceTime: 0,
    isTimer: false,

    setBalanceTime: (balanceTime) => set({ balanceTime }),
    setIsTimer: (isTimer) => set({ isTimer }),
}));

export default useTimerStore;