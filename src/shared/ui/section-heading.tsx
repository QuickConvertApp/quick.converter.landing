import { Badge } from "@/components/ui/badge";

export function SectionHeading({badge, title, description, className = ""}) {
    return (
        <div className={`text-center mb-16 ${className}`}>
            {badge && (
                <Badge variant="outline" className="mb-4   font-medium">
                    {badge}
                </Badge>
            )}
            <h2 className="text-3xl md:text-5xl font-bold mb-6">{title}</h2>
            {description && (
                <p className="text-slate-300 max-w-2xl mx-auto text-lg">
                    {description}
                </p>
            )}
        </div>
    );
}