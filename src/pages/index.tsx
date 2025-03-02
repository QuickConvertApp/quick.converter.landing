import { Header } from "@/widgets/Header";
import { Hero } from "@/widgets/Hero";
import { FeaturesTabs } from "@/widgets/FeaturesTabs";
import { HowItWorks } from "@/widgets/HowItWorks";
// import { Testimonials } from "@/widgets/Testimonials";
import { Pricing } from "@/widgets/Pricing";
import { CallToAction } from "@/widgets/CallToAction";
import { Footer } from "@/widgets/Footer";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white overflow-hidden">
            {/* Floating gradient orbs for background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl"></div>
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-purple-600/20 blur-3xl"></div>
                <div className="absolute top-3/4 left-1/3 w-64 h-64 rounded-full bg-cyan-600/10 blur-3xl"></div>
            </div>

            <Header />
            <Hero />
            <FeaturesTabs />
            <HowItWorks />
            {/*<Testimonials />*/}
            <Pricing />
            <CallToAction />
            <Footer />
        </div>
    );
}