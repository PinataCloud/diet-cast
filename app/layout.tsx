import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { fdk } from "@/config/fdk";

const fontCoke = localFont({
  src: "./assets/coke.ttf",
  display: "swap",
  variable: "--font-coke",
});

const fontDiet = localFont({
  src: "./assets/lokicola.ttf",
  display: "swap",
  variable: "--font-diet",
});

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const frameData = fdk.getFrameMetadata({
  cid: "QmYZArEWBaAosWP1XRAB1zLK1kK7zScia4rHbv62xKs3zo",
  buttons: [
    { label: 'Visit', action: 'link', target: 'https://dietcast.xyz' },
    { label: 'Tutorial', action: 'link', target: 'https://pinata.cloud/blog' },
    { label: 'Repo', action: 'link', target: 'https://github.com/PinataCloud/diet-cast' },
  ]
})

export const metadata: Metadata = {
  title: "Diet Cast",
  description: "The only client more lite than /diet-coke",
  openGraph: {
    title: "Diet Cast",
    description: "The only client more lite than /diet-coke",
    url: "https://dietcast.xyz",
    siteName: "Diet Cast",
    images: [
      "https://docs.mypinata.cloud/ipfs/QmYZArEWBaAosWP1XRAB1zLK1kK7zScia4rHbv62xKs3zo?filename=og.png",
    ],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diet Cast",
    description: "The only client more lite than /diet-coke",
    images: [
      "https://docs.mypinata.cloud/ipfs/QmYZArEWBaAosWP1XRAB1zLK1kK7zScia4rHbv62xKs3zo?filename=og.png",
    ],
  },
  other: { frameData }
  /* other: {
    "fc:frame": "vNext",
    "fc:frame:image":
      "https://docs.mypinata.cloud/ipfs/QmYZArEWBaAosWP1XRAB1zLK1kK7zScia4rHbv62xKs3zo?filename=og.png",
    "fc:frame:button:1": "Visit",
    "fc:frame:button:1:action": "link",
    "fc:frame:button:1:target": "https://dietcast.xyz",
    "fc:frame:button:2": "Tutorial",
    "fc:frame:button:2:action": "link",
    "fc:frame:button:2:target": "https://pinata.cloud/blog",
    "fc:frame:button:3": "Repo",
    "fc:frame:button:3:action": "link",
    "fc:frame:button:3:target": "https://github.com/PinataCloud/diet-cast",
  }, */
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
          fontCoke.variable,
          fontDiet.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
