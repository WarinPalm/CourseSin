import axios from "axios";
import Constants from "expo-constants";
const API_URL = Constants.expoConfig?.extra?.API_URL;

export const getProfile = async (token: string) => {
    return await axios.get(`${API_URL}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}
export const viewMyCourse = async (token: string, page: number, limit: number) => {
    return await axios.get(`${API_URL}/my-channel?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}
export const watchChannelProfile = async (token: string, channelId: string) => {
    return await axios.get(`${API_URL}/watch-channel/${channelId}?`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}
export const watchChannelCourse = async (token: string, channelId: string, page: number, limit: number) => {
    return await axios.get(`${API_URL}/watch-channel/${channelId}?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}
export const editProfile = async (token: string, form: FormData) => {
    return await axios.put(`${API_URL}/profile`, form, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', 
        }
    });
}


