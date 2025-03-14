import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';
import { ConversionType, getAcceptTypes } from '@/entities/conversion/model';

interface FileUploaderProps {
  selectedConversion: ConversionType;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  selectedConversion,
  file,
  onFileChange,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-3">
      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center relative ${
          file ? 'border-blue-300 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        } transition-colors duration-200`}
      >
        {!file ? (
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="p-3 rounded-full bg-gray-100">
              <Upload className="h-6 w-6 text-gray-500" />
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
            </div>
            <p className="text-xs text-gray-400">
              {selectedConversion.sourceType} (Max: 10MB)
            </p>
            <Input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept={getAcceptTypes(selectedConversion.sourceType)}
            />
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${selectedConversion.color}`}>
                <selectedConversion.icon className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900 truncate max-w-[200px]">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onFileChange(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              Change
            </Button>
          </div>
        )}
        <label htmlFor="file-upload" className="absolute inset-0 cursor-pointer">
          <span className="sr-only">Upload file</span>
        </label>
      </div>
    </div>
  );
}; 