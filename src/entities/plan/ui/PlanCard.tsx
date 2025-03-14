import React from 'react';
import { 
  FileText, 
  BadgeCheck, 
  Building2,
  LucideIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlanFeatureItem } from './PlanFeatureItem';
import { PlanType, BillingCycle } from '../model/types';
import { formatPrice, getPlanPrice, pricingFeatures } from '../model';

interface PlanCardProps {
  planType: PlanType;
  billingCycle: BillingCycle;
  isSelected: boolean;
  featuresToShow?: number;
  onSelect: (plan: PlanType) => void;
}

// Map of plan types to their respective icons
const planIcons: Record<PlanType, LucideIcon> = {
  free: FileText,
  pro: BadgeCheck,
  enterprise: Building2
};

// Map of plan types to their descriptions
const planDescriptions: Record<PlanType, string> = {
  free: 'Basic conversion needs',
  pro: 'For power users',
  enterprise: 'For organizations'
};

export const PlanCard: React.FC<PlanCardProps> = ({
  planType,
  billingCycle,
  isSelected,
  featuresToShow = 6,
  onSelect
}) => {
  const Icon = planIcons[planType];
  const price = getPlanPrice(planType, billingCycle);
  
  // Determine which features to show based on the plan and limit
  const featuresToDisplay = pricingFeatures.slice(0, planType === 'enterprise' ? undefined : featuresToShow);
  
  return (
    <Card className={`border-2 ${isSelected ? 'border-blue-500 bg-blue-50/50' : 'border-transparent'} hover:border-blue-300 transition-colors`}>
      <CardHeader>
        {planType === 'pro' ? (
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-blue-500" />
                {planType.charAt(0).toUpperCase() + planType.slice(1)}
              </CardTitle>
              <CardDescription>{planDescriptions[planType]}</CardDescription>
            </div>
            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
              Popular
            </div>
          </div>
        ) : (
          <>
            <CardTitle className="flex items-center gap-2">
              <Icon className="h-5 w-5 text-blue-500" />
              {planType.charAt(0).toUpperCase() + planType.slice(1)}
            </CardTitle>
            <CardDescription>{planDescriptions[planType]}</CardDescription>
          </>
        )}
        <div className="mt-2">
          <span className="text-3xl font-bold">{formatPrice(price)}</span>
          {price > 0 && (
            <span className="text-gray-500 ml-1">
              /{billingCycle === 'yearly' ? 'month, billed annually' : 'month'}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {featuresToDisplay.map((feature, index) => (
            <PlanFeatureItem
              key={index}
              name={feature.name}
              included={feature[planType]}
            />
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          variant={isSelected ? 'default' : 'outline'} 
          className="w-full"
          onClick={() => onSelect(planType)}
        >
          {isSelected ? 'Current Plan' : 'Select Plan'}
        </Button>
      </CardFooter>
    </Card>
  );
}; 