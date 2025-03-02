import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

export function FeatureCard({ title, description, icon: Icon, benefits = [], className = "" }) {
    return (
        <Card className={`border-gray-800 bg-gray-900 hover:border-gray-700 transition-all duration-300 ${className}`}>
            <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start">
                <div className="w-20 h-20 rounded-lg bg-white flex items-center justify-center mb-4 md:mb-0 flex-shrink-0">
                    <Icon className="text-black" size={32} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                        {description}
                    </p>
                    {benefits.length > 0 && (
                        <ul className="space-y-4">
                            {benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <div className="p-1 rounded-full bg-gray-800 flex-shrink-0 mt-0.5">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-gray-300">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}