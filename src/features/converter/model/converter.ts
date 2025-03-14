import { useState, useCallback, useEffect } from 'react';
import { 
  ConversionType, 
  conversionTypes, 
  getConversionTypeById 
} from '@/entities/conversion/model';
import { converterApi, JobEntity } from '@/shared/api/converter';

// Conversion state interface
export interface ConversionState {
  selectedConversion: ConversionType;
  file: File | null;
  isConverting: boolean;
  progress: number;
  convertedFileId: string | null;
  error: string | null;
  advancedOptions: boolean;
  advancedSettings: Record<string, any>;
  recentJobs: JobEntity[];
  isLoadingJobs: boolean;
}

// Initial state for the converter
const initialState: ConversionState = {
  selectedConversion: conversionTypes[0],
  file: null,
  isConverting: false,
  progress: 0,
  convertedFileId: null,
  error: null,
  advancedOptions: false,
  advancedSettings: {
    quality: 8,
    ocr: false,
    compression: 'medium',
    pageSize: 'a4',
    toc: true
  },
  recentJobs: [],
  isLoadingJobs: false
};

// Custom hook for conversion logic
export const useConverter = () => {
  const [state, setState] = useState<ConversionState>(initialState);
  
  // Load recent jobs
  const loadRecentJobs = useCallback(async () => {
    setState(prev => ({ ...prev, isLoadingJobs: true }));
    try {
      const jobs = await converterApi.getUserJobs();
      setState(prev => ({ ...prev, recentJobs: jobs, isLoadingJobs: false }));
    } catch (error) {
      console.error('Error loading recent jobs:', error);
      setState(prev => ({ ...prev, isLoadingJobs: false }));
    }
  }, []);

  // Load jobs on mount
  useEffect(() => {
    loadRecentJobs();
  }, [loadRecentJobs]);
  
  // Set selected conversion
  const setSelectedConversion = useCallback((conversion: ConversionType) => {
    setState(prev => ({ 
      ...prev, 
      selectedConversion: conversion, 
      file: null,
      convertedFileId: null,
      error: null
    }));
  }, []);
  
  // Set file
  const setFile = useCallback((file: File | null) => {
    setState(prev => ({ 
      ...prev, 
      file,
      convertedFileId: null,
      error: null
    }));
  }, []);
  
  // Toggle advanced options
  const toggleAdvancedOptions = useCallback((show: boolean) => {
    setState(prev => ({ ...prev, advancedOptions: show }));
  }, []);
  
  // Set advanced setting
  const setAdvancedSetting = useCallback((setting: string, value: any) => {
    setState(prev => ({
      ...prev,
      advancedSettings: {
        ...prev.advancedSettings,
        [setting]: value
      }
    }));
  }, []);
  
  // Convert file
  const convertFile = useCallback(async () => {
    if (!state.file) return;
    
    setState(prev => ({ 
      ...prev, 
      isConverting: true, 
      progress: 0, 
      convertedFileId: null,
      error: null
    }));
    
    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setState(prev => ({
        ...prev,
        progress: Math.min(prev.progress + Math.floor(Math.random() * 10), 95)
      }));
    }, 300);
    
    try {
      // Get conversion options from advanced settings
      const options: Record<string, any> = {};
      
      // Only include relevant options for the selected conversion type
      if (state.selectedConversion.id === 'pdf-to-word' || state.selectedConversion.id === 'pdf-to-epub') {
        options.ocr = state.advancedSettings.ocr;
      }
      
      if (state.selectedConversion.id === 'pdf-compress') {
        options.compression = state.advancedSettings.compression;
      }
      
      if (state.selectedConversion.id === 'image-to-pdf') {
        options.pageSize = state.advancedSettings.pageSize;
      }
      
      if (state.selectedConversion.id === 'pdf-to-epub') {
        options.toc = state.advancedSettings.toc;
      }
      
      // Always include quality
      options.quality = state.advancedSettings.quality;
      
      // Call API to convert file
      const result = await converterApi.uploadFile(
        state.file, 
        state.selectedConversion.id,
        options
      );
      
      // Update state with result
      clearInterval(progressInterval);
      setState(prev => ({ 
        ...prev, 
        isConverting: false,
        progress: 100,
        convertedFileId: result.fileId
      }));
      
      // Refresh jobs list
      loadRecentJobs();
      
    } catch (error) {
      clearInterval(progressInterval);
      console.error('Conversion error:', error);
      setState(prev => ({
        ...prev,
        isConverting: false,
        progress: 0,
        error: error instanceof Error ? error.message : 'An error occurred during conversion'
      }));
    }
  }, [state.file, state.selectedConversion, state.advancedSettings, loadRecentJobs]);
  
  // Download file
  const downloadFile = useCallback((fileId: string) => {
    converterApi.uploadFile(fileId);
  }, []);
  
  // Reset state
  const reset = useCallback(() => {
    setState(prev => ({
      ...prev,
      file: null,
      isConverting: false,
      progress: 0,
      convertedFileId: null,
      error: null
    }));
  }, []);
  
  return {
    state,
    setSelectedConversion,
    setFile,
    toggleAdvancedOptions,
    setAdvancedSetting,
    convertFile,
    downloadFile,
    reset,
    loadRecentJobs
  };
}; 