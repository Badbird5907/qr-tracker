import {NextResponse} from "next/server";
import getQrCodesModel from "@/database/qr-codes";

export const fetchCache = 'force-no-store';
export const revalidate = 0;
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
    const QrCodeModel = await getQrCodesModel();
    const all = await QrCodeModel.find();
    return NextResponse.json({all, timestamp: Date.now()}, {
        status: 200,
        headers: {
            "Cache-Control": "no-cache"
        }
    })
}
