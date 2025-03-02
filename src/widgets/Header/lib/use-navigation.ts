import { useState, useEffect } from "react";

export function useNavigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState("features");

    // Detect scroll for navbar effects
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { label: "Features", href: "#features" },
        { label: "How It Works", href: "#how-it-works" },
        { label: "Testimonials", href: "#testimonials" },
        { label: "Pricing", href: "#pricing" },
    ];

    return {
        isScrolled,
        activeTab,
        setActiveTab,
        navItems
    };
}