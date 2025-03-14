import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { 
  ConversionType, 
  conversionTypes 
} from '@/entities/conversion/model';

interface ConversionTypeSelectorProps {
  selectedConversion: ConversionType;
  onSelect: (conversion: ConversionType) => void;
}

export const ConversionTypeSelector: React.FC<ConversionTypeSelectorProps> = ({
  selectedConversion,
  onSelect,
}) => {
  return (
    <div className="space-y-3">
      <Tabs 
        defaultValue={selectedConversion.id} 
        onValueChange={(value) => {
          const conversion = conversionTypes.find(c => c.id === value);
          if (conversion) onSelect(conversion);
        }}
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-full">
          {conversionTypes.map((type) => (
            <TabsTrigger 
              key={type.id} 
              value={type.id}
              className="flex items-center gap-2"
            >
              <type.icon className="h-4 w-4" />
              <span className="hidden md:inline">{type.name}</span>
              <span className="md:hidden">{type.sourceType.split('/')[0]}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {conversionTypes.map((type) => (
          <TabsContent key={type.id} value={type.id} className="pt-4">
            <div className="flex items-center justify-center gap-3 py-2">
              <Badge variant="secondary" className={type.color.replace('bg-', 'bg-opacity-20 ')}>
                {type.sourceType}
              </Badge>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <Badge variant="secondary" className="bg-opacity-20 bg-gray-100 text-gray-700">
                {type.targetType}
              </Badge>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}; 