import axios from "axios";
import Constants from "expo-constants";
const API_URL = Constants.expoConfig?.extra?.API_URL;

export const getAllCategory = async () => {
    return await axios.get(`${API_URL}/category`);
}