import axios from 'axios';
import { apiClient } from './client';

// Types for API responses
export interface FileEntity {
  id: string;
  name: string;
  size: number;
  mimeType: string;
  createdAt: string;
  userId: string;
  downloadUrl?: string;
}

export interface JobEntity {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
  userId: string;
  sourceFile: FileEntity;
  targetFile?: FileEntity;
  conversionType: string;
  error?: string;
}

// Converter API service
export const converterApi = {
  // Upload and convert a file
  async uploadFile(file: File, conversionType: string, options?: Record<string, any>): Promise<{ 
    fileId: string;
    downloadUrl?: string;
  }> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (options) {
      // Add any additional options as form data
      Object.entries(options).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }
    
    // Add the conversion type
    formData.append('conversionType', conversionType);
    
    const response = await apiClient.post('/converter/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },
  
  // Get list of user files
  async getUserFiles(): Promise<FileEntity[]> {
    const response = await apiClient.get('/converter/files');
    return response.data;
  },
  
  // Get list of user conversion jobs
  async getUserJobs(): Promise<JobEntity[]> {
    const response = await apiClient.get('/converter/jobs');
    return response.data;
  },
}; 