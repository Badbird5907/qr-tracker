import {NextApiRequest, NextApiResponse} from "next";
import {getAllQrCodes} from "@/prisma/qrcodes";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const all = await getAllQrCodes();
    res.status(200).json(all);
}