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

const fontDiet = localFont({
  src: './assets/lokicola.ttf',
  display: 'swap',
  variable: '--font-diet'
})


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Diet Cast",
  description: "The only client more lite than /diet-coke",
  icons: "/favicon.png",
  openGraph: {
    images: [
      "https://docs.mypinata.cloud/ipfs/QmYZArEWBaAosWP1XRAB1zLK1kK7zScia4rHbv62xKs3zo?filename=og.png",
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
          fontSans.variable, fontCoke.variable, fontDiet.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
