import { NextResponse, NextRequest } from "next/server";
import { fdk } from "@/config/fdk";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  try {
    const token: any = searchParams.get("token");
    const res = await fdk.pollSigner(token);
    console.log(res);
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
