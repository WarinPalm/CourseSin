import axios from "axios";
import Constants from "expo-constants";
const API_URL = Constants.expoConfig?.extra?.API_URL;
import { CourseForm, PayLoadEditCourse } from "../../types/requests/course";

export const getAllCourse = async (token: string) => {
    return await axios.get(`${API_URL}/courses`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}
export const getCourseByCategory = async (categoryId: string, token: string) => {
    return await axios.get(`${API_URL}/courses/${categoryId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}
export const getCourseById = async (id: string, token: string) => {
    return await axios.get(`${API_URL}/course/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}
export const addCourse = async (token: string, form: FormData) => {
    return await axios.post(`${API_URL}/course`, form, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', 
        }
    });
}

export const getAllCoursePagination = async (token: string, page: number, limit: number) => {
    return await axios.get(`${API_URL}/courses/?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}
export const getCatCoursePagination = async (token: string,categoryId:string,page: number, limit: number) => {
    
    return await axios.get(`${API_URL}/courses/${categoryId}?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export const editCourse = async (token: string,id:string,form:PayLoadEditCourse ) => {
    console.log(form)
    return await axios.put(`${API_URL}/course/${id}`, form, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}
export const deleteCourse = async (token: string,id:string) => {
    return await axios.put(`${API_URL}/remove-course/${id}`,{},{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}