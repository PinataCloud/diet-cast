import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";
import { cn } from "@/lib/utils";

const fontCoke = localFont({
  src: './assets/coke.ttf',
  display: 'swap',
  variable: '--font-coke'
})

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Farcaster Lazy Client",
  description: "Farcaster clients made easy thanks to Pinata",
  icons: "/favicon.svg",
  openGraph: {
    images: [
      "https://docs.mypinata.cloud/ipfs/bafybeibj3a47gxdgkjfrfs6b2n3prsjbvk2lx3twp4lfahgcrfddkxukwu?filename=og.png",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable, fontCoke.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
