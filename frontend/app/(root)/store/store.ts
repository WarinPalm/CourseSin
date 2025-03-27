import axios from 'axios';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage'; // นำเข้า AsyncStorage
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.API_URL;

const store = (set: any) => ({
    user: null, // สำหรับผู้ใช้
    token: null, // สำหรับเก็บ token ของผู้ใช้
    
    actionLogin: async (form: { email: string, password: string }) => {
        try {
            const res = await axios.post(`${API_URL}/login`, form);
            set({ user: res.data.payload, token: res.data.token });
            return res;
        } catch (error) {
            throw error;
        }
    },

    actionLogout: () => {
        set({ user: null, token: null });
        AsyncStorage.removeItem('store'); // ลบข้อมูลออกจาก AsyncStorage
    }
});

const usePersist = {
    name: 'store',
    Storage: createJSONStorage(() => AsyncStorage),
    onRehydrateStorage: (state: any) => {
        // ตรวจสอบข้อมูลที่ถูกโหลดจาก AsyncStorage
        console.log("Rehydration complete:", state);
    }
};

const useStore = create(persist(store, usePersist));

export default useStore;
