"use client";

import {Card, CardBody} from "@nextui-org/card";
import CustomButton from "@/components/button";
import {FaGithub, FaTwitter} from "react-icons/fa";
import {Divider} from "@nextui-org/react";
import LoginButton from "@/components/login-button";

const LoginCard = () => {
    return (
        <>
            <Card>
                <CardBody className="font-bold">
                    <h1 className={
                        "text-4xl flex justify-center"
                    }>QRTracker</h1>
                    <span className={"text-2xl pt-2"}>A project to scan scans of QR codes.</span>
                    <span className={"text-2xl text-center"}>Follow my:</span>
                    <div className={"flex justify-between items-center mt-4 gap-2"}>
                        <a href={"https://github.com/Badbird5907"} target={"_blank"} className={"w-full"}>
                            <CustomButton href={"https://github.com/Badbird5907"} variant={"faded"}
                                          className={"text-white w-full"}><FaGithub/> GitHub</CustomButton>
                        </a>
                        <a href={"https://twitter.com/Badbird_5907"} target={"_blank"} className={"w-full"}>
                            <CustomButton href={"https://twitter.com/Badbird_5907"}
                                          className={"w-full"}><FaTwitter/> Twitter</CustomButton>
                        </a>
                    </div>
                    <Divider className={"my-4"}/>
                    <LoginButton/>
                </CardBody>
            </Card>
        </>
    );
};

export default LoginCard;