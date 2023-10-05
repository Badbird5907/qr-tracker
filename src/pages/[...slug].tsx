import React from "react";

import {GetServerSidePropsContext} from "next";
import {getQrCode} from "@/prisma/qrcodes";
import {ObjectId} from "bson";
import getClicksModel from "@/metrics/clicks";

const SlugPage = () => {
    return (
        <>
            <h1 className={"text-4xl font-bold text-center"}>404 Not Found</h1>
        </>
    );
};

export default SlugPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {slug} = context.params!;
    if (slug?.length === 1) {
        const data = await getQrCode(slug[0] as string);
        if (data) {
            const idString = data.id.toString();
            const objectId = new ObjectId(idString);
            const ClicksModel = await getClicksModel();
            const click = new ClicksModel({
                timestamp: new Date(),
                meta: {
                    qrCodeId: objectId,
                    ref: context.query.ref,
                    userAgent: context.req.headers["user-agent"],
                }
            });
            await click.save();
            return {
                redirect: {
                    destination: data.target,
                },
                props: {},
            }
        }
    }
    return {
        props: {},
    };
}
