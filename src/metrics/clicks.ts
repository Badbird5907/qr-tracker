import {Schema} from "mongoose";
import {Click} from "@/types/click";
import dbConnect from "@/metrics/mongoose";


export const clicksSchema = new Schema<Click>(
    {
        timestamp: { type: Date, required: true },
        meta: { type: Schema.Types.Mixed, required: true },
    },
    {
        timeseries: {
            timeField: "timestamp",
            granularity: "minutes",
            metaField: "meta",
        },
    }
)


// @ts-ignore
let cached = global.clicksModel;
if (!cached) {
    // @ts-ignore
    // eslint-disable-next-line no-multi-assign
    cached = global.clicksModel = { model: null, promise: null };
}
export default async function getClicksModel() {
    if (cached.model) return cached.model;

    if (!cached.promise) {
        const mongoose = await dbConnect();
        cached.promise = mongoose.model("clicks", clicksSchema);
    }
    cached.model = await cached.promise;
    return cached.model;
}
