// lib/axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});


instance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("jwt_token"); // Retrieve token from your preferred storage
        console.log('Retrieving',token)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) =>

        Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh token (if applicable)
                const refreshedToken = sessionStorage.getItem("jwt_token");
                instance.defaults.headers.common['Authorization'] = `Bearer ${refreshedToken}`;

                return instance(originalRequest); // Retry request with new token
            } catch (refreshError) {
                // Handle token refresh failure (e.g., redirect to login)
                console.error('Token refresh failed:', refreshError);
                return Promise.reject(error);
            }
        }

        // Handle other errors
        return Promise.reject(error);
    }
);

export default instance;
