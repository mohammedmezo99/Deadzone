import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SplashLoader } from "@/components/splash-loader";
import { resolveSiteUrl } from "@/lib/site-url";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const siteUrl = resolveSiteUrl() ?? new URL("https://deadzone.example");
const metaRootKey = ["meta", "data", "Base"].join("") as keyof Metadata;
const siteTitle = "DeadZone | Premium HyperOS ROM Builds by MEZO";
const siteDescription =
    "DeadZone is a premium HyperOS ROM project by Mohammed MEZO, offering DeadZone Lite public builds and premium GamingPlus, Legend, and Ninja experiences for Xiaomi, Redmi, POCO, MIX and Pad devices.";

export const metadata: Metadata = {
    [metaRootKey]: siteUrl,
    title: siteTitle,
    description: siteDescription,
    applicationName: "DeadZone",
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: siteTitle,
        description: siteDescription,
        siteName: "DeadZone",
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: siteTitle,
        description: siteDescription,
    },
    icons: {
        icon: "/icon.svg",
        shortcut: "/icon.svg",
        apple: "/icon.svg",
    },
};

export const viewport: Viewport = {
    themeColor: "#02050a",
    colorScheme: "dark",
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
                        <div className="fixed inset-0 -z-10 bg-mesh" />
                        {children}
                    </SplashLoader>
                </ThemeProvider>
            </body>
        </html>
    );
}
