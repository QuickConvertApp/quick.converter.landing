import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";
import { useNavigation } from "../lib/use-navigation";
import Image from "next/image";

export function Header() {
    const { navItems, activeTab, setActiveTab, isScrolled } = useNavigation();
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? "py-3 bg-gray-900 backdrop-blur-sm shadow-md border-b border-gray-800" : "py-6 bg-transparent"
        }`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="flex items-center gap-3 ">
                        <Image src="/logo.svg" alt="" width="52" height="52" />
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`relative font-medium transition-colors ${
                                activeTab === item.href.substring(1)
                                    ? "text-white"
                                    : "text-gray-400 hover:text-white"
                            }`}
                            onClick={() => setActiveTab(item.href.substring(1))}
                        >
                            {item.label}
                            {activeTab === item.href.substring(1) && (
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white rounded-full"></span>
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <Button variant="default" className="cursor-pointer hidden md:inline-flex border-gray-600 text-white hover:bg-white hover:text-black">
                        Login
                    </Button>
                    <Button className="cursor-pointer bg-white text-black hover:bg-gray-200 transition-all">
                        Get Started
                    </Button>

                    {/* Mobile menu button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden text-white hover:bg-white/10"
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                    >
                        {showMobileMenu ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="4" y1="12" x2="20" y2="12"></line>
                                <line x1="4" y1="6" x2="20" y2="6"></line>
                                <line x1="4" y1="18" x2="20" y2="18"></line>
                            </svg>
                        )}
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <MobileMenu
                isOpen={showMobileMenu}
                navItems={navItems}
                activeTab={activeTab}
                onTabChange={(tab) => {
                    setActiveTab(tab);
                    setShowMobileMenu(false);
                }}
            />
        </header>
    );
}