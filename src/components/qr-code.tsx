"use client";
import {Card, CardBody} from "@nextui-org/card";
import React from "react";
import QRCode from "react-qr-code";
import {Input} from "@nextui-org/react";
import CustomButton from "@/components/button";
import {copyToClipboard} from "@/util/clipboard";

type QrCodeProps = {
    slug: string;
}
const copyQRCodeToClipboard = () => {
    // Get the qr-code element (SVG)
    const qrCodeElement = document.getElementById('qr-code');

    if (qrCodeElement) {
        // Create a canvas element and draw the SVG on it
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const svgString = new XMLSerializer().serializeToString(qrCodeElement);
        const img = new Image();

        img.onload = async () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context?.drawImage(img, 0, 0);

            // Convert the canvas to a PNG image
            canvas.toBlob(async (blob) => {
                const item = new ClipboardItem({"image/png": blob || ""});
                await navigator.clipboard.write([item]);
            })
        };

        img.src = 'data:image/svg+xml,' + encodeURIComponent(svgString);
    } else {
        console.error('QR Code element not found.');
    }
};
const QrCode = (props: QrCodeProps) => {
    const [referrer, setReferrer] = React.useState<string>("");
    const [url, setUrl] = React.useState<string>("");
    React.useEffect(() => {
        let finalUrl = window.location.origin + "/" + props.slug;
        if (referrer) {
            finalUrl += "?ref=" + referrer;
        }
        console.log(finalUrl);
        setUrl(finalUrl);
    }, [referrer, url, props.slug])
    return (
        <Card className={"col-span-1 md:col-span-4 m-6"}>
            <CardBody>
                <h1 className="text-2xl font-bold text-center pb-2">QR Code</h1>
                <div className={"self-center mb-4"}>
                    <QRCode id={"qr-code"} value={url}/>
                </div>
                <Input type={"text"} label={"Referrer"} placeholder={"Referrer"} value={referrer}
                       onChange={(e) => {
                           setReferrer(e.target.value);
                       }}
                />
                <div className={"w-full"}>
                    <CustomButton color={"primary"} className={"w-full mt-4"}
                                  onClickLoading={() => {
                                      return new Promise(async (resolve, reject) => {
                                          // get the qr-code element, which is a svg
                                          // and copy the png data to the clipboard
                                          await copyQRCodeToClipboard()
                                          resolve("");
                                      });
                                  }}
                    >
                        Copy QR Code
                    </CustomButton>
                    <CustomButton color={"primary"} className={"w-full mt-4"}
                                  onClickLoading={() => {
                                      return new Promise(async (resolve) => {
                                          await copyToClipboard(url);
                                          resolve(null);
                                      });
                                  }}
                    >
                        Copy URL
                    </CustomButton>
                </div>
            </CardBody>
        </Card>
    );
};

export default QrCode;