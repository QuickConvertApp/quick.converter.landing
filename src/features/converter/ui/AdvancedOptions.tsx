import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { ConversionType } from '@/entities/conversion/model';

interface AdvancedOptionsProps {
  selectedConversion: ConversionType;
  showAdvanced: boolean;
  onToggleAdvanced: (show: boolean) => void;
  advancedSettings: Record<string, any>;
  onAdvancedSettingChange: (setting: string, value: any) => void;
}

export const AdvancedOptions: React.FC<AdvancedOptionsProps> = ({
  selectedConversion,
  showAdvanced,
  onToggleAdvanced,
  advancedSettings,
  onAdvancedSettingChange,
}) => {
  return (
    <div className="pt-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch 
            id="advanced-options" 
            checked={showAdvanced}
            onCheckedChange={onToggleAdvanced}
          />
          <Label htmlFor="advanced-options" className="cursor-pointer">Advanced Options</Label>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          className="text-gray-500"
        >
          <Settings className="h-4 w-4 mr-1" /> Preferences
        </Button>
      </div>
      
      {showAdvanced && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-4 space-y-4 border border-gray-200 rounded-lg p-4 bg-gray-50"
        >
          {/* Quality slider for all conversion types */}
          <div className="space-y-2">
            <Label htmlFor="quality">Output Quality</Label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Lower</span>
              <Input 
                id="quality" 
                type="range" 
                min="1" 
                max="10" 
                value={advancedSettings.quality || 8}
                onChange={(e) => onAdvancedSettingChange('quality', parseInt(e.target.value))}
                className="w-full h-2" 
              />
              <span className="text-xs text-gray-500">Higher</span>
            </div>
          </div>
          
          {/* Conditional settings based on conversion type */}
          {(selectedConversion.id === 'pdf-to-word' || selectedConversion.id === 'pdf-to-epub') && (
            <div className="space-y-2">
              <Label htmlFor="ocr">Use OCR</Label>
              <div className="flex items-center gap-2">
                <Switch 
                  id="ocr" 
                  checked={advancedSettings.ocr || false}
                  onCheckedChange={(checked) => onAdvancedSettingChange('ocr', checked)}
                />
                <span className="text-xs text-gray-500">Improves text extraction from scanned documents</span>
              </div>
            </div>
          )}
          
          {selectedConversion.id === 'pdf-compress' && (
            <div className="space-y-2">
              <Label htmlFor="compression">Compression Level</Label>
              <select 
                id="compression" 
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                value={advancedSettings.compression || 'medium'}
                onChange={(e) => onAdvancedSettingChange('compression', e.target.value)}
              >
                <option value="low">Low (better quality)</option>
                <option value="medium">Medium (balanced)</option>
                <option value="high">High (smaller size)</option>
              </select>
            </div>
          )}

          {selectedConversion.id === 'image-to-pdf' && (
            <div className="space-y-2">
              <Label htmlFor="pageSize">Page Size</Label>
              <select 
                id="pageSize" 
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                value={advancedSettings.pageSize || 'a4'}
                onChange={(e) => onAdvancedSettingChange('pageSize', e.target.value)}
              >
                <option value="a4">A4</option>
                <option value="letter">Letter</option>
                <option value="legal">Legal</option>
              </select>
            </div>
          )}

          {selectedConversion.id === 'pdf-to-epub' && (
            <div className="space-y-2">
              <Label htmlFor="toc">Generate Table of Contents</Label>
              <div className="flex items-center gap-2">
                <Switch 
                  id="toc" 
                  checked={advancedSettings.toc !== false}
                  onCheckedChange={(checked) => onAdvancedSettingChange('toc', checked)}
                />
                <span className="text-xs text-gray-500">Creates navigation based on document headings</span>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}; 