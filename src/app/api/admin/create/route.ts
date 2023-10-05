import {saveQrCode} from "@/prisma/qrcodes";
import {NextResponse} from "next/server";

export async function GET(req: Request) {
    const body = await req.json();
    const {
        slug,
        title,
        link,
        description
    } = body;
    if (!slug || !title || !link || !description) {
        return NextResponse.json({
            success: false,
            message: "Missing fields"
        }, {status: 400});
    }
    await saveQrCode({
        slug,
        description,
        target: link,
        title,
    })
    return NextResponse.json({
        success: true,
        message: "Created"
    }, {status: 200});
}