'use client';

import { ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { isAuthenticated, getUser, handleLogout } from '@/shared/lib/auth';
import { 
  LayoutGrid, 
  BarChart3, 
  Settings, 
  Users, 
  FileText, 
  LogOut, 
  Menu, 
  X,
  Bell,
  User,
  HelpCircle,
  FileUp,
  Zap,
  CreditCard,
  Star,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push('/sign-in');
      return;
    }

    // Get user data
    const userData = getUser();
    setUser(userData);
  }, [router]);

  const onLogout = async () => {
    handleLogout();
    router.push('/sign-in');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const mainNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
    { name: 'My Files', href: '/dashboard/files', icon: FileText },
    { name: 'Convert', href: '/dashboard/convert', icon: FileUp },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  ];

  const secondaryNavItems = [
    { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    { name: 'Help & Support', href: '/dashboard/support', icon: HelpCircle },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/dashboard/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black mb-4"></div>
          <p className="text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 lg:px-6 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden mr-2 text-gray-500 hover:text-black hover:bg-gray-100"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
            <Link href="/dashboard" className="flex items-center gap-2">
              <Image src="/logo.svg" alt="Logo" width={32} height={32} />
              <span className="font-bold text-xl text-black hidden md:inline-block">Quick Convert</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center mx-4 flex-1 max-w-md">
            <form onSubmit={handleSearch} className="w-full relative">
              <Input
                type="search"
                placeholder="Search files..."
                className="bg-white border-gray-300 text-gray-900 w-full pl-10 focus:ring-1 focus:ring-black focus:border-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
          </div>
          
          <div className="flex items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-black hover:bg-gray-100 relative">
                    <Bell size={20} />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-black text-white text-xs">
                      3
                    </Badge>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-black hover:bg-gray-100">
                    <HelpCircle size={20} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Help & Support</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border border-gray-200">
                    <AvatarImage src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`} alt={`${user.firstName} ${user.lastName}`} />
                    <AvatarFallback className="bg-gray-100 text-gray-800">{user.firstName?.[0]}{user.lastName?.[0]}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border-gray-200 text-gray-900 shadow-md" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-black">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem className="text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => router.push('/dashboard/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => router.push('/dashboard/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => router.push('/dashboard/billing')}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem 
                  className="text-red-600 hover:bg-gray-100 cursor-pointer"
                  onClick={onLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={`
            fixed lg:static inset-y-0 pt-16 left-0 z-40 w-64 bg-white border-r border-gray-200 
            transform transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <div className="p-4">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Free Plan</h3>
                <Button variant="link" className="text-xs text-black p-0 h-auto" onClick={() => router.push('/dashboard/billing')}>
                  Upgrade
                </Button>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-black h-1.5 rounded-full" style={{ width: '35%' }}></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>35/100 conversions</span>
                <span>35%</span>
              </div>
            </div>
            
            <div className="mb-6">
              <Button className="w-full bg-black hover:bg-gray-800 text-white flex items-center justify-center gap-2 transition-colors">
                <FileUp className="h-4 w-4" />
                <span>Upload File</span>
              </Button>
            </div>
            
            <nav className="space-y-6">
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                  Main
                </h3>
                <div className="space-y-1">
                  {mainNavItems.map((item) => {
                    const isActive = router.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`
                          flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                          ${isActive 
                            ? 'bg-gray-100 text-black' 
                            : 'text-gray-700 hover:text-black hover:bg-gray-100'}
                        `}
                      >
                        <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-black' : 'text-gray-500'}`} />
                        {item.name}
                        {item.name === 'Dashboard' && (
                          <Badge className="ml-auto bg-black text-white">New</Badge>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                  Settings
                </h3>
                <div className="space-y-1">
                  {secondaryNavItems.map((item) => {
                    const isActive = router.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`
                          flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                          ${isActive 
                            ? 'bg-gray-100 text-black' 
                            : 'text-gray-700 hover:text-black hover:bg-gray-100'}
                        `}
                      >
                        <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-black' : 'text-gray-500'}`} />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
              
              <div className="px-3 py-4 mt-6">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center mb-3">
                    <Zap className="h-5 w-5 text-black mr-2" />
                    <h4 className="font-medium text-black">Pro Features</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Upgrade to Pro for unlimited conversions and premium features.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => router.push('/dashboard/billing')}
                  >
                    View Plans
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 