import axios from "axios";
import { base_url } from "./apiPath";

export const axiosInstance = axios.create({
    baseURL: base_url,
    timeout: 80000,
    headers: {
        "Content-Type": "application/json",
    }
})

//Request Interceptors
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config;
    }, (error) => {
        return Promise.reject(error)
    })

//Response Interceptors
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    }, (error) => {
        return Promise.reject(error);
    })
