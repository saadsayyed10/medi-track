import { create } from "zustand";

interface ScanState {
  uploadImage: string | null;
  setUploadImage: (uploadImage: string) => void;

  reset: () => void;
}

export const useScan = create<ScanState>((set) => ({
  uploadImage: "",

  setUploadImage: (uploadImage) => {
    set({ uploadImage });
  },

  reset: () => {
    set({ uploadImage: null });
  },
}));
