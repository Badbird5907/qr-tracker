import {Types} from "mongoose";

export type QrCode = {
    _id: Types.ObjectId;
    slug: string;
    description: string;
    target: string;
    title: string;
    createdAt: Date;
}