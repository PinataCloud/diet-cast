import { NextResponse, NextRequest } from "next/server";
import { fdk } from "@/config/fdk"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = body.castMessage;
    console.log(body)

    const res = await fdk.sendCast({
      castAddBody: {
        text: message,
        parentUrl: "https://warpcast.com/~/channel/pinata"
      },
      signerId: body.signerId,
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

