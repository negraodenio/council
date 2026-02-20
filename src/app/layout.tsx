import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "CouncilIA — Six AI Experts Debate Your Idea",
    description: "Submit any idea. Six AI experts with opposing perspectives debate it in 3 adversarial rounds. A seventh arbitrates and delivers a reasoned verdict.",
    metadataBase: new URL("https://www.councilia.com"),
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