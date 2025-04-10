import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/auth-context";
import { ShopProvider } from "@/contexts/shop-context";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "GUANG ZHOU NI LUO SHANG MAO YOU XIAN GONG SI Store",
  description: "GUANG ZHOU NI LUO SHANG MAO YOU XIAN GONG SI Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ShopProvider>
          <AuthProvider>
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
            <Toaster />
          </AuthProvider>
        </ShopProvider>
      </body>
    </html>
  );
}
