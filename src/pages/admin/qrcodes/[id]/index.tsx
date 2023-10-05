import React from "react";

import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {getQrCodeById} from "@/prisma/qrcodes";
import RefsTable from "@/components/admin/refs-table";
import SettingCard from "@/components/admin/setting-card";

const IndexPage = (
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
    return (
        <>
            <div className={"mt-8"}>
                <h1 className={"text-4xl font-bold text-center"}>QR Code: {props.data.slug}</h1>
                <div className={"grid grid-cols-1 md:grid-cols-2"}>
                    <div className={"col-span-1"}>
                        <RefsTable id={props.id as string}/>
                    </div>
                    <div className={"col-span-1"}>

                        <div className={"grid grid-cols-1 md:grid-cols-4"}>
                            <SettingCard title={"Slug"} qrCode={props.data} fieldName={"slug"}/>
                            <SettingCard title={"Target"} qrCode={props.data} fieldName={"target"}/>
                            <SettingCard title={"Title"} qrCode={props.data} fieldName={"title"}/>
                            <SettingCard title={"Description"} qrCode={props.data} fieldName={"description"}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default IndexPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {id} = context.params!
    const data = await getQrCodeById(id as string);
    if (!data) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            id,
            data: JSON.parse(JSON.stringify(data))
        },
    };
}
