import { SectionHeading } from "@/shared/ui/section-heading";
import { PricingPlan } from "@/entities/pricingPlan/ui/pricing-plan";
import { pricingModel } from "@/entities/pricingPlan/model";

export function Pricing() {
    const { plans } = pricingModel;

    return (
        <section id="pricing" className="container mx-auto px-4 py-20 relative z-10">
    <SectionHeading
        badge="PRICING"
    title="Simple, Transparent Pricing"
    description="Choose the plan that fits your needs, with no hidden fees or complicated pricing"
    />

    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
                <PricingPlan
                    key={index}
            title={plan.title}
            price={plan.price}
            period={plan.period}
            features={plan.features}
            cta={plan.cta}
            popular={plan.popular}
    />
))}
    </div>
    </section>
);
}