import type { Metadata } from "next";
import { Inter, Abril_Fatface, Outfit } from "next/font/google";
import AppShell from "@/components/AppShell";
import Navigation from "@/components/Nav";
import ThemeInit from "@/components/ThemeInit";
import ResourcePopover from "@/components/ResourcePopover";
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
        <ThemeInit />
        <ResourcePopover />
        <AppShell navigation={<Navigation />}>{children}</AppShell>
      </body>
    </html>
  );
}
