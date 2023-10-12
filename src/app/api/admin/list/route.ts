import {NextResponse} from "next/server";
import getQrCodesModel from "@/database/qr-codes";

export async function GET(request: Request) {
    const QrCodeModel = await getQrCodesModel();
    const all = await QrCodeModel.find();
    return NextResponse.json(all, {
        status: 200,
        headers: {
            'Cache-Control': 'public, s-maxage=1',
            'CDN-Cache-Control': 'public, s-maxage=1',
            'Vercel-CDN-Cache-Control': 'public, s-maxage=1',
        }
    })
}