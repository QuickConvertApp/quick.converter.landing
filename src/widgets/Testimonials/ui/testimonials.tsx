import { SectionHeading } from "@/shared/ui/section-heading";
import { TestimonialCard } from "@/entities/testimonial/ui/testimonial-card";
import { testimonialsModel } from "@/entities/testimonial/model";

export function Testimonials() {
    const { testimonials } = testimonialsModel;

    return (
        <section id="testimonials" className="container mx-auto px-4 py-20 relative z-10">
            <SectionHeading
                badge="TESTIMONIALS"
                title="What Our Users Say"
                description="Thousands of users trust our PDF to EPUB converter for reliable, high-quality conversions"
            />

            <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <TestimonialCard
                        key={index}
                        name={testimonial.name}
                        role={testimonial.role}
                        quote={testimonial.quote}
                        avatar={testimonial.avatar}
                    />
                ))}
            </div>
        </section>
    );
}
