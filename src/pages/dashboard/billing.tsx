import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { BillingWidget } from '@/widgets/billing/ui/BillingWidget';
import ClientOnly from '@/components/ClientOnly';
import { ToastProvider } from '@/components/ui/use-toast';

const BillingPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Subscription Plans - QuickConvert</title>
        <meta name="description" content="Choose a subscription plan that fits your needs" />
      </Head>
      
      <DashboardLayout>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Subscription Plans
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Choose a plan that suits your needs. Upgrade or downgrade at any time.
            </p>
          </div>
          
          <ClientOnly>
            <ToastProvider>
              <BillingWidget />
            </ToastProvider>
          </ClientOnly>
        </div>
      </DashboardLayout>
    </>
  );
};

export default BillingPage;
