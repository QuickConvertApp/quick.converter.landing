import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { HelpCenterWidget } from '@/widgets/help/ui/HelpCenterWidget';
import ClientOnly from '@/components/ClientOnly';
import { ToastProvider } from '@/components/ui/use-toast';

const HelpCenterPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Help Center - QuickConvert</title>
        <meta name="description" content="Find answers to common questions and get support for QuickConvert" />
      </Head>
      
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8">
          <ClientOnly>
            <ToastProvider>
              <HelpCenterWidget />
            </ToastProvider>
          </ClientOnly>
        </div>
      </DashboardLayout>
    </>
  );
};

export default HelpCenterPage; 