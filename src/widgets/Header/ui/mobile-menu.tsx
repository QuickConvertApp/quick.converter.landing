import Link from "next/link";
import { Button } from "@/components/ui/button";

export function MobileMenu({ isOpen, navItems, activeTab, onTabChange }) {
    return (
        <div className={`md:hidden bg-gray-900 border-t border-gray-800 transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-60 py-4" : "max-h-0"
        }`}>
            <div className="container mx-auto px-4 flex flex-col gap-4">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`py-2 px-4 rounded-lg ${
                            activeTab === item.href.substring(1)
                                ? "bg-gray-800 text-white"
                                : "text-gray-400 hover:bg-gray-900 hover:text-white"
                        }`}
                        onClick={() => onTabChange(item.href.substring(1))}
                    >
                        {item.label}
                    </Link>
                ))}
                <Link href="/sign-in" className="hidden md:block">
                    <Button variant="outline" className="mt-2 border-gray-700 text-white hover:bg-white hover:text-black">
                        Login
                    </Button>
                </Link>
            </div>
        </div>
    );
}