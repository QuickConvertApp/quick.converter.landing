import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { BillingCycle, PlanType, Subscription } from '@/entities/plan/model/types';
import { formatPrice, getPlanPrice } from '@/entities/plan/model';

interface CurrentPlanInfoProps {
  currentSubscription: Subscription | null;
  onCancelSubscription?: () => void;
  cancelLoading?: boolean;
}

export const CurrentPlanInfo: React.FC<CurrentPlanInfoProps> = ({
  currentSubscription,
  onCancelSubscription,
  cancelLoading = false
}) => {
  if (!currentSubscription || currentSubscription.planType === 'free') {
    return null;
  }

  const { planType, billingCycle, status, endDate } = currentSubscription;
  const isActive = status === 'active';
  const price = getPlanPrice(planType, billingCycle);
  const formattedEndDate = endDate ? new Date(endDate).toLocaleDateString() : '';

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isActive ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-amber-500" />
          )}
          Current Subscription
        </CardTitle>
        <CardDescription>
          Your current subscription details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Plan</span>
            <span className="font-medium">
              {planType.charAt(0).toUpperCase() + planType.slice(1)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Billing Cycle</span>
            <span className="font-medium">
              {billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Price</span>
            <span className="font-medium">
              {formatPrice(price)}/{billingCycle === 'monthly' ? 'month' : 'year'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Status</span>
            <span className={`font-medium ${isActive ? 'text-green-600' : 'text-amber-600'}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
          {endDate && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Renewal Date</span>
              <span className="font-medium">{formattedEndDate}</span>
            </div>
          )}
        </div>
      </CardContent>
      {isActive && onCancelSubscription && (
        <CardFooter>
          <Button 
            variant="outline"
            className="text-red-600 hover:bg-red-50"
            onClick={onCancelSubscription}
            disabled={cancelLoading}
          >
            {cancelLoading ? 'Processing...' : 'Cancel Subscription'}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}; 