import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "CouncilIA — Council as a Service (CaaS)",
    description: "The official OS for Thought (ACP_OS). Six AI experts debate your idea in 3 adversarial rounds. Powered by the Adversarial Consensus Protocol.",
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