import {NextResponse} from "next/server";
import getQrCodesModel from "@/database/qr-codes";

export async function POST(req: Request) {
    const body = await req.json();
    let {
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
    slug = slug.toLowerCase();
    const QrCodeModel = await getQrCodesModel();
    const existing = await QrCodeModel.findOne({
        slug
    });
    if (existing) {
        return NextResponse.json({
            success: false,
            message: "Slug already exists"
        }, {status: 400});
    }
    const data = new QrCodeModel({
        slug,
        description,
        target: link,
        title,
    });
    await data.save();
    return NextResponse.json({
        success: true,
        message: "Created"
    }, {status: 200});
}