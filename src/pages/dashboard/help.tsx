import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { HelpCenterWidget } from '@/widgets/help/ui/HelpCenterWidget';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const HelpCenterPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { tab, category, search } = router.query;
  
  // Simulate loading state for a smoother experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Reset loading state when query params change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [tab, category, search]);
  
  return (
    <>
      <Head>
        <title>Help Center | QuickConvert</title>
        <meta name="description" content="Get help and support for QuickConvert. Browse our knowledge base, FAQs, or contact our support team." />
        <meta name="keywords" content="QuickConvert, help, support, FAQs, knowledge base, customer support" />
        <meta property="og:title" content="Help Center | QuickConvert" />
        <meta property="og:description" content="Get help and support for QuickConvert. Browse our knowledge base, FAQs, or contact our support team." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Help Center | QuickConvert" />
        <meta name="twitter:description" content="Get help and support for QuickConvert. Browse our knowledge base, FAQs, or contact our support team." />
      </Head>
      
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="mb-6 md:mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Help Center</h1>
              <p className="text-gray-500 mt-2 text-lg">
                Find answers, browse articles, or contact our support team
              </p>
              
              <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-600 mt-4 rounded-full"></div>
            </motion.div>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-[50vh]">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500" />
                <p className="mt-4 text-gray-500">Loading resources...</p>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <HelpCenterWidget 
                initialTab={typeof tab === 'string' ? tab : undefined}
                initialCategory={typeof category === 'string' ? category : undefined}
                initialSearch={typeof search === 'string' ? search : undefined}
              />
            </motion.div>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-16 bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-4">Can't find what you're looking for?</h2>
            <p className="text-gray-600 mb-4">
              Our support team is available Monday through Friday, 9am-6pm EST.
              We typically respond to all inquiries within 1 business day.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <a 
                href="/dashboard/help?tab=contact" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Contact Support
              </a>
              <a 
                href="mailto:support@quickconvert.com" 
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                Email Us Directly
              </a>
            </div>
          </motion.div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default HelpCenterPage; 