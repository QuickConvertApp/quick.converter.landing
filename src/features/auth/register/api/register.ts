'use client';

import { authApi, RegisterRequest } from '@/shared/api/auth';
import { RegisterFormValues } from '../model/schema';

export const registerUser = async (data: RegisterFormValues) => {
  const { confirmPassword, ...registerData } = data;
  
  try {
    const response = await authApi.register(registerData as RegisterRequest);
    return { success: true, data: response };
  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Handle API error responses
    if (error.response?.data?.message) {
      return { 
        success: false, 
        error: error.response.data.message 
      };
    }
    
    // Handle network errors
    return { 
      success: false, 
      error: 'An error occurred during registration. Please try again.' 
    };
  }
}; 