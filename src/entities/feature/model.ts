import React from 'react';
import { Book, Database, Activity } from 'lucide-react';

interface FeatureItem {
    title: string;
    icon: React.ComponentType;
    description: string;
    benefits: string[];
}

export const featureModel: {
    features: {
        formatting: FeatureItem;
        integrity: FeatureItem;
        compliance: FeatureItem;
    }
} = {
    features: {
        formatting: {
            title: "Perfect Formatting",
            description: "Our advanced algorithms maintain document structure, fonts, and layouts with precision that other converters can't match.",
            icon: Book,
            benefits: [
                "Preserves paragraph structure and text flow",
                "Maintains headings, lists, and other structural elements",
                "Intelligent font substitution for optimal readability",
            ]
        },
        integrity: {
            title: "Data Integrity",
            description: "We ensure all content is preserved with checksum verification and validation processes throughout the conversion.",
            icon: Database,
            benefits: [
                "Checksum verification at multiple stages",
                "Content validation to preserve all information",
                "Error recovery mechanisms to prevent data loss",
            ]
        },
        compliance: {
            title: "Compliance Ready",
            description: "Our converter meets industry standards for accessibility and digital publishing requirements for all major e-readers.",
            icon: Activity,
            benefits: [
                "EPUB 3.0 standard compliance",
                "Accessibility features for screen readers",
                "Support for all major e-reader devices",
            ]
        }
    }
};