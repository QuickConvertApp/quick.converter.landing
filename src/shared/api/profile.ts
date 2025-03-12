'use client';

import { apiClient } from './client';

export interface UserProfile {
  userId: string;
  avatarUrl?: string | null;
  bio?: string | null;
  phoneNumber?: string | null;
  dateOfBirth?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  postalCode?: string | null;
  company?: string | null;
  jobTitle?: string | null;
  website?: string | null;
  socialLinks?: Record<string, string> | null;
  preferences?: Record<string, any> | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProfileRequest {
  avatarUrl?: string;
  bio?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  company?: string;
  jobTitle?: string;
  website?: string;
  socialLinks?: Record<string, string>;
  preferences?: Record<string, any>;
}

export interface UpdateProfileRequest extends CreateProfileRequest {}

export const profileApi = {
  getProfile: async (): Promise<UserProfile> => {
    const response = await apiClient.get('/users/me/profile');
    return response.data;
  },
  
  createProfile: async (data: CreateProfileRequest): Promise<UserProfile> => {
    const response = await apiClient.post('/users/me/profile', data);
    return response.data;
  },
  
  updateProfile: async (data: UpdateProfileRequest): Promise<UserProfile> => {
    const response = await apiClient.patch('/users/me/profile', data);
    return response.data;
  },
  
  deleteProfile: async (): Promise<void> => {
    await apiClient.delete('/users/me/profile');
  }
}; 