import { Feed } from "@/components/feed";
import "./globals.css";
import { Separator } from "@/components/ui/separator";
import "@farcaster/auth-kit/styles.css";
import { Auth } from "@/components/auth";
import Image from "next/image"
import siteMeta from "@/config/site.config";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-12 mt-12">
      <Image src={siteMeta.logo} alt="logo" className="" width={350} height={350} />
      <Auth />
      <Separator className="sm:w-[500px] w-sm" />
      <Feed />
        <Image src="https://dweb.mypinata.cloud/ipfs/QmRnrZHMHacn4ctBx67JkHpwL2i5Xc9335mJoVVdimnfjj" width={150} height={100} alt="logo" />
    </main>
  );
}
