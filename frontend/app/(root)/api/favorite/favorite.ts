import axios from "axios";
import Constants from "expo-constants";
const API_URL = Constants.expoConfig?.extra?.API_URL;

export const listFavorite = async (token: string) => {
    return await axios.get(`${API_URL}/favorites?`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}
export const listFavoritePagination = async (token: string, page: number, limit:number) => {
    return await axios.get(`${API_URL}/favorites?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}
export const likeCourse = async (token: string, form:{course_id:string}) => {
    return await axios.post(`${API_URL}/favorite`, form, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}
export const unlikeCourse = async (token: string, id:string) => {
    return await axios.delete(`${API_URL}/favorite/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}