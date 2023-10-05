import { NextApiRequest, NextApiResponse } from "next";
import {getVersionString} from "@/util/server/info";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const ver = await getVersionString();
    res.status(200).json({
        versionString: ver.version,
        commitUrl: ver.url,
    });
}