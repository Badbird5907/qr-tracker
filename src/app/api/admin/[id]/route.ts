import {NextResponse} from "next/server";
import getQrCodesModel from "@/database/qr-codes";
import {ObjectId} from "bson";

export async function GET(req: Request, {params}: { params: { id: string } }) {
    const QrCodeModel = await getQrCodesModel();
    const data = await QrCodeModel.findOne({
        _id: new ObjectId(params.id)
    });
    return NextResponse.json(data, {status: 200});
}