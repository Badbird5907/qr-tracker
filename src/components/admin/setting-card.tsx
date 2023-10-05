"use client";

import {QrCodes} from ".prisma/client";
import React, {HTMLInputTypeAttribute} from "react";
import {Card, CardBody} from "@nextui-org/card";
import {Input} from "@nextui-org/react";
import CustomButton from "@/components/button";
import axios from "axios";

const SettingCard = ({title, qrCode, fieldName, callback = null, inputType = "text"}: {
    title: string,
    qrCode: QrCodes,
    fieldName: string,
    callback?: ((result: any) => void) | null,
    inputType?: HTMLInputTypeAttribute | undefined
}) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    return (
        <Card className="col-span-2 m-6 md:mr-3 sm:mb-3 h-fit">
            <CardBody>
                <h1 className="text-2xl font-bold text-center pb-2">{title}</h1>
                <Input type={inputType} label={title} placeholder={(qrCode as any)[fieldName]}
                       defaultValue={(qrCode as any)[fieldName].toString()} ref={inputRef}/>
                <CustomButton color={"primary"} className={"w-full mt-4"} onClickLoading={() => {
                    let newField: any = inputRef.current?.value;
                    if (inputType === "number") {
                        newField = parseInt(newField);
                    }
                    return axios.post(`/api/admin/${qrCode.id}/update/${fieldName}`, {
                        [fieldName]: newField,
                    }).then(() => {
                        if (callback) {
                            callback(newField);
                        }
                    });
                }}>Save</CustomButton>
            </CardBody>
        </Card>
    );
}
export default SettingCard;