import { BillingCycle, PlanType, Subscription } from '@/entities/plan/model/types';

// Storage keys
const SELECTED_PLAN_KEY = 'selectedPlan';
const BILLING_CYCLE_KEY = 'billingCycle';
const SUBSCRIPTION_KEY = 'currentSubscription';

// Default values
const DEFAULT_PLAN: PlanType = 'free';
const DEFAULT_BILLING_CYCLE: BillingCycle = 'monthly';

/**
 * Get the currently selected plan from localStorage
 */
export const getSelectedPlan = (): PlanType => {
  if (typeof window === 'undefined') return DEFAULT_PLAN;
  
  const storedPlan = localStorage.getItem(SELECTED_PLAN_KEY);
  return (storedPlan as PlanType) || DEFAULT_PLAN;
};

/**
 * Save the selected plan to localStorage
 */
export const saveSelectedPlan = (plan: PlanType): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SELECTED_PLAN_KEY, plan);
};

/**
 * Get the currently selected billing cycle from localStorage
 */
export const getBillingCycle = (): BillingCycle => {
  if (typeof window === 'undefined') return DEFAULT_BILLING_CYCLE;
  
  const storedCycle = localStorage.getItem(BILLING_CYCLE_KEY);
  return (storedCycle as BillingCycle) || DEFAULT_BILLING_CYCLE;
};

/**
 * Save the selected billing cycle to localStorage
 */
export const saveBillingCycle = (cycle: BillingCycle): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(BILLING_CYCLE_KEY, cycle);
};

/**
 * Get the current subscription information from localStorage
 */
export const getCurrentSubscription = (): Subscription | null => {
  if (typeof window === 'undefined') return null;
  
  const storedSubscription = localStorage.getItem(SUBSCRIPTION_KEY);
  if (!storedSubscription) return null;
  
  try {
    return JSON.parse(storedSubscription) as Subscription;
  } catch (error) {
    console.error('Failed to parse subscription data:', error);
    return null;
  }
};

/**
 * Save the current subscription information to localStorage
 */
export const saveCurrentSubscription = (subscription: Subscription): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(subscription));
};

/**
 * Clear the current subscription information from localStorage
 */
export const clearCurrentSubscription = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SUBSCRIPTION_KEY);
};

/**
 * Create a new subscription based on the selected plan and billing cycle
 */
export const createSubscription = (planType: PlanType, billingCycle: BillingCycle): Subscription => {
  const now = new Date();
  const endDate = new Date(now);
  
  // Set end date based on billing cycle
  if (billingCycle === 'monthly') {
    endDate.setMonth(endDate.getMonth() + 1);
  } else {
    endDate.setFullYear(endDate.getFullYear() + 1);
  }
  
  return {
    planType,
    billingCycle,
    startDate: now.toISOString(),
    endDate: endDate.toISOString(),
    status: 'active'
  };
};

/**
 * Cancel the current subscription
 */
export const cancelSubscription = (subscription: Subscription): Subscription => {
  return {
    ...subscription,
    status: 'canceled'
  };
}; 