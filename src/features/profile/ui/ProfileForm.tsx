'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserProfile, CreateProfileRequest, UpdateProfileRequest } from '@/shared/api/profile';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

interface ProfileFormProps {
  initialData?: Partial<UserProfile>;
  onSubmit: (data: CreateProfileRequest | UpdateProfileRequest) => Promise<void>;
  isLoading: boolean;
  mode: 'create' | 'update';
}

export const ProfileForm = ({ initialData, onSubmit, isLoading, mode }: ProfileFormProps) => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<string>('basic');
  const [formData, setFormData] = useState<CreateProfileRequest>({
    avatarUrl: initialData?.avatarUrl || '',
    bio: initialData?.bio || '',
    phoneNumber: initialData?.phoneNumber || '',
    dateOfBirth: initialData?.dateOfBirth ? new Date(initialData.dateOfBirth).toISOString().split('T')[0] : '',
    address: initialData?.address || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    country: initialData?.country || '',
    postalCode: initialData?.postalCode || '',
    company: initialData?.company || '',
    jobTitle: initialData?.jobTitle || '',
    website: initialData?.website || '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        avatarUrl: initialData.avatarUrl || '',
        bio: initialData.bio || '',
        phoneNumber: initialData.phoneNumber || '',
        dateOfBirth: initialData.dateOfBirth ? new Date(initialData.dateOfBirth).toISOString().split('T')[0] : '',
        address: initialData.address || '',
        city: initialData.city || '',
        state: initialData.state || '',
        country: initialData.country || '',
        postalCode: initialData.postalCode || '',
        company: initialData.company || '',
        jobTitle: initialData.jobTitle || '',
        website: initialData.website || '',
        socialLinks: initialData.socialLinks || {},
        preferences: initialData.preferences || {},
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      toast({
        title: mode === 'create' ? 'Profile created' : 'Profile updated',
        description: mode === 'create' 
          ? 'Your profile has been created successfully.' 
          : 'Your profile has been updated successfully.',
        variant: 'default',
      });
    } catch (error) {
      console.error('Error submitting profile:', error);
      toast({
        title: 'Error',
        description: 'There was an error saving your profile. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const getCompletionPercentage = () => {
    const fields = [
      formData.avatarUrl,
      formData.bio,
      formData.phoneNumber,
      formData.dateOfBirth,
      formData.address,
      formData.city,
      formData.state,
      formData.country,
      formData.postalCode,
      formData.company,
      formData.jobTitle,
      formData.website
    ];
    
    const filledFields = fields.filter(field => field && field.trim() !== '').length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const completionPercentage = getCompletionPercentage();

  return (
    <Card className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
      <CardHeader className="relative pb-0 border-b border-gray-100">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100">
          <motion.div 
            className="h-full bg-black"
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="flex justify-between items-center pt-4">
          <div>
            <CardTitle className="text-gray-900 text-xl font-medium">
              {mode === 'create' ? 'Create Profile' : 'Profile Information'}
            </CardTitle>
            <CardDescription className="text-gray-500 mt-1">
              {mode === 'create' 
                ? 'Create your personal profile.' 
                : 'Update your personal information.'}
            </CardDescription>
          </div>
          <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
            <span className="text-gray-900 font-medium">{completionPercentage}%</span> complete
          </div>
        </div>
        
        <div className="flex mt-6">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              activeSection === 'basic' 
                ? 'text-black' 
                : 'text-gray-500 hover:text-gray-800'
            }`}
            onClick={() => setActiveSection('basic')}
          >
            Basic Info
            {activeSection === 'basic' && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                layoutId="activeTab"
              />
            )}
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              activeSection === 'contact' 
                ? 'text-black' 
                : 'text-gray-500 hover:text-gray-800'
            }`}
            onClick={() => setActiveSection('contact')}
          >
            Contact Details
            {activeSection === 'contact' && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                layoutId="activeTab"
              />
            )}
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              activeSection === 'work' 
                ? 'text-black' 
                : 'text-gray-500 hover:text-gray-800'
            }`}
            onClick={() => setActiveSection('work')}
          >
            Work
            {activeSection === 'work' && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                layoutId="activeTab"
              />
            )}
          </button>
        </div>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6 bg-white">
          {activeSection === 'basic' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-4">
                <div className="relative w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                  {formData.avatarUrl ? (
                    <img 
                      src={formData.avatarUrl} 
                      alt="Profile avatar" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/80?text=Avatar';
                      }}
                    />
                  ) : (
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <Label htmlFor="avatarUrl" className="text-gray-700 mb-1 block text-sm font-medium">Profile Picture URL</Label>
                  <Input 
                    id="avatarUrl"
                    name="avatarUrl"
                    value={formData.avatarUrl || ''}
                    onChange={handleChange}
                    className="bg-white border-gray-300 text-gray-900 focus:ring-1 focus:ring-black focus:border-black"
                    placeholder="https://example.com/avatar.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter a URL for your profile picture</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-gray-700 text-sm font-medium">Bio</Label>
                <textarea 
                  id="bio"
                  name="bio"
                  value={formData.bio || ''}
                  onChange={handleChange}
                  rows={4} 
                  className="w-full rounded-md bg-white border-gray-300 text-gray-900 p-2 focus:ring-1 focus:ring-black focus:border-black transition-all"
                  placeholder="Tell us about yourself"
                />
                <p className="text-xs text-gray-500 flex justify-between">
                  <span>{formData.bio ? `${formData.bio.length} characters` : 'Add a short bio to tell others about yourself'}</span>
                  <span className="text-gray-400">{formData.bio?.length || 0}/500</span>
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="text-gray-700 text-sm font-medium">Date of Birth</Label>
                  <Input 
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth || ''}
                    onChange={handleChange}
                    className="bg-white border-gray-300 text-gray-900 focus:ring-1 focus:ring-black focus:border-black transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-gray-700 text-sm font-medium">Website</Label>
                  <Input 
                    id="website"
                    name="website"
                    value={formData.website || ''}
                    onChange={handleChange}
                    className="bg-white border-gray-300 text-gray-900 focus:ring-1 focus:ring-black focus:border-black transition-all"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </motion.div>
          )}
          
          {activeSection === 'contact' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-gray-700 text-sm font-medium">Phone Number</Label>
                <Input 
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber || ''}
                  onChange={handleChange}
                  className="bg-white border-gray-300 text-gray-900 focus:ring-1 focus:ring-black focus:border-black transition-all"
                  placeholder="+1 (123) 456-7890"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address" className="text-gray-700 text-sm font-medium">Address</Label>
                <Input 
                  id="address"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleChange}
                  className="bg-white border-gray-300 text-gray-900 focus:ring-1 focus:ring-black focus:border-black transition-all"
                  placeholder="123 Main St"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-gray-700 text-sm font-medium">City</Label>
                  <Input 
                    id="city"
                    name="city"
                    value={formData.city || ''}
                    onChange={handleChange}
                    className="bg-white border-gray-300 text-gray-900 focus:ring-1 focus:ring-black focus:border-black transition-all"
                    placeholder="New York"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-gray-700 text-sm font-medium">State/Province</Label>
                  <Input 
                    id="state"
                    name="state"
                    value={formData.state || ''}
                    onChange={handleChange}
                    className="bg-white border-gray-300 text-gray-900 focus:ring-1 focus:ring-black focus:border-black transition-all"
                    placeholder="NY"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postalCode" className="text-gray-700 text-sm font-medium">Postal Code</Label>
                  <Input 
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode || ''}
                    onChange={handleChange}
                    className="bg-white border-gray-300 text-gray-900 focus:ring-1 focus:ring-black focus:border-black transition-all"
                    placeholder="10001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-gray-700 text-sm font-medium">Country</Label>
                  <Input 
                    id="country"
                    name="country"
                    value={formData.country || ''}
                    onChange={handleChange}
                    className="bg-white border-gray-300 text-gray-900 focus:ring-1 focus:ring-black focus:border-black transition-all"
                    placeholder="United States"
                  />
                </div>
              </div>
            </motion.div>
          )}
          
          {activeSection === 'work' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="company" className="text-gray-700 text-sm font-medium">Company</Label>
                <Input 
                  id="company"
                  name="company"
                  value={formData.company || ''}
                  onChange={handleChange}
                  className="bg-white border-gray-300 text-gray-900 focus:ring-1 focus:ring-black focus:border-black transition-all"
                  placeholder="Acme Inc."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-gray-700 text-sm font-medium">Job Title</Label>
                <Input 
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle || ''}
                  onChange={handleChange}
                  className="bg-white border-gray-300 text-gray-900 focus:ring-1 focus:ring-black focus:border-black transition-all"
                  placeholder="Software Engineer"
                />
              </div>
            </motion.div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between border-t border-gray-100 pt-5 bg-gray-50">
          <div className="flex space-x-2">
            {activeSection !== 'basic' && (
              <Button 
                type="button" 
                variant="outline" 
                className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => {
                  if (activeSection === 'contact') setActiveSection('basic');
                  if (activeSection === 'work') setActiveSection('contact');
                }}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Previous
              </Button>
            )}
            
            {activeSection !== 'work' && (
              <Button 
                type="button" 
                className="bg-gray-900 text-white hover:bg-black"
                onClick={() => {
                  if (activeSection === 'basic') setActiveSection('contact');
                  if (activeSection === 'contact') setActiveSection('work');
                }}
              >
                Next
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Button>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setFormData({
                avatarUrl: initialData?.avatarUrl || '',
                bio: initialData?.bio || '',
                phoneNumber: initialData?.phoneNumber || '',
                dateOfBirth: initialData?.dateOfBirth ? new Date(initialData.dateOfBirth).toISOString().split('T')[0] : '',
                address: initialData?.address || '',
                city: initialData?.city || '',
                state: initialData?.state || '',
                country: initialData?.country || '',
                postalCode: initialData?.postalCode || '',
                company: initialData?.company || '',
                jobTitle: initialData?.jobTitle || '',
                website: initialData?.website || '',
              })}
            >
              Reset
            </Button>
            <Button 
              type="submit"
              disabled={isLoading}
              className="bg-black text-white hover:bg-gray-800 transition-all"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                mode === 'create' ? 'Create Profile' : 'Save Changes'
              )}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}; 