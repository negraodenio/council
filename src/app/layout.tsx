import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter, Public_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const publicSans = Public_Sans({ subsets: ["latin"], variable: "--font-public-sans" });

export const metadata: Metadata = {
    title: "CouncilIA — Council as a Service",
    description: "Six AI experts debate your idea in 3 adversarial rounds. A seventh judges. Powered by the ACE Engine. In any language.",
    metadataBase: new URL("https://www.councilia.com"),
    openGraph: {
        title: "CouncilIA — One AI agrees with you. Six won't.",
        description: "Submit any decision. 6 AI experts with opposing perspectives debate it. A 7th arbitrates. Council as a Service.",
        url: "https://www.councilia.com",
        siteName: "CouncilIA",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "CouncilIA — One AI agrees with you. Six won't.",
        description: "6 AI experts debate your idea in 3 rounds. A 7th judges. Try it free.",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" />
            </head>
            <body className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} ${inter.variable} ${publicSans.variable} font-body bg-deep-blue text-slate-100 selection:bg-neon-lime selection:text-black`}>{children}</body>
        </html>
    );
}