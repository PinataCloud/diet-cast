import { NextResponse, NextRequest } from "next/server";
import { PinataFDK, CastResponse } from "pinata-fdk";

const fdk = new PinataFDK({
  pinata_jwt: process.env.PINATA_JWT as string,
  pinata_gateway: "",
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = body.castMessage;
    console.log(body)

    const res: CastResponse = await fdk.sendCast({
      castAddBody: {
        text: message,
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

