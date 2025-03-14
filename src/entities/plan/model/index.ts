import { PlanType, PlanFeature, Plan, PricingInfo, BillingCycle } from './types';

// Define plan features
export const pricingFeatures: PlanFeature[] = [
  {
    name: 'File conversions',
    free: true,
    pro: true,
    enterprise: true
  },
  {
    name: 'Up to 10 files per month',
    free: true,
    pro: true,
    enterprise: true
  },
  {
    name: 'File size up to 10MB',
    free: true,
    pro: true,
    enterprise: true
  },
  {
    name: 'Basic file formats',
    free: true,
    pro: true,
    enterprise: true
  },
  {
    name: 'Unlimited file conversions',
    free: false,
    pro: true,
    enterprise: true
  },
  {
    name: 'File size up to 100MB',
    free: false,
    pro: true,
    enterprise: true
  },
  {
    name: 'Advanced file formats',
    free: false,
    pro: true,
    enterprise: true
  },
  {
    name: 'Batch processing',
    free: false,
    pro: true,
    enterprise: true
  },
  {
    name: 'Priority conversions',
    free: false,
    pro: false,
    enterprise: true
  },
  {
    name: 'No file size limits',
    free: false,
    pro: false,
    enterprise: true
  },
  {
    name: 'Dedicated support',
    free: false,
    pro: false,
    enterprise: true
  },
  {
    name: 'Custom integrations',
    free: false,
    pro: false,
    enterprise: true
  }
];

// Pricing information
export const pricingInfo: PricingInfo = {
  baseMonthlyPrice: {
    free: 0,
    pro: 19,
    enterprise: 49
  },
  yearlyDiscount: 0.2 // 20% discount
};

// Get plan features by plan type
export const getPlanFeatures = (planType: PlanType): string[] => {
  return pricingFeatures
    .filter(feature => feature[planType])
    .map(feature => feature.name);
};

// Get plan price based on billing cycle
export const getPlanPrice = (planType: PlanType, billingCycle: BillingCycle): number => {
  const basePrice = pricingInfo.baseMonthlyPrice[planType];
  
  if (billingCycle === 'yearly') {
    return basePrice * (1 - pricingInfo.yearlyDiscount);
  }
  
  return basePrice;
};

// Format price for display
export const formatPrice = (price: number): string => {
  if (price === 0) return 'Free';
  return `$${Math.round(price)}`;
};

// Get plan limit description
export const getPlanLimitDescription = (planType: PlanType): string => {
  switch (planType) {
    case 'free':
      return 'Basic conversion features with limited usage';
    case 'pro':
      return 'Advanced features for power users';
    case 'enterprise':
      return 'All features with priority support';
  }
};

// Check if a feature is included in a plan
export const isFeatureIncluded = (featureName: string, planType: PlanType): boolean => {
  const feature = pricingFeatures.find(f => f.name === featureName);
  return feature ? feature[planType] : false;
}; 