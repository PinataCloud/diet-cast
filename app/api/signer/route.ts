import { NextResponse, NextRequest } from "next/server";
import { PinataFDK } from "pinata-fdk";

const fdk = new PinataFDK({
  pinata_jwt: process.env.PINATA_JWT as string,
  pinata_gateway: "",
  app_fid: "327481",
  app_mnemonic: process.env.FARCASTER_DEVELOPER_MNEMONIC,
});

export async function POST() {
  try {
    const res = await fdk.createSponsoredSigner();
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

