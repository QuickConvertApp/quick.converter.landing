'use client';

import { authApi, LoginRequest } from '@/shared/api/auth';
import { SigninFormValues } from '../model/schema';
import { handleLoginSuccess } from '@/shared/lib/auth';

export const signinUser = async (data: SigninFormValues) => {
  try {
    const loginData: LoginRequest = {
      email: data.email,
      password: data.password,
      deviceName: navigator.userAgent || 'Unknown Device',
    };
    
    const response = await authApi.login(loginData);
    
    // Handle successful login
    handleLoginSuccess(response);
    
    return { success: true, data: response };
  } catch (error: any) {
    console.error('Login error:', error);
    
    // Handle API error responses
    if (error.response?.data?.message) {
      return { 
        success: false, 
        error: error.response.data.message 
      };
    }
    
    return { 
      success: false, 
      error: 'An error occurred during sign in. Please try again.' 
    };
  }
}; 