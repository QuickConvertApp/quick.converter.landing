import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function CallToAction() {
    return (
        <section className="container mx-auto px-4 py-16 relative z-10">
            <Card className="border border-gray-800 bg-gray-900 overflow-hidden">
                {/* Abstract shapes */}
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-white"></div>
                </div>

                <CardContent className="p-8 md:p-16 text-center relative">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Transform Your Documents?</h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Join thousands of satisfied users who trust our solution for reliable PDF to EPUB conversion
                    </p>
                    <Button size="lg" className="bg-white text-black hover:bg-gray-100 text-lg py-6 px-8">
                        Start Converting for Free
                    </Button>
                    <p className="mt-4 text-gray-400">No credit card required • 5 free conversions</p>
                </CardContent>
            </Card>
        </section>
    );
}