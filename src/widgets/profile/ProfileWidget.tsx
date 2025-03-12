'use client';

import { useState, useEffect } from 'react';
import { ProfileForm } from '@/features/profile/ui/ProfileForm';
import { profileApi, UserProfile, CreateProfileRequest, UpdateProfileRequest } from '@/shared/api/profile';
import { motion, AnimatePresence } from 'framer-motion';

export const ProfileWidget = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'create' | 'update'>('update');

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const profileData = await profileApi.getProfile();
        setProfile(profileData);
        setMode('update');
      } catch (err: any) {
        console.error('Error fetching profile:', err);
        if (err.response?.status === 404) {
          // Profile doesn't exist yet
          setMode('create');
        } else {
          setError('Failed to load profile. Please try again later.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleCreateProfile = async (data: CreateProfileRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const newProfile = await profileApi.createProfile(data);
      setProfile(newProfile);
      setMode('update');
    } catch (err) {
      console.error('Error creating profile:', err);
      setError('Failed to create profile. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (data: UpdateProfileRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedProfile = await profileApi.updateProfile(data);
      setProfile(updatedProfile);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: CreateProfileRequest | UpdateProfileRequest) => {
    if (mode === 'create') {
      await handleCreateProfile(data);
    } else {
      await handleUpdateProfile(data);
    }
  };

  if (isLoading && !profile) {
    return (
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-100 border-t-black rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-500">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 text-gray-900"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-red-50 rounded-full p-1">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">Error</h3>
                <p className="text-sm text-gray-500 mt-1">{error}</p>
              </div>
              <button 
                className="ml-auto text-gray-400 hover:text-gray-500 transition-colors"
                onClick={() => setError(null)}
                aria-label="Dismiss"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ProfileForm
          initialData={profile || undefined}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          mode={mode}
        />
      </motion.div>
    </div>
  );
}; 