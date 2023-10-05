import {NextApiRequest, NextApiResponse} from "next";
import {withMethods} from "@/util/server/server";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    res.setHeader(
        "Set-Cookie",
        `qrTrackerToken=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
    )
    res
        .status(200).json({
        success: true,
        message: "Done"
    });
}

export default withMethods(handler, "GET")