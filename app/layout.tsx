import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "/pinata Feed",
  description: "A feed of casts from the /pinata channel on Farcaster",
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
          fontSans.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
