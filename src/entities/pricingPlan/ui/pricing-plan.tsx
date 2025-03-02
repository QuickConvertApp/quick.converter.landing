import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";

export function PricingPlan({
                                title,
                                price,
                                period,
                                features = [],
                                cta,
                                popular = false,
                                className = ""
                            }) {
    const accentColor = "rgb(59, 130, 246)"; // blue-500

    return (
        <div className={`transition-all duration-300 ${className}`}>
            <Card
                className={`border-gray-800 h-full relative ${
                    popular
                        ? 'bg-gray-900 border-2 border-gray-700 shadow-lg'
                        : 'bg-gray-900 hover:border-gray-700'
                } transition-all duration-200`}
            >
                {/* Popular badge with minimal styling */}
                {popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                        <Badge className="bg-white text-black px-3 py-1 font-medium">
                            Most Popular
                        </Badge>
                    </div>
                )}

                <CardContent className="p-6 pt-8">
                    <div className="text-center space-y-3 mb-6">
                        <h3 className="text-xl font-bold text-white">{title}</h3>
                        <div className="flex items-center justify-center">
                            <span className="text-4xl font-bold text-white">{price}</span>
                            {period && (
                                <span className="text-gray-400 ml-2">
                  {period}
                </span>
                            )}
                        </div>
                    </div>

                    <Separator className="mb-6 bg-gray-800" />

                    <ul className="space-y-4 mb-8">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300 text-sm">
                  {feature}
                </span>
                            </li>
                        ))}
                    </ul>
                </CardContent>

                <CardFooter className="px-6 pb-6 pt-0">
                    <Button
                        className={`w-full py-5 font-medium ${
                            popular
                                ? 'bg-white text-black hover:bg-gray-200'
                                : 'bg-transparent border border-white text-white hover:bg-white/10'
                        } transition-all duration-200`}
                        size="lg"
                    >
                        {cta}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}