import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { _siteDetails } from "@/lib/config";

const myFont = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: _siteDetails.name,
  description: _siteDetails.desc,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${myFont.className} bg-slate-100 hide-scrollbar`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
