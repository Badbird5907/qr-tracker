import { Types } from "mongoose";
import {ObjectId} from "bson";

export interface Click {
    _id: Types.ObjectId;
    timestamp: Date;
    meta: {
        qrCode: ObjectId;
        ref: string | undefined;
        userAgent: string;
    }
}