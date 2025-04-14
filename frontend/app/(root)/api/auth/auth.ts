import axios from "axios";
import Constants from "expo-constants";
const API_URL = Constants.expoConfig?.extra?.API_URL;

export const currentUser = async (token:string) => {
    return await axios.post(`${API_URL}/current-user`,{},{
        headers:{
            Authorization: `Bearer ${token}`,
        }
    });
}