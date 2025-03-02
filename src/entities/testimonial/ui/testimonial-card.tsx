import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function TestimonialCard({name, role, quote, avatar, className = ""}) {
    return (
        <Card className={`border-slate-700 bg-slate-800/50 hover:border-blue-500/20 transition-all duration-300 ${className}`}>
            <CardContent className="p-6 mt-6">
                <div className="flex flex-col items-center text-center">
                    <Avatar className="w-16 h-16 border-2 border-blue-500 mb-4">
                        <AvatarFallback className="bg-blue-900 text-blue-200 text-xl">
                            {avatar}
                        </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold">{name}</h3>
                    <p className="text-blue-400 text-sm mb-4">{role}</p>
                    <p className="text-slate-300 italic">"{quote}"</p>
                </div>
            </CardContent>
        </Card>
    );
}