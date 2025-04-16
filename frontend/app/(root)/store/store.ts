import axios from 'axios';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

interface storageState {
  user: string | null;
  token: string | null;
  actionLogin: (form: { email: string; password: string }) => Promise<void>;
  actionLogout: () => void;
}


const API_URL = Constants.expoConfig?.extra?.API_URL;

const useStore = create<storageState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      categories: [],

      actionLogin: async (form) => {
        try {
          const res = await axios.post(`${API_URL}/login`, form);
          set({ user: res.data.payload, token: res.data.token });
        } catch (error) {
          console.error(error);
        }
      },
      actionLogout: () => {
        set({ user: null, token: null});
      },
    }),
    {
      name: 'storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useStore;
