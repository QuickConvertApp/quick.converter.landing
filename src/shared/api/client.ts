'use client';

import axios from 'axios';
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from '../lib/auth';

// Create an axios instance
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is not 401 or the request has already been retried, reject
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }
    
    originalRequest._retry = true;
    
    try {
      const refreshToken = getRefreshToken();
      
      if (!refreshToken) {
        clearTokens();
        return Promise.reject(error);
      }
      
      // Attempt to refresh the token
      const response = await axios.post(
        `${apiClient.defaults.baseURL}/auth/refresh`,
        { refreshToken }
      );
      
      const { accessToken, refreshToken: newRefreshToken } = response.data;
      
      // Update the tokens
      setTokens(accessToken, newRefreshToken);
      
      // Update the original request with the new token
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      
      // Retry the original request
      return apiClient(originalRequest);
    } catch (refreshError) {
      // If token refresh fails, clear tokens and reject
      clearTokens();
      return Promise.reject(refreshError);
    }
  }
); 