import React from 'react';
import { BillingCycle } from '@/entities/plan/model/types';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface BillingCycleSelectorProps {
  billingCycle: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
  yearlyDiscount?: number;
}

export const BillingCycleSelector: React.FC<BillingCycleSelectorProps> = ({
  billingCycle,
  onChange,
  yearlyDiscount = 20
}) => {
  const handleToggle = (checked: boolean) => {
    onChange(checked ? 'yearly' : 'monthly');
  };

  return (
    <div className="w-full max-w-lg mx-auto mb-8">
      <div className="flex justify-center items-center space-x-6 p-2 rounded-lg bg-gray-50">
        <Label htmlFor="billing-cycle" className={`font-medium ${billingCycle === 'monthly' ? 'text-blue-600' : 'text-gray-500'}`}>
          Monthly
        </Label>
        
        <Switch
          id="billing-cycle"
          checked={billingCycle === 'yearly'}
          onCheckedChange={handleToggle}
        />
        
        <div className="flex items-center space-x-2">
          <Label htmlFor="billing-cycle" className={`font-medium ${billingCycle === 'yearly' ? 'text-blue-600' : 'text-gray-500'}`}>
            Yearly
          </Label>
          {yearlyDiscount > 0 && (
            <span className="text-xs font-semibold bg-green-100 text-green-800 py-1 px-2 rounded-full">
              Save {yearlyDiscount}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}; 