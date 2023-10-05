import {NextApiRequest, NextApiResponse} from "next";
import {getQrCodeById} from "@/prisma/qrcodes";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const data = await getQrCodeById(req.query.id as string);
    res.status(200).json(data);
}