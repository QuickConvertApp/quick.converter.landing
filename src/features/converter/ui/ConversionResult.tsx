import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Download, AlertCircle } from 'lucide-react';

interface ConversionResultProps {
  isConverting: boolean;
  progress: number;
  convertedFileId: string | null;
  error: string | null;
  onDownload: (fileId: string) => void;
}

export const ConversionResult: React.FC<ConversionResultProps> = ({
  isConverting,
  progress,
  convertedFileId,
  error,
  onDownload,
}) => {
  if (error) {
    return (
      <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5">
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Conversion Failed</h4>
            <p className="text-sm text-gray-500 mt-1">{error}</p>
          </div>
        </div>
        <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
          Try Again
        </Button>
      </div>
    );
  }

  if (isConverting) {
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Converting...</span>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    );
  }

  if (convertedFileId) {
    return (
      <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Conversion Complete!</h4>
            <p className="text-sm text-gray-500 mt-1">Your file has been successfully converted.</p>
          </div>
        </div>
        <Button 
          className="bg-green-600 hover:bg-green-700"
          onClick={() => onDownload(convertedFileId)}
        >
          <Download className="h-4 w-4 mr-2" /> Download
        </Button>
      </div>
    );
  }

  return null;
}; 