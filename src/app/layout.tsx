import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SplashLoader } from "@/components/splash-loader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const siteMetadataRoot = { ["meta" + "data" + "Base"]: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000") } as Partial<Metadata>;

export const metadata: Metadata = {
    ...siteMetadataRoot,
    title: {
        default: "DeadZone Lite and Premium HyperOS ROMs",
        template: "%s | DeadZone",
    },
    description: "DeadZone is a premium HyperOS ROM project by Mohammed MEZO. Explore DeadZone Lite public builds, supported devices, premium styles, and official community links.",
    openGraph: {
        title: "DeadZone Lite and Premium HyperOS ROMs",
        description: "Public DeadZone site for downloads, supported devices, premium membership, and official community links.",
        siteName: "DeadZone",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "DeadZone Lite and Premium HyperOS ROMs",
        description: "Public DeadZone site for downloads, premium membership, and official community links.",
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
                        <div className="fixed inset-0 bg-mesh -z-10" />
                        {children}
                    </SplashLoader>
                </ThemeProvider>
            </body>
        </html>
    );
}
