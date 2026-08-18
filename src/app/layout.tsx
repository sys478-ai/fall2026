import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Abril_Fatface, Outfit } from "next/font/google";
import Navigation from "@/components/Nav";
import LayoutWrapper from "@/components/LayoutWrapper";
import ConditionalFooter from "@/components/ConditionalFooter";
import { getCourseConfig } from "@/lib/config";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const abril = Abril_Fatface({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-abril"
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit"
});

const courseConfig = getCourseConfig();

export const metadata: Metadata = {
  title: courseConfig.title,
  description: courseConfig.description,
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noimageindex: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />
      </head>
      <body className={`${inter.className} ${abril.variable} ${outfit.variable}`}>
        <Script src="/theme-init.js" strategy="beforeInteractive" />
        <div className="min-h-screen md:flex">
          <Navigation />
          <div className="min-w-0 flex-1">
            <LayoutWrapper>
              <main>
                {children}
              </main>
            </LayoutWrapper>
            <ConditionalFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
