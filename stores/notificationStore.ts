import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NotificationState {
  enabled: boolean;
  time: Date;
  setEnabled: (enabled: boolean) => void;
  setTime: (time: Date) => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      enabled: false,
      time: new Date(new Date().setHours(18, 0, 0, 0)),
      setEnabled: (enabled) => set({ enabled }),
      setTime: (time) => set({ time }),
    }),
    {
      name: 'notification-settings',
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
      onRehydrateStorage: (state) => (storedState: any) => {
        if (storedState?.time) {
          state?.setTime(new Date(storedState.time));
        }
      },
    }
  )
);
