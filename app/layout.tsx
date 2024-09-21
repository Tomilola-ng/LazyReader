import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider, SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs';
import "./globals.css";
import { _siteDetails } from "@/lib/config";
import { Providers } from "./providers";

// Import the Inter font with specific weights
const myFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Set the metadata for the page
export const metadata: Metadata = {
  title: _siteDetails.name,
  description: _siteDetails.desc,
};

// Define the RootLayout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${myFont.className} hide-scrollbar`}>
        <ClerkProvider>
          <Providers>{children}</Providers>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </ClerkProvider>
      </body>
    </html>
  );
}

