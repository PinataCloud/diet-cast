import { NextResponse, NextRequest } from "next/server";
import { PinataFDK } from "pinata-fdk";

const fdk = new PinataFDK({
  pinata_jwt: process.env.PINATA_JWT as string,
  pinata_gateway: "",
  app_fid: "327481",
  app_mnemonic: process.env.FARCASTER_DEVELOPER_MNEMONIC
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  try {
    const token: any = searchParams.get("token");
    const res = await fdk.pollSigner(token);
    console.log(res)
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
