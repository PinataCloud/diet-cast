import { Feed } from "@/components/feed";
import "./globals.css";
import { Separator } from "@/components/ui/separator";
import "@farcaster/auth-kit/styles.css";
import { Auth } from "@/components/auth";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-12 mt-12">
      <Auth />
      <Separator className="sm:w-[500px] w-sm" />
      <Feed />
    </main>
  );
}
