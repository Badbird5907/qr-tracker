import {NextApiRequest, NextApiResponse} from "next";
import {withMethods} from "@/util/server";
import {deleteQrCode} from "@/prisma/qrcodes";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const {id} = req.query;
    if (!id) {
        res.status(400).json({
            success: false,
            message: "No ID provided"
        });
        return;
    }
    await deleteQrCode(id as string);
    res.status(200).json({
        success: true,
        message: "Deleted"
    });
}
export default withMethods(handler, "DELETE")