import React, { useState, useEffect } from 'react';
import { BillingCycleSelector } from '@/features/billing/ui/BillingCycleSelector';
import { PlanSelector } from '@/features/billing/ui/PlanSelector';
import { PaymentSection } from '@/features/billing/ui/PaymentSection';
import { CurrentPlanInfo } from '@/features/billing/ui/CurrentPlanInfo';
import { BillingCycle, PlanType } from '@/entities/plan/model/types';
import { 
  getSelectedPlan, 
  saveSelectedPlan, 
  getBillingCycle, 
  saveBillingCycle,
  getCurrentSubscription,
  saveCurrentSubscription,
  createSubscription,
  cancelSubscription,
  clearCurrentSubscription
} from '@/features/billing/model';
import { pricingInfo } from '@/entities/plan/model';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export const BillingWidget: React.FC = () => {
  // State management
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('free');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [subscription, setSubscription] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  
  // Get toast function from hook
  const { toast } = useToast();

  // Load saved data on component mount
  useEffect(() => {
    setSelectedPlan(getSelectedPlan());
    setBillingCycle(getBillingCycle());
    setSubscription(getCurrentSubscription());
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    saveSelectedPlan(selectedPlan);
  }, [selectedPlan]);

  useEffect(() => {
    saveBillingCycle(billingCycle);
  }, [billingCycle]);

  // Handle plan selection
  const handlePlanChange = (plan: PlanType) => {
    setSelectedPlan(plan);
  };

  // Handle billing cycle change
  const handleBillingCycleChange = (cycle: BillingCycle) => {
    setBillingCycle(cycle);
  };

  // Handle subscription submission
  const handleSubscribe = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      try {
        if (selectedPlan === 'free') {
          // If switching to free plan, clear subscription
          clearCurrentSubscription();
          setSubscription(null);
        } else {
          // Create new subscription
          const newSubscription = createSubscription(selectedPlan, billingCycle);
          saveCurrentSubscription(newSubscription);
          setSubscription(newSubscription);
        }
        
        toast({
          title: "Subscription updated",
          description: selectedPlan === 'free' 
            ? "You are now on the Free plan." 
            : `You are now subscribed to the ${selectedPlan} plan.`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update subscription. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    }, 1500); // Simulating network delay
  };

  // Handle subscription cancellation
  const handleCancelSubscription = () => {
    setIsCancelling(true);
    
    // Simulate API call
    setTimeout(() => {
      try {
        if (subscription) {
          const cancelledSubscription = cancelSubscription(subscription);
          saveCurrentSubscription(cancelledSubscription);
          setSubscription(cancelledSubscription);
          
          toast({
            title: "Subscription cancelled",
            description: "Your subscription has been cancelled successfully.",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to cancel subscription. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsCancelling(false);
      }
    }, 1500); // Simulating network delay
  };

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-8">
        {/* Current plan information (only shown for paid plans) */}
        <CurrentPlanInfo 
          currentSubscription={subscription} 
          onCancelSubscription={handleCancelSubscription}
          cancelLoading={isCancelling}
        />
        
        {/* Billing cycle selector */}
        <BillingCycleSelector 
          billingCycle={billingCycle} 
          onChange={handleBillingCycleChange}
          yearlyDiscount={pricingInfo.yearlyDiscount * 100}
        />
        
        {/* Plan selection cards */}
        <PlanSelector 
          selectedPlan={selectedPlan} 
          billingCycle={billingCycle} 
          onPlanChange={handlePlanChange}
        />
        
        {/* Payment section for paid plans */}
        <PaymentSection
          selectedPlan={selectedPlan}
          billingCycle={billingCycle}
          onSubmit={handleSubscribe}
          submitLoading={isSubmitting}
        />
        
        {/* Free plan button */}
        {selectedPlan === 'free' && (
          <div className="mt-8 text-center">
            <Button 
              onClick={handleSubscribe} 
              disabled={isSubmitting}
              size="lg"
            >
              {isSubmitting ? 'Processing...' : 'Confirm Free Plan Selection'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}; 