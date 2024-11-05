import axios from "axios";

const baseURL = 'http://127.0.0.1:3000';

const api = axios.create({
    baseURL,
    withCredentials: true,
    validateStatus: (status) => status >= 200 && status < 500,
});

export default api;