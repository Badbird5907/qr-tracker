import {NextResponse} from "next/server";
import {deleteQrCode} from "@/prisma/qrcodes";

export async function DELETE(req: Request, {params}: { params: { id: string } }) {
    const {id} = params;
    if (!id) {
        return NextResponse.json({
            success: false,
            message: "No ID provided"
        }, {status: 400})
    }
    await deleteQrCode(id);
    return NextResponse.json({
        success: true,
        message: "Deleted"
    });
}