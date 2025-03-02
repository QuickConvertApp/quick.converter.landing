import { useState } from "react";

export function useFileUpload() {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        simulateUpload();
    };

    const handleFileSelect = () => {
        simulateUpload();
    };

    const simulateUpload = () => {
        setIsUploading(true);
        setUploadProgress(0);

        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsUploading(false);
                        setUploadProgress(0);
                    }, 1000);
                    return 100;
                }
                return prev + 5;
            });
        }, 100);
    };

    return {
        isDragging,
        isUploading,
        uploadProgress,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleFileSelect
    };
}
