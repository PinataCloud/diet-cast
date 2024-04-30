import { unfurl } from "unfurl.js";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import { AvatarImage, Avatar, AvatarFallback } from "./ui/avatar";

interface EmbedObject {
  url?: string;
  castId?: {
    fid: number;
    hash: string;
  };
}

async function fetchData(url: any) {
  let content;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return;
    }
    const contentType = res.headers.get("content-type");
    if (contentType?.includes("text/html")) {
      const res = await unfurl(url);
      content = "website";
      return { res, content };
    } else if (contentType?.includes("image")) {
      content = "image";
      return { url, content };
    } else {
      content = "null";
      return { url, content };
    }
  } catch (error) {
    console.log("problem with url:", url);
    console.log(error);
  }
}
export async function Embed({ embedObject }: { embedObject: EmbedObject }) {
  if (embedObject.url) {
    const result: any = await fetchData(embedObject.url);
    if (!result) {
      return null;
    }
    if (result.content === "website") {
      const data = result.res;
      return (
        <div className="flex flex-col rounded-lg border sm:w-[450px] w-[290px]">
          <Link href={embedObject.url} target="_blank">
            <AspectRatio ratio={16 / 9}>
              <Image
                src={
                  (data?.open_graph.images && data.open_graph.images[0].url) ||
                  "/photo.svg"
                }
                width={400}
                height={200}
                alt="Image"
                className="object-cover rounded-tr rounded-tl w-full max-h-[250px]"
              />
            </AspectRatio>
            <div className="flex flex-col px-2 pb-2 gap-1">
              <p className="font-bold truncate">{data?.title}</p>
              <p className="text-xs truncate">{data?.description}</p>
              <p className="text-xs truncate">
                {data?.open_graph.url || embedObject.url}
              </p>
            </div>
          </Link>
        </div>
      );
    } else if (result.content === "image") {
      return (
        <Image
          unoptimized
          src={embedObject.url}
          className="rounded-lg w-full"
          alt="Image"
          width={600}
          height={200}
        />
      );
    }
  } else {
    const castReq = await fetch(
      `https://api.pinata.cloud/v3/farcaster/casts/${embedObject.castId?.hash}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
        },
      },
    );
    const castData = await castReq.json();
    const cast = castData.data;
    console.log(cast);

    return (
      <Link href={`https://warpcast.com/${cast.author.username}/${cast.hash}`} target="_blank">
        <div
          className="flex gap-2 text-sm sm:text-md sm:w-[450px] w-[290px] p-2 flex-row items-start border rounded-lg"
          key={cast.hash}
        >
          <Avatar className="h-6 w-6">
            <AvatarImage src={cast.author.pfp_url} />
            <AvatarFallback>FC</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start w-full">
            <div className="flex gap-2">
              <p className="font-bold">{cast.author.display_name}</p>
              <p className="text-gray-600">@{cast.author.username}</p>
            </div>
            <p className="pb-2">{cast.content.replace(/https?:\/\/\S+/i, "")}</p>
          </div>
        </div>
      </Link>
    );
  }
}
