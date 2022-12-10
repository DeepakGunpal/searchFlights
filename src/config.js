import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://searchflights.onrender.com/api/'
})