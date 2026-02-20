import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    );
}