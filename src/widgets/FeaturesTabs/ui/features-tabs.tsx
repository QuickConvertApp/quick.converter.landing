import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SectionHeading } from "@/shared/ui/section-heading";
import { FeatureCard, featureModel } from "@/entities/feature";

export function FeaturesTabs() {
    const { features } = featureModel;

    return (
        <section id="features" className="container mx-auto px-4 py-20 relative z-10">
            <SectionHeading
                badge="POWERFUL FEATURES"
                title="Why Choose Our Converter?"
                description="Our PDF to EPUB converter is designed with data integrity and compliance as top priorities"
            />

            <Tabs defaultValue="formatting" className="max-w-4xl mx-auto">
                <TabsList className="grid grid-cols-3 mb-8">
                    <TabsTrigger  className="cursor-pointer" value="formatting">Formatting</TabsTrigger>
                    <TabsTrigger className="cursor-pointer" value="integrity">Data Integrity</TabsTrigger>
                    <TabsTrigger className="cursor-pointer" value="compliance">Compliance</TabsTrigger>
                </TabsList>

                {Object.entries(features).map(([key, feature]) => (
                    <TabsContent key={key} value={key}>
                        <FeatureCard
                            title={feature.title}
                            className={'text-slate-50'}
                            description={feature.description}
                            icon={feature.icon}
                            benefits={feature.benefits}
                        />
                    </TabsContent>
                ))}
            </Tabs>
        </section>
    );
}