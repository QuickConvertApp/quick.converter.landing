'use client';

import { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import ClientOnly from '@/components/ClientOnly';
import { getUser } from '@/shared/lib/auth';
import { ProfileWidget } from '@/widgets/profile/ProfileWidget';
import { ToastProvider } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const SettingsPage: NextPage = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = getUser();
    setUser(userData);
  }, []);

  return (
    <>
      <Head>
        <title>Settings | Quick Convert</title>
        <meta name="description" content="Account settings" />
      </Head>

      <ClientOnly>
        <ToastProvider>
          <DashboardLayout>
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-black">Settings</h2>
                <p className="text-gray-500 mt-1">
                  Manage your account settings and preferences.
                </p>
              </div>

              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="bg-white border border-gray-200 rounded-lg">
                  <TabsTrigger 
                    value="profile" 
                    className="data-[state=active]:bg-gray-50 data-[state=active]:text-black text-gray-500"
                  >
                    Profile
                  </TabsTrigger>
                  <TabsTrigger 
                    value="account" 
                    className="data-[state=active]:bg-gray-50 data-[state=active]:text-black text-gray-500"
                  >
                    Account
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications" 
                    className="data-[state=active]:bg-gray-50 data-[state=active]:text-black text-gray-500"
                  >
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger 
                    value="billing" 
                    className="data-[state=active]:bg-gray-50 data-[state=active]:text-black text-gray-500"
                  >
                    Billing
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="mt-6">
                  <ProfileWidget />
                </TabsContent>
                
                <TabsContent value="account" className="mt-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
                      <CardHeader className="border-b border-gray-100">
                        <CardTitle className="text-gray-900 text-xl font-medium">Account Settings</CardTitle>
                        <CardDescription className="text-gray-500">
                          Update your account preferences.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                              <p className="text-xs text-gray-500">Add an extra layer of security to your account.</p>
                            </div>
                            <Switch />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Password Protection</p>
                              <p className="text-xs text-gray-500">Require password for sensitive actions.</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">API Access</p>
                              <p className="text-xs text-gray-500">Allow API access to your account.</p>
                            </div>
                            <Switch />
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-100">
                          <p className="text-sm font-medium text-gray-900 mb-3">Change Password</p>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="currentPassword" className="text-gray-700 text-sm font-medium">Current Password</Label>
                              <Input 
                                id="currentPassword" 
                                type="password" 
                                className="bg-white border-gray-300 text-gray-900 focus:ring-1 focus:ring-black focus:border-black transition-all"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="newPassword" className="text-gray-700 text-sm font-medium">New Password</Label>
                              <Input 
                                id="newPassword" 
                                type="password" 
                                className="bg-white border-gray-300 text-gray-900 focus:ring-1 focus:ring-black focus:border-black transition-all"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="confirmPassword" className="text-gray-700 text-sm font-medium">Confirm Password</Label>
                              <Input 
                                id="confirmPassword" 
                                type="password" 
                                className="bg-white border-gray-300 text-gray-900 focus:ring-1 focus:ring-black focus:border-black transition-all"
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end space-x-2 border-t border-gray-100 pt-5 bg-gray-50">
                        <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                          Cancel
                        </Button>
                        <Button className="bg-black text-white hover:bg-gray-800 transition-all">
                          Save Changes
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="notifications" className="mt-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
                      <CardHeader className="border-b border-gray-100">
                        <CardTitle className="text-gray-900 text-xl font-medium">Notification Preferences</CardTitle>
                        <CardDescription className="text-gray-500">
                          Manage how you receive notifications.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                              <p className="text-xs text-gray-500">Receive notifications via email.</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Push Notifications</p>
                              <p className="text-xs text-gray-500">Receive notifications on your device.</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Marketing Emails</p>
                              <p className="text-xs text-gray-500">Receive marketing and promotional emails.</p>
                            </div>
                            <Switch />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end space-x-2 border-t border-gray-100 pt-5 bg-gray-50">
                        <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                          Cancel
                        </Button>
                        <Button className="bg-black text-white hover:bg-gray-800 transition-all">
                          Save Preferences
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="billing" className="mt-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
                      <CardHeader className="border-b border-gray-100">
                        <CardTitle className="text-gray-900 text-xl font-medium">Billing Information</CardTitle>
                        <CardDescription className="text-gray-500">
                          Manage your billing details and subscription.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-6">
                        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Current Plan</p>
                              <p className="text-xl font-bold text-black mt-1">Free Plan</p>
                              <p className="text-xs text-gray-500 mt-1">Basic features with limited usage</p>
                            </div>
                            <Button className="bg-black text-white hover:bg-gray-800 transition-all">
                              Upgrade Plan
                            </Button>
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <p className="text-sm font-medium text-gray-900 mb-3">Payment Method</p>
                          <p className="text-xs text-gray-500">No payment method added yet.</p>
                          <Button variant="outline" className="mt-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            Add Payment Method
                          </Button>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-100">
                          <p className="text-sm font-medium text-gray-900 mb-3">Billing History</p>
                          <p className="text-xs text-gray-500">No billing history available.</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </div>
          </DashboardLayout>
        </ToastProvider>
      </ClientOnly>
    </>
  );
};

export default SettingsPage; 