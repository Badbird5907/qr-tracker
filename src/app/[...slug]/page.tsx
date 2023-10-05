import {getQrCode} from "@/prisma/qrcodes";
import {ObjectId} from "bson";
import getClicksModel from "@/metrics/clicks";
import {headers} from "next/headers";
import {redirect, useRouter, useSearchParams} from "next/navigation";

export default async function Page(ctx: {
    params: {
        slug: string;
    },
    searchParams: {
        ref: string;
    }
}) {
    const { slug } = ctx.params;
    const { ref } = ctx.searchParams;
    const slugStr = Array.isArray(slug) ? slug[0] : undefined;
    if (!slugStr) {
        return (
            <span>404 Not Found.</span>
        )
    }
    const data = await getQrCode(slugStr as string);
    if (!data) {
        return (
            <span>404 Not Found.</span>
        )
    }
    const headersList = headers();
    const idString = data.id.toString();
    const objectId = new ObjectId(idString);
    const ClicksModel = await getClicksModel();
    const click = new ClicksModel({
        timestamp: new Date(),
        meta: {
            qrCodeId: objectId,
            ref: ref,
            userAgent: headersList.get("user-agent"),
        }
    });
    await click.save();
    redirect(data.target)
    return {

    }
}