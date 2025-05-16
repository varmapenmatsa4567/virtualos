import { create } from 'zustand';

const useGlobalStore = create((set) => ({
    isWindowScreenshot: false,
    isFullScreenshot: false,
    screenshotUrl: null,
    showScreenshot: false,
    dbChange: 0,
    spotlightVisible: false,

    setShowScreenshot: (showScreenshot) => set({ showScreenshot }),
    setIsWindowScreenshot: (isWindowScreenshot) => set({ isWindowScreenshot }),
    setIsFullScreenshot: (isFullScreenshot) => set({ isFullScreenshot }),
    closeScreenshot: () => set({ isWindowScreenshot: false, isFullScreenshot: false }),
    setScreenshotUrl: (screenshotUrl) => set({ screenshotUrl }),
    setDbChange: (dbChange) => set({ dbChange }),
    toggleSpotlightVisible: () => set((state) => ({ spotlightVisible: !state.spotlightVisible })),
    setSplotlightVisible: (spotlightVisible) => set({ spotlightVisible }),
}));

export default useGlobalStore;