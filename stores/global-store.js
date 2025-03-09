import { create } from 'zustand';

const useGlobalStore = create((set) => ({
    isWindowScreenshot: false,
    isFullScreenshot: false,
    screenshotUrl: null,

    setIsWindowScreenshot: (isWindowScreenshot) => set({ isWindowScreenshot }),
    setIsFullScreenshot: (isFullScreenshot) => set({ isFullScreenshot }),
    closeScreenshot: () => set({ isWindowScreenshot: false, isFullScreenshot: false }),
    setScreenshotUrl: (screenshotUrl) => set({ screenshotUrl }),
}));

export default useGlobalStore;