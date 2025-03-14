import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ConversionTypeSelector } from './ConversionTypeSelector';
import { FileUploader } from './FileUploader';
import { AdvancedOptions } from './AdvancedOptions';
import { ConversionResult } from './ConversionResult';
import { ConversionInfo } from './ConversionInfo';
import { useConverter } from '../model/converter';

export const ConverterFeature: React.FC = () => {
  const { 
    state, 
    setSelectedConversion, 
    setFile, 
    toggleAdvancedOptions,
    setAdvancedSetting,
    convertFile,
    downloadFile,
    reset
  } = useConverter();

  return (
    <div className="grid md:grid-cols-12 gap-6">
      {/* Main convert area */}
      <div className="md:col-span-8">
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">File Converter</CardTitle>
            <CardDescription className="text-gray-500">
              Choose a conversion type and upload your file
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Conversion type selector */}
            <div className="space-y-3">
              <Label htmlFor="conversion-type">Conversion Type</Label>
              <ConversionTypeSelector 
                selectedConversion={state.selectedConversion}
                onSelect={setSelectedConversion}
              />
            </div>

            {/* File upload area */}
            <div className="space-y-3">
              <Label htmlFor="file-upload">Upload File</Label>
              <FileUploader 
                selectedConversion={state.selectedConversion}
                file={state.file}
                onFileChange={setFile}
              />
            </div>

            {/* Advanced options */}
            <AdvancedOptions 
              selectedConversion={state.selectedConversion}
              showAdvanced={state.advancedOptions}
              onToggleAdvanced={toggleAdvancedOptions}
              advancedSettings={state.advancedSettings}
              onAdvancedSettingChange={setAdvancedSetting}
            />

            {/* Conversion result */}
            <ConversionResult 
              isConverting={state.isConverting}
              progress={state.progress}
              convertedFileId={state.convertedFileId}
              error={state.error}
              onDownload={downloadFile}
            />
          </CardContent>
          <CardFooter className="flex justify-between border-t border-gray-100 pt-6">
            <Button 
              variant="outline" 
              disabled={state.isConverting}
              onClick={reset}
            >
              Cancel
            </Button>
            <Button 
              onClick={convertFile} 
              disabled={!state.file || state.isConverting}
              className={!state.file ? 'opacity-50 cursor-not-allowed' : ''}
            >
              {state.isConverting ? 'Converting...' : 'Convert Now'}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Sidebar with information */}
      <div className="md:col-span-4">
        <ConversionInfo selectedConversion={state.selectedConversion} />
      </div>
    </div>
  );
}; 