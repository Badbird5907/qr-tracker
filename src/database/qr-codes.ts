import {Schema} from "mongoose";
import {QrCode} from "@/types/qr-code";
import dbConnect from "@/database/mongoose";
export const qrCodes = new Schema<QrCode>({
    slug: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    target: {type: String, required: true},
    title: {type: String, required: true},
    createdAt: {type: Date, required: true, default: Date.now},
})




// @ts-ignore
let cached = global.qrCodesModel;
if (!cached) {
    // @ts-ignore
    // eslint-disable-next-line no-multi-assign
    cached = global.qrCodesModel = {model: null, promise: null};
}

export default async function getQrCodesModel() {
    if (cached.model) return cached.model;

    if (!cached.promise) {
        const mongoose = await dbConnect();
        cached.promise = mongoose.model("qrcodes", qrCodes);
    }
    cached.model = await cached.promise;
    return cached.model;
}