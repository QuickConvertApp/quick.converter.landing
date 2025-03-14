import { apiClient } from './client';
import { FileEntity } from './converter';

// Files API service
export const filesApi = {
  // Get list of user files
  async getUserFiles(): Promise<FileEntity[]> {
    const response = await apiClient.get('/converter/files');
    return response.data;
  },
  
  // Get file details
  async getFileDetails(fileId: string): Promise<FileEntity> {
    const response = await apiClient.get(`/converter/files/${fileId}`);
    return response.data;
  },
  
  // Download a file
  async getDownloadUrl(fileId: string) {
    const response = await apiClient.get(`/converter/download/${fileId}`);
    return response.data;
  },
  
  // Delete a file
  async deleteFile(fileId: string): Promise<void> {
    await apiClient.delete(`/converter/files/${fileId}`);
  },
  
  // Download a file (triggers browser download)
  downloadFile(fileId: string): void {
    // Use the window.location to trigger browser download
    // Include the file name in the URL as a query parameter
    const baseUrl = window.location.origin;
    window.location.href = `${baseUrl}/api/converter/download/${fileId}`;
  }
}; 