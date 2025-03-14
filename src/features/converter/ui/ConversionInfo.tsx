import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';
import { ConversionType } from '@/entities/conversion/model';

interface ConversionInfoProps {
  selectedConversion: ConversionType;
}

export const ConversionInfo: React.FC<ConversionInfoProps> = ({ selectedConversion }) => {
  return (
    <div className="space-y-6">
      {/* Conversion info */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">About This Conversion</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              <Info className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{selectedConversion.name}</h4>
              <p className="text-sm text-gray-500 mt-1">
                {selectedConversion.description}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Features:</h4>
            <ul className="space-y-2">
              {selectedConversion.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Tips card */}
      <Card className="bg-blue-50 border-blue-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-gray-900 text-base">Pro Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {selectedConversion.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="mt-0.5 text-blue-600">
                  <AlertCircle className="h-4 w-4" />
                </div>
                <span className="text-sm text-gray-700">{tip}</span>
              </li>
            ))}
            <li className="flex items-start gap-2">
              <div className="mt-0.5 text-blue-600">
                <AlertCircle className="h-4 w-4" />
              </div>
              <span className="text-sm text-gray-700">
                Upgrade to Premium for unlimited daily conversions and larger file size support.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}; 