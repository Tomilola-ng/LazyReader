import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { _siteDetails } from "@/lib/config";
import { Providers } from "./providers";

const myFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${myFont.className} hide-scrollbar`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
