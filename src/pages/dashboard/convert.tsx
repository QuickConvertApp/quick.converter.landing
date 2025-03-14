'use client';

import { NextPage } from 'next';
import Head from 'next/head';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { ConverterFeature } from '@/features/converter/ui/ConverterFeature';
import ClientOnly from '@/components/ClientOnly';

const ConvertPage: NextPage = () => {
  return (
    <ClientOnly>
      <DashboardLayout>
        <Head>
          <title>Convert Files - Quick.Convert</title>
        </Head>

        <div className="flex flex-col gap-6 p-4 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Convert Files</h1>
              <p className="text-gray-500 mt-1">
                Convert your files to different formats with high quality
              </p>
            </div>
          </div>

          <ConverterFeature />
        </div>
      </DashboardLayout>
    </ClientOnly>
  );
};

export default ConvertPage; 