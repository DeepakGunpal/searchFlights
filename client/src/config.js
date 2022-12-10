import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://searchflightsdg.herokuapp.com/api/'
})