import {Upload, Cog ,Download } from 'lucide-react'
import React from "react";


interface ProcessStepItem {
    step: string;
    title: string;
    description: string;
    icon: React.ComponentType;
}

interface ProcessStepsArray {
    steps: ProcessStepItem[];
}

export const processStepsModel: ProcessStepsArray = {
    steps: [
        {
            step: "1",
            title: "Upload Your PDF",
            description: "Drag and drop your PDF files or select them from your device",
            icon: Upload,
        },
        {
            step: "2",
            title: "Configure Settings",
            description: "Choose your preferred formatting options and conversion parameters",
            icon: Cog
        },
        {
            step: "3",
            title: "Download EPUB",
            description: "Get your perfectly converted EPUB file ready for any e-reader or device",
            icon:Download
        },
    ]
};