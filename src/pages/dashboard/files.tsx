'use client';

import { NextPage } from 'next';
import Head from 'next/head';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { FilesFeature } from '@/features/files/ui/FilesFeature';
import ClientOnly from '@/components/ClientOnly';

const FilesPage: NextPage = () => {
  return (
    <ClientOnly>
      <DashboardLayout>
        <Head>
          <title>My Files - Quick.Convert</title>
        </Head>

        <div className="flex flex-col gap-6 p-4 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Files</h1>
              <p className="text-gray-500 mt-1">
                Manage all your uploaded and converted files
              </p>
            </div>
          </div>

          <FilesFeature />
        </div>
      </DashboardLayout>
    </ClientOnly>
  );
};

export default FilesPage; 