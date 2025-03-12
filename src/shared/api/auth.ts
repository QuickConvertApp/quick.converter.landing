'use client';

import { apiClient } from './client';

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  deviceName?: string;
  deviceId?: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    isVerified: boolean;
    verifiedAt?: string | null;
    createdAt: string;
    updatedAt: string;
    lastLoginAt?: string | null;
  };
  device: {
    id: string;
    userId: string;
    deviceName: string;
    deviceType: string;
    deviceId?: string | null;
    ipAddress?: string | null;
    userAgent?: string | null;
    lastActiveAt: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
  };
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export const authApi = {
  register: async (data: RegisterRequest): Promise<TokenResponse> => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },
  
  login: async (data: LoginRequest): Promise<TokenResponse> => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },
  
  refreshToken: async (data: RefreshTokenRequest): Promise<TokenResponse> => {
    const response = await apiClient.post('/auth/refresh-token', data);
    return response.data;
  },
  
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  logoutAll: async () => {
    const response = await apiClient.post('/auth/logout-all');
    return response.data;
  },

  me: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
}; 