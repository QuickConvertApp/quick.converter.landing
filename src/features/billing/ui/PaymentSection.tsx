import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatPrice, getPlanPrice } from '@/entities/plan/model';
import { BillingCycle, PlanType } from '@/entities/plan/model/types';

interface PaymentSectionProps {
  selectedPlan: PlanType;
  billingCycle: BillingCycle;
  onSubmit: () => void;
  submitLoading?: boolean;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({
  selectedPlan,
  billingCycle,
  onSubmit,
  submitLoading = false
}) => {
  // Only show payment details for paid plans
  if (selectedPlan === 'free') {
    return null;
  }

  const price = getPlanPrice(selectedPlan, billingCycle);
  
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
          <CardDescription>
            Enter your payment information to subscribe to the {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} plan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="cardholder">Cardholder Name</Label>
              <Input id="cardholder" placeholder="John Doe" />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="cardnumber">Card Number</Label>
              <Input id="cardnumber" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input id="expiry" placeholder="MM/YY" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" placeholder="123" type="password" />
            </div>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">
                {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan ({billingCycle})
              </span>
              <span className="font-medium">
                {formatPrice(price)}/{billingCycle === 'monthly' ? 'month' : 'year'}
              </span>
            </div>
            {billingCycle === 'yearly' && (
              <div className="flex justify-between items-center text-sm text-green-600">
                <span>Yearly discount (20%)</span>
                <span>-{formatPrice(price * 0.2 * 12)}</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            Your subscription will begin immediately
          </div>
          <Button onClick={onSubmit} disabled={submitLoading}>
            {submitLoading ? 'Processing...' : `Subscribe for ${formatPrice(price * (billingCycle === 'yearly' ? 12 * 0.8 : 1))}`}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}; 