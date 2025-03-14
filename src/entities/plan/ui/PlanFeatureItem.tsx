import React from 'react';
import { Check, X } from 'lucide-react';

interface PlanFeatureItemProps {
  name: string;
  included: boolean;
}

export const PlanFeatureItem: React.FC<PlanFeatureItemProps> = ({ 
  name,
  included
}) => {
  return (
    <li className="flex items-center gap-2">
      {included ? (
        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
      ) : (
        <X className="h-4 w-4 text-gray-300 flex-shrink-0" />
      )}
      <span className={!included ? 'text-gray-400' : ''}>
        {name}
      </span>
    </li>
  );
}; 