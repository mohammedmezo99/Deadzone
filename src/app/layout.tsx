import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SplashLoader } from "@/components/splash-loader";
import { VisitorTracker } from "@/components/visitor-tracker";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    title: {
        default: "DeadZone HyperOS Engineering",
        template: "%s | DeadZone",
    },
    description: "DeadZone HyperOS Engineering builds a premium ROM experience for Snapdragon and MTK devices, with release metadata, changelogs, checksums, and install guidance.",
    openGraph: {
        title: "DeadZone HyperOS Engineering",
        description: "Premium HyperOS ROM portal for Snapdragon and MTK devices with codename-first release metadata and install guidance.",
        siteName: "DeadZone",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "DeadZone HyperOS Engineering",
        description: "Premium HyperOS ROM portal for Snapdragon and MTK devices.",
    },
    icons: {
        icon: "/icon.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased selection:bg-cyan-400/30`}>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
                    <SplashLoader>
                        <VisitorTracker />
                        <div className="fixed inset-0 bg-mesh -z-10" />
                        {children}
                    </SplashLoader>
                </ThemeProvider>
            </body>
        </html>
    );
}
