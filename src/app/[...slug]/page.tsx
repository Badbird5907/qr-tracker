import {ObjectId} from "bson";
import getClicksModel from "@/database/clicks";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import getQrCodesModel from "@/database/qr-codes";

export default async function Page(ctx: {
    params: {
        slug: string;
    },
    searchParams: {
        ref: string;
    }
}) {
    const {slug} = ctx.params;
    const {ref} = ctx.searchParams;
    const refStr = ref && ref.length < 100 ? ref : undefined;
    let slugStr = Array.isArray(slug) ? slug[0] : undefined;
    slugStr = slugStr.toLowerCase();
    if (!slugStr) {
        return (
            <span>404 Not Found.</span>
        )
    }
    const QrCodeModel = await getQrCodesModel();
    const data = await QrCodeModel.findOne({
        slug: slugStr
    });
    if (!data) {
        return (
            <span>404 Not Found.</span>
        )
    }
    const headersList = headers();
    const idString = data._id.toString();
    const objectId = new ObjectId(idString);
    const ClicksModel = await getClicksModel();
    const click = new ClicksModel({
        timestamp: new Date(),
        meta: {
            qrCodeId: objectId,
            ref: refStr,
            userAgent: headersList.get("user-agent"),
        }
    });
    await click.save();
    redirect(data.target)
    return {}
}