import {NextApiRequest, NextApiResponse} from "next";
import getClicksModel from "@/metrics/clicks";
import {ObjectId} from "bson";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const ClicksModel = await getClicksModel(); // time series model
    const {id, limit} = req.query;
    // find the top 10 refs.
    const limitNum = parseInt(limit as string) || 10;
    const refs = await ClicksModel.aggregate([
        {
            $match: {
                "meta.qrCodeId": new ObjectId(id as string)
            },
        },
        {
            $group: {
                _id: "$meta.ref",
                count: {$sum: 1}
            }
        },
        {
            $sort: {
                count: -1
            }
        },
        {
            $limit: limitNum
        },
        {
            $project: {
                _id: 0,
                ref: "$_id",
                count: 1
            }
        },
    ]);
    res.status(200).json(refs);
}