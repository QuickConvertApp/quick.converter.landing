import React from 'react';
import { PlanType, BillingCycle } from '@/entities/plan/model/types';
import { PlanCard } from '@/entities/plan/ui/PlanCard';

interface PlanSelectorProps {
  selectedPlan: PlanType;
  billingCycle: BillingCycle;
  onPlanChange: (plan: PlanType) => void;
}

export const PlanSelector: React.FC<PlanSelectorProps> = ({
  selectedPlan,
  billingCycle,
  onPlanChange
}) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
      {(['free', 'pro', 'enterprise'] as PlanType[]).map((planType) => (
        <PlanCard
          key={planType}
          planType={planType}
          billingCycle={billingCycle}
          isSelected={selectedPlan === planType}
          onSelect={onPlanChange}
        />
      ))}
    </div>
  );
}; 