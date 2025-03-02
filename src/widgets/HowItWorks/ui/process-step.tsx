import { Card, CardContent } from "@/components/ui/card";

export function ProcessStep({ step, title, description, icon: Icon, isLast = false }) {
    return (
        <div className="relative z-10 h-full">
            <Card className="relative z-10 h-full border-gray-800 bg-gray-900 group hover:border-white/30 hover:shadow-lg transition-all duration-300">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-white flex items-center justify-center font-bold text-xl mb-4 z-10 text-black group-hover:scale-105 transition-all duration-300">
                    {step}
                </div>
                <CardContent className="p-6 mt-10 text-center flex flex-col">
                    <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-6 mx-auto group-hover:bg-gray-700 transition-colors">
                        <Icon className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
                    <p className="text-gray-300 leading-relaxed">{description}</p>

                    {/* Animated progress indicator */}
                    {!isLast && (
                        <div className="hidden md:block mt-6 text-white group-hover:translate-x-2 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}