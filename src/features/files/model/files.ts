import { useState, useCallback, useEffect } from 'react';
import { filesApi } from '@/shared/api/files';
import { FileEntity } from '@/shared/api/converter';

// Search and filter types
export type FileSort = 'name' | 'date' | 'size' | 'type';
export type SortDirection = 'asc' | 'desc';

export interface FileFilter {
  query: string;
  type?: string;
  sortBy: FileSort;
  sortDirection: SortDirection;
}

// Files state interface
export interface FilesState {
  files: FileEntity[];
  isLoading: boolean;
  error: string | null;
  filter: FileFilter;
  selectedFileIds: string[];
}

// Initial state
const initialState: FilesState = {
  files: [],
  isLoading: false,
  error: null,
  filter: {
    query: '',
    sortBy: 'date',
    sortDirection: 'desc'
  },
  selectedFileIds: []
};

// Custom hook for files management
export const useFiles = () => {
  const [state, setState] = useState<FilesState>(initialState);
  
  // Load user files
  const loadFiles = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const files = await filesApi.getUserFiles();
      setState(prev => ({ ...prev, files, isLoading: false }));
    } catch (error) {
      console.error('Error loading files:', error);
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to load files'
      }));
    }
  }, []);
  
  // Load files on mount
  useEffect(() => {
    loadFiles();
  }, [loadFiles]);
  
  // Update filter
  const updateFilter = useCallback((filter: Partial<FileFilter>) => {
    setState(prev => ({
      ...prev,
      filter: { ...prev.filter, ...filter }
    }));
  }, []);
  
  // Select file
  const toggleFileSelection = useCallback((fileId: string) => {
    setState(prev => {
      const isSelected = prev.selectedFileIds.includes(fileId);
      return {
        ...prev,
        selectedFileIds: isSelected
          ? prev.selectedFileIds.filter(id => id !== fileId)
          : [...prev.selectedFileIds, fileId]
      };
    });
  }, []);
  
  // Clear selection
  const clearSelection = useCallback(() => {
    setState(prev => ({ ...prev, selectedFileIds: [] }));
  }, []);
  
  // Select all files
  const selectAllFiles = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedFileIds: prev.files.map(file => file.id)
    }));
  }, []);
  
  // Delete file
  const deleteFile = useCallback(async (fileId: string) => {
    try {
      await filesApi.deleteFile(fileId);
      setState(prev => ({
        ...prev,
        files: prev.files.filter(file => file.id !== fileId),
        selectedFileIds: prev.selectedFileIds.filter(id => id !== fileId)
      }));
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }, []);
  
  // Delete selected files
  const deleteSelectedFiles = useCallback(async () => {
    try {
      await Promise.all(state.selectedFileIds.map(id => filesApi.deleteFile(id)));
      setState(prev => ({
        ...prev,
        files: prev.files.filter(file => !prev.selectedFileIds.includes(file.id)),
        selectedFileIds: []
      }));
    } catch (error) {
      console.error('Error deleting selected files:', error);
      throw error;
    }
  }, [state.selectedFileIds]);
  
  // Download file
  const downloadFile = useCallback((fileId: string) => {
    // Find the file by id
    const file = state.files.find(f => f.id === fileId);
    if (file) {
      // Pass the file name to the download function
      filesApi.downloadFile(fileId, file.name);
    } else {
      console.error('File not found for download:', fileId);
    }
  }, [state.files]);
  
  // Get filtered and sorted files
  const getFilteredFiles = useCallback(() => {
    let filtered = [...state.files];
    
    // Apply search query filter
    if (state.filter.query) {
      const query = state.filter.query.toLowerCase();
      filtered = filtered.filter(
        file => file.name.toLowerCase().includes(query)
      );
    }
    
    // Apply file type filter
    if (state.filter.type) {
      filtered = filtered.filter(
        file => file.mimeType.includes(state.filter.type || '')
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      const direction = state.filter.sortDirection === 'asc' ? 1 : -1;
      
      switch (state.filter.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name) * direction;
        case 'date':
          return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * direction;
        case 'size':
          return (a.size - b.size) * direction;
        case 'type':
          return a.mimeType.localeCompare(b.mimeType) * direction;
        default:
          return 0;
      }
    });
    
    return filtered;
  }, [state.files, state.filter]);
  
  return {
    state,
    loadFiles,
    updateFilter,
    toggleFileSelection,
    clearSelection,
    selectAllFiles,
    deleteFile,
    deleteSelectedFiles,
    downloadFile,
    getFilteredFiles
  };
}; 