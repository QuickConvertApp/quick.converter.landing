import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileUploader } from "@/features/fileUpload";

export function Hero() {
    return (
        <section className="container mx-auto px-4 pt-36 pb-24 md:pt-44 md:pb-32 relative z-10">
            <div className="max-w-3xl mx-auto text-center relative">
                <Badge variant="outline" className="px-4 py-1 mb-8 bg-gradient-to-r from-blue-900/60 to-blue-800/60 text-blue-300 border-blue-700/50 font-medium animate-pulse">
                    Reliable Data Transfer • Integrity • Compliance
                </Badge>

                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    Transform PDFs to EPUBs with{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 relative">
            Perfect Precision
            <svg className="absolute -bottom-2 left-0 w-full h-2 text-blue-400 opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0,0 C25,5 75,5 100,0 L100,10 L0,10 Z" fill="currentColor"></path>
            </svg>
          </span>
                </h1>

                <p className="text-lg md:text-xl text-slate-300 mb-10 md:leading-relaxed max-w-2xl mx-auto">
                    Our advanced conversion technology preserves formatting, images, and data integrity. Convert your documents with confidence for superior readability on any device.
                </p>

                <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16">
                    <Button size="lg" className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all hover:-translate-y-1 text-lg py-6">
                        Start Converting Now
                    </Button>
                    <Button size="lg" variant="outline" className="cursor-pointer border-white/20 text-lg py-6 group flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 group-hover:animate-pulse text-blue-400">
                            <circle cx="12" cy="12" r="10" />
                            <polygon points="10 8 16 12 10 16 10 8" />
                        </svg>
                        See How It Works
                    </Button>
                </div>

                {/* File upload demo area */}
                {/*<FileUploader />*/}
            </div>
        </section>
    );
}