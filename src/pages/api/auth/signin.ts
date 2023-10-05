import {NextApiRequest, NextApiResponse} from "next";
import {ensureType, withMethods} from "@/util/server";
import {verifyToken} from "@/util/auth-server";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = req.body.password;
    if (!ensureType(token, "string", res)) return;
    const valid = verifyToken(token);
    if (!valid) {
        res.status(403).json({
            success: false,
            message: "Invalid token"
        });
        return;
    }
    // set it as a cookie
    res.setHeader("Set-Cookie", `qrTrackerToken=${token}; Path=/; HttpOnly; SameSite=Strict;`);
    res
        .status(200).json({
        success: true,
        message: "Valid token"
    });
}
export default withMethods(handler, "POST")