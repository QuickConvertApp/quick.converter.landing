// Plan type definitions
export type PlanType = 'free' | 'pro' | 'enterprise';
export type BillingCycle = 'monthly' | 'yearly';

// Define pricing plan features
export interface PlanFeature {
  name: string;
  free: boolean;
  pro: boolean;
  enterprise: boolean;
}

// Plan interface
export interface Plan {
  id: PlanType;
  name: string;
  description: string;
  icon: string;
  popular?: boolean;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
}

// Pricing information
export interface PricingInfo {
  baseMonthlyPrice: Record<PlanType, number>;
  yearlyDiscount: number;
}

// Subscription interface
export interface Subscription {
  planType: PlanType;
  billingCycle: BillingCycle;
  startDate: string;
  endDate?: string;
  status: 'active' | 'canceled' | 'expired';
} 