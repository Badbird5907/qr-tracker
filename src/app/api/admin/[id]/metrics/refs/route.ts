import getClicksModel from "@/metrics/clicks";
import {ObjectId} from "bson";
import {NextResponse} from "next/server";

export async function GET(req: Request, {params}: { params: { id: string } }) {
    const ClicksModel = await getClicksModel(); // time series model
    const {id} = params;
    const limitNum = 10;
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
    return NextResponse.json(refs, {status: 200});
}