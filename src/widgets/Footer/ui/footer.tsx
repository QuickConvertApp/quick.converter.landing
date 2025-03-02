import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { footerModel } from "../model";

export function Footer() {
    const { footerLinks, socialLinks, currentYear } = footerModel();

    return (
        <footer className="container mx-auto px-4 py-12 border-t border-slate-800 relative z-10">
            <div className="grid md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <img src="/logo.svg" alt="" width="52"  />
                    </div>
                    <p className="text-slate-400 text-sm">
                        Transform your PDFs to EPUB with perfect precision. Data integrity guaranteed.
                    </p>
                </div>

                {Object.entries(footerLinks).map(([category, links]) => (
                    <div key={category}>
                        <h3 className="font-bold mb-4 capitalize">{category}</h3>
                        <ul className="space-y-2 text-sm text-slate-400">
                            {links.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="hover:text-blue-400">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <Separator className="my-8 bg-slate-800" />

            <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm text-slate-500">© {currentYear} PDFtoEPUB. All rights reserved.</p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    {socialLinks.map((link) => {
                        const IconComponent = link.icon;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-slate-400 hover:text-blue-400"
                                aria-label={link.name}
                            >
                                <IconComponent size={20} />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </footer>
    );
}