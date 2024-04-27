import { NextResponse, NextRequest } from "next/server";
import { PinataFDK } from "pinata-fdk";
import { createAppClient, viemConnector } from "@farcaster/auth-client";

const appClient = createAppClient({
  relay: "https://relay.farcaster.xyz",
  ethereum: viemConnector()
});

const fdk = new PinataFDK({
  pinata_jwt: process.env.PINATA_JWT as string,
  pinata_gateway: "",
  app_fid: "327481",
  app_mnemonic: process.env.FARCASTER_DEVELOPER_MNEMONIC,
});


export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log(body.message)
    const { success, fid, error, isError } = await appClient.verifySignInMessage({
      nonce: "photosigner",
      domain: "photocaster.xyz",
      message: body.message,
      signature: body.signature,
    });

    if(isError){
      console.log(error)
      return NextResponse.json(error);
    }

    if (success) {
      const res = await fdk.getSigners(fid);
      console.log(res);
      return NextResponse.json(res);
    } else {
      return NextResponse.json("Error verifying signature");
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
