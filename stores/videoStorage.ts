import { create } from 'zustand';

interface VideoStore {
  selectedVideo: any;
  setSelectedVideo: (video: any) => void;
}

export const useVideoStore = create<VideoStore>((set) => ({
  selectedVideo: null,
  setSelectedVideo: (video) => set({ selectedVideo: video }),
}));