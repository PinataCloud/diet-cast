import {  NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const feed = await cronFeed("https://warpcast.com/~/channel/pinata", 50);
    return NextResponse.json(feed) 
  } catch (error) {
   console.log(error)
    return NextResponse.json(error)
  }
}

async function cronFeed(channel: any, pageSize: any) {
  try {
    const result = await fetch(
      `https://api.pinata.cloud/v3/farcaster/casts?channel=${channel}&pageSize=${pageSize}&topLevel=true&reverse=true`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
        },
      },
    );
    if (!result.ok) {
      throw new Error("failed to fetch data");
    }
    const resultData = await result.json();
    return resultData;
  } catch (error) {
    console.log(error);
    return error;
  }
}
