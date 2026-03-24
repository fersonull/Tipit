import axios from 'axios';
import { getAuth } from '@react-native-firebase/auth';

// 1. Create a baseline Axios instance
const api = axios.create({
  // Replace with your Laravel API URL (use react-native-config for environment variables in production)
  baseURL: 'http://localhost:8000/api', // 10.0.2.2 is the localhost alias for Android Emulators
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// 2. Attach the Interceptor
api.interceptors.request.use(
  async config => {
    const currentUser = getAuth().currentUser;

    if (currentUser) {
      try {
        // Fetch the token. 'true' ensures we don't send an expired token to Laravel.
        const token = await currentUser.getIdToken(true);

        // Mutate the request headers to include the Bearer token
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error('Failed to retrieve Firebase token', error);
        // Depending on your strictness, you might want to force a logout here if token retrieval entirely fails
      }
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default api;
