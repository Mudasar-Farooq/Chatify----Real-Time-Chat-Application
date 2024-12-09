// works as the base for fetch method in our frontend
import axios from "axios"

export const axiosInstance = axios.create(
    {
        baseURL : 'http://localhost:3000/api',
        withCredentials: true
    }
)