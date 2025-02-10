import getQrCodesModel from "@/database/qr-codes";
import {NextResponse} from "next/server";

export const fetchCache = 'force-no-store';
export const revalidate = 0;
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  // get ?slug=xxx
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug")?.toLowerCase();
  if (!slug) {
    return NextResponse.json({
      message: "slug is required",
    }, {status: 400});
  }
  const QrCodeModel = await getQrCodesModel();
  const qrCode = await QrCodeModel.findOne({slug});
  if (!qrCode) {
    return NextResponse.json({
      message: "qr code not found",
    }, {status: 404});
  }
  return NextResponse.json({
    message: "ok",
  });
}
