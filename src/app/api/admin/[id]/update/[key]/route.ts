import {NextResponse} from "next/server";
import getQrCodesModel from "@/database/qr-codes";
import {ObjectId} from "bson";

export async function POST(req: Request, {params}: { params: { id: string, key: string } }) {
    const {id, key} = params;
    const body = await req.json();
    const value = body[key];
    const QrCodeModel = await getQrCodesModel();
    const qrCode = await QrCodeModel.findOne({
        _id: new ObjectId(id)
    });
    if (!qrCode) {
        return NextResponse.json({
            success: false,
            message: "No such QR code"
        }, {status: 400})
    }
    qrCode[key] = value;
    await qrCode.save();
    return NextResponse.json({
        success: true,
        message: `Successfully updated ${key}`
    });
}