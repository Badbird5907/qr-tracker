import React from "react";

import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {getQrCode} from "@/prisma/qrcodes";
import {ObjectId} from "bson";
import {Click} from "@/types/click";
import getClicksModel from "@/metrics/clicks";
const SlugPage = (
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
    return (
        <>
            <h1 className={"text-4xl font-bold text-center"}>404 Not Found</h1>
        </>
    );
};

export default SlugPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {slug} = context.params!;
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
    return {
        props: {},
    };
}
