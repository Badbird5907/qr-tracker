import {NextResponse} from "next/server";
import getQrCodesModel from "@/database/qr-codes";
import {ObjectId} from "bson";

export async function DELETE(req: Request, {params}: { params: { id: string } }) {
    const {id} = params;
    if (!id) {
        return NextResponse.json({
            success: false,
            message: "No ID provided"
        }, {status: 400})
    }
    const QrCodeModel = await getQrCodesModel();
    await QrCodeModel.deleteOne({
        _id: new ObjectId(id)
    });
    return NextResponse.json({
        success: true,
        message: "Deleted"
    });
}