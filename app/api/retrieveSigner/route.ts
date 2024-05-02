import { NextResponse, NextRequest } from "next/server";
import { createAppClient, viemConnector } from "@farcaster/auth-client";
import { fdk } from "@/config/fdk"
import siteMeta from "@/config/site.config";

const appClient = createAppClient({
  relay: "https://relay.farcaster.xyz",
  ethereum: viemConnector()
});


export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log(body.message)
    const { success, fid, error, isError } = await appClient.verifySignInMessage({
      nonce: body.nonce,
      domain: siteMeta.domain,
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
