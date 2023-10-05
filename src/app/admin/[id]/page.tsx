import RefsTable from "@/components/admin/refs-table";
import SettingCard from "@/components/admin/setting-card";
import React from "react";
import {getQrCodeById} from "@/prisma/qrcodes";
import CustomButton from "@/components/button";
import {FaArrowLeft} from "react-icons/fa";
import Link from "next/link";

export default async function Page({params}: {
    params: {
        id: string;
    }
}) {
    const {id} = params;
    const data = await getQrCodeById(id as string);
    if (!data) {
        return (
            <span>404 Not Found.</span>
        )
    }

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