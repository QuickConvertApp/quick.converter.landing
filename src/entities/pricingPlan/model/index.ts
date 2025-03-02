export const pricingModel = {
    plans: [
        {
            title: "Free",
            price: "$0",
            features: [
                "Convert up to 5 PDFs per month",
                "Basic formatting preservation",
                "Standard email support"
            ],
            cta: "Start Free",
            popular: false
        },
        {
            title: "Pro",
            price: "$9.99",
            period: "/month",
            features: [
                "Unlimited conversions",
                "Advanced formatting & data integrity",
                "Priority email support",
                "Batch conversion",
                "Cloud storage for documents"
            ],
            cta: "Get Started",
            popular: true
        },
        {
            title: "Enterprise",
            price: "Custom",
            features: [
                "All Pro features",
                "API access",
                "Dedicated account manager",
                "Custom compliance solutions",
                "White-label options"
            ],
            cta: "Contact Sales",
            popular: false
        }
    ]
};