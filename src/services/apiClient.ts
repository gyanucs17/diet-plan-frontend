import axios from 'axios';

// Create an Axios instance
const API_URL = process.env.REACT_APP_SERVER_URL
const apiClient = axios.create({
    baseURL: API_URL, 
    timeout: 10000, 
    headers: {
        'Content-Type': 'application/json',
    }
});

apiClient.interceptors.response.use(
    response => response,
    error => {
        console.error('API call failed:', error);
        return Promise.reject(error);
    }
);

export default apiClient;