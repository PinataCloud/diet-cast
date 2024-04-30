import { Feed } from "@/components/feed";
import "./globals.css";
import { Separator } from "@/components/ui/separator";
import "@farcaster/auth-kit/styles.css";
import { Auth } from "@/components/auth";
import Image from "next/image"

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-12 mt-12">
      <div className="flex flex-col items-end -mb-10">
        <h1 className="font-coke text-5xl -mb-5 text-[#F40202]">diet</h1>
        <h1 className="font-coke text-8xl text-[#F40202]">Cast</h1>
        <p className="font-diet text-9xl text-[#F40202] -mt-14">5</p>
      </div>
      <Auth />
      <Separator className="sm:w-[500px] w-sm" />
      <Feed />
        <Image src="https://dweb.mypinata.cloud/ipfs/QmRnrZHMHacn4ctBx67JkHpwL2i5Xc9335mJoVVdimnfjj" width={150} height={100} alt="logo" />
    </main>
  );
}
