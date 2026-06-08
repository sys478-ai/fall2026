import type { Metadata } from "next";
// import TopicNav from "@/components/TopicNav";
// import topics from "@/lib/topics";
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
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme'),d=window.matchMedia('(prefers-color-scheme:dark)').matches,s=t==='dark'||(!t&&d),h=document.documentElement;if(s){h.classList.add('dark');h.style.colorScheme='dark';}else{h.classList.remove('dark');h.style.colorScheme='light';}}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${inter.className} ${abril.variable} ${outfit.variable}`}>
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
