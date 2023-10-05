import {NextApiRequest, NextApiResponse} from "next";
import {saveQrCode} from "@/prisma/qrcodes";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        slug,
        title,
        link,
        description
    } = req.body;
    if (!slug || !title || !link || !description) {
        res.status(400).json({
            success: false,
            message: "Missing fields"
        });
        return;
    }
    await saveQrCode({
        slug,
        description,
        target: link,
        title,
    })
    res.status(200).json({
        success: true,
        message: "Created"
    });
}