import { SectionHeading } from "@/shared/ui/section-heading";
import { ProcessStep } from "./process-step";
import { processStepsModel } from "../model/process-steps";

export function HowItWorks() {
    const { steps } = processStepsModel;

    return (
        <section id="how-it-works" className="container mx-auto px-4 py-20 relative z-10">
            <SectionHeading
                badge="EASY PROCESS"
                title="Simple Conversion Process"
                description="Just three easy steps to transform your PDFs into beautifully formatted EPUBs"
            />

            <div className="max-w-4xl mx-auto">
                <div className="relative">
                    {/* Progress line */}
                    <div className="absolute top-24 left-8 right-8 h-1 bg-gradient-to-r from-blue-600/20 via-blue-500/50 to-blue-400/20 hidden md:block"></div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {steps.map((step, index) => (
                            <ProcessStep
                                key={index}
                                step={step.step}
                                title={step.title}
                                description={step.description}
                                icon={step.icon}
                                isLast={index === steps.length - 1}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}