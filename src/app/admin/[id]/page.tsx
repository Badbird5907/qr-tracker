import RefsTable from "@/components/admin/refs-table";
import SettingCard from "@/components/admin/setting-card";
import React from "react";
import CustomButton from "@/components/button";
import {FaArrowLeft} from "react-icons/fa";
import Link from "next/link";
import getQrCodesModel from "@/database/qr-codes";
import {ObjectId} from "bson";

export default async function Page({params}: {
    params: {
        id: string;
    }
}) {
    const {id} = params;
    const QrCodeModel = await getQrCodesModel();
    const _data = await QrCodeModel.findOne({
        _id: new ObjectId(id)
    });
    if (!_data) {
        return (
            <span>404 Not Found.</span>
        )
    }
    const data = JSON.parse(JSON.stringify(_data));

    return (
        <>
            <div className={"mt-8"}>
                <Link href={"/admin"}>
                    <CustomButton isIconOnly variant={"faded"} className={"left-0 top-0 absolute ml-2 mt-2"}>
                        <FaArrowLeft/>
                    </CustomButton>
                </Link>
                <h1 className={"text-4xl font-bold text-center"}>QR Code: {data.slug}</h1>
                <div className={"grid grid-cols-1 md:grid-cols-2"}>
                    <div className={"col-span-1"}>
                        <RefsTable id={id as string}/>
                    </div>
                    <div className={"col-span-1"}>

                        <div className={"grid grid-cols-1 md:grid-cols-4"}>
                            <SettingCard title={"Slug"} qrCode={data} fieldName={"slug"}/>
                            <SettingCard title={"Target"} qrCode={data} fieldName={"target"}/>
                            <SettingCard title={"Title"} qrCode={data} fieldName={"title"}/>
                            <SettingCard title={"Description"} qrCode={data} fieldName={"description"}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}