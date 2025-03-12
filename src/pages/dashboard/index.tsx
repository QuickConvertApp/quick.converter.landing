'use client';

import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Download, 
  Upload, 
  Users, 
  ArrowUpRight, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Zap,
  FileUp
} from 'lucide-react';
import ClientOnly from '@/components/ClientOnly';
import { getUser } from '@/shared/lib/auth';
import Link from 'next/link';
import { motion } from 'framer-motion';

const DashboardPage: NextPage = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = getUser();
    setUser(userData);
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Sample conversion types for the quick actions
  const conversionTypes = [
    { name: 'PDF to Word', icon: FileText, color: 'bg-gray-100 text-black' },
    { name: 'Image to PDF', icon: FileUp, color: 'bg-gray-100 text-black' },
    { name: 'Word to PDF', icon: FileText, color: 'bg-gray-100 text-black' },
    { name: 'PDF Compress', icon: Zap, color: 'bg-gray-100 text-black' },
  ];

  // Sample recent files
  const recentFiles = [
    { 
      id: 1, 
      name: 'Business_Proposal.pdf', 
      type: 'PDF', 
      size: '2.4 MB', 
      date: '2023-03-01', 
      status: 'completed' 
    },
    { 
      id: 2, 
      name: 'Financial_Report_Q1.docx', 
      type: 'DOCX', 
      size: '1.8 MB', 
      date: '2023-02-28', 
      status: 'completed' 
    },
    { 
      id: 3, 
      name: 'Project_Timeline.xlsx', 
      type: 'XLSX', 
      size: '3.2 MB', 
      date: '2023-02-27', 
      status: 'processing' 
    },
    { 
      id: 4, 
      name: 'Marketing_Presentation.pptx', 
      type: 'PPTX', 
      size: '5.7 MB', 
      date: '2023-02-26', 
      status: 'failed' 
    },
  ];

  // Sample stats data
  const statsData = [
    { 
      title: 'Total Conversions', 
      value: '128', 
      change: '+12%', 
      icon: Download, 
      iconColor: 'text-black', 
      iconBg: 'bg-gray-100' 
    },
    { 
      title: 'Storage Used', 
      value: '1.2 GB', 
      change: '+5%', 
      icon: Upload, 
      iconColor: 'text-black', 
      iconBg: 'bg-gray-100' 
    },
    { 
      title: 'Active Projects', 
      value: '5', 
      change: '+2', 
      icon: FileText, 
      iconColor: 'text-black', 
      iconBg: 'bg-gray-100' 
    },
    { 
      title: 'Team Members', 
      value: '3', 
      change: '0', 
      icon: Users, 
      iconColor: 'text-black', 
      iconBg: 'bg-gray-100' 
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-black" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-gray-500" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'processing':
        return 'Processing';
      case 'failed':
        return 'Failed';
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <ClientOnly>
        <DashboardLayout>
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black mb-4"></div>
              <p className="text-gray-500">Loading dashboard data...</p>
            </div>
          </div>
        </DashboardLayout>
      </ClientOnly>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard | Quick Convert</title>
        <meta name="description" content="Quick Convert dashboard" />
      </Head>

      <ClientOnly>
        <DashboardLayout>
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-black">Dashboard</h2>
              <p className="text-gray-500 mt-1">
                Welcome back, {user?.firstName || 'User'}! Here's an overview of your activity.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {statsData.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="bg-white border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                          <div className="flex items-center mt-1">
                            <p className="text-2xl font-bold text-black">{stat.value}</p>
                            <span className="text-xs font-medium text-black ml-2 bg-gray-100 px-1.5 py-0.5 rounded-full">
                              {stat.change}
                            </span>
                          </div>
                        </div>
                        <div className={`p-3 rounded-full ${stat.iconBg}`}>
                          <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Quick Actions</CardTitle>
                <CardDescription className="text-gray-500">
                  Start a new conversion with one click
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {conversionTypes.map((type, index) => (
                    <motion.div
                      key={type.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <Button 
                        variant="outline" 
                        className="w-full h-auto py-6 flex flex-col items-center justify-center gap-3 border-gray-200 hover:border-black hover:bg-gray-50"
                        asChild
                      >
                        <Link href={`/dashboard/convert`}>
                          <div className={`p-3 rounded-full ${type.color}`}>
                            <type.icon className="h-6 w-6" />
                          </div>
                          <span className="text-gray-900 font-medium">{type.name}</span>
                        </Link>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Files */}
            <Card className="bg-white border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-gray-900">Recent Files</CardTitle>
                  <CardDescription className="text-gray-500">
                    Your recently converted files
                  </CardDescription>
                </div>
                <Button variant="outline" className="border-gray-200 text-gray-700 hover:text-black hover:border-black">
                  View All Files
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Type</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Size</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentFiles.map((file) => (
                        <tr key={file.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 text-gray-400 mr-2" />
                              <span className="text-sm font-medium text-gray-900">{file.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-500">{file.type}</td>
                          <td className="py-3 px-4 text-sm text-gray-500">{file.size}</td>
                          <td className="py-3 px-4 text-sm text-gray-500">{file.date}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              {getStatusIcon(file.status)}
                              <span className="text-sm ml-1.5 text-gray-700">{getStatusText(file.status)}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-black">
                              <Download className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </DashboardLayout>
      </ClientOnly>
    </>
  );
};

export default DashboardPage; 