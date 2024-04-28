import { NextResponse, NextRequest } from "next/server";
import { fdk } from "@/config/fdk";

export async function POST() {
  try {
    const res = await fdk.createSponsoredSigner();
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
