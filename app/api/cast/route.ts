import { NextResponse, NextRequest } from "next/server";
import { fdk } from "@/config/fdk"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    let castBody: any = {}
    if(body.fileLink){
      castBody.text = body.castMessage
      castBody.embeds = [{ url: body.fileLink }]
      castBody.parentUrl = "https://warpcast.com/~/channel/diet-coke"
    } else {
      castBody.text = body.castMessage
      castBody.parentUrl = "https://warpcast.com/~/channel/diet-coke"
    }

    const res = await fdk.sendCast({
      castAddBody: castBody,
      signerId: body.signerId
    });

    if (!res.hash) {
      return NextResponse.json(
        { Error: "Failed to send cast" },
        { status: 500 },
      );
    } else {
      const hash = res.hash
      return NextResponse.json({ hash }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

