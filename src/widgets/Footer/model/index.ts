import { Twitter, Linkedin, Instagram } from "lucide-react";
import React from "react";

export function footerModel() {
    const footerLinks = {
        product: [
            { label: "Features", href: "#" },
            { label: "Pricing", href: "#" },
            { label: "Enterprise", href: "#" },
            { label: "Security", href: "#" },
        ],
        resources: [
            { label: "Documentation", href: "#" },
            { label: "Tutorials", href: "#" },
            { label: "API Reference", href: "#" },
            { label: "Blog", href: "#" },
        ],
        legal: [
            { label: "Privacy Policy", href: "#" },
            { label: "Terms of Service", href: "#" },
            { label: "Data Processing", href: "#" },
            { label: "Compliance", href: "#" },
        ],
    };

    interface SocialLink {
        name: string;
        href: string;
        icon: React.ElementType;
    }

    const socialLinks: SocialLink[] = [
        {
            name: "Twitter",
            href: "https://www.twitter.com",
            icon: Twitter
        },
        {
            name: "LinkedIn",
            href: "https://www.linkedin.com",
            icon: Linkedin
        },
        {
            name: "Instagram",
            href: "https://www.instagram.com",
            icon: Instagram
        },
    ];

    const currentYear = new Date().getFullYear();

    return {
        footerLinks,
        socialLinks,
        currentYear
    };
}