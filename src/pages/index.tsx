import CustomButton from "@/components/button";
import {FaGithub, FaTwitter} from "react-icons/fa";
import {Card, CardBody} from "@nextui-org/card";
import {GetServerSidePropsContext} from "next";
import {useDynamicModal} from "@/components/dynamic-modal";
import {Divider, Input} from "@nextui-org/react";
import axios from "axios";
import {verifyToken} from "@/util/auth-server";

export default function Home() {
    const {showModal, closeModal} = useDynamicModal();
    return (
        <div className="flex h-screen items-center justify-center">
            <Card>
                <CardBody className="font-bold">
                    <h1 className={
                        "text-4xl flex justify-center"
                    }>QR-Tracker</h1>
                    <span className={"text-2xl pt-2"}>A project to scan scans of QR codes.</span>
                    <span className={"text-2xl text-center"}>Follow my:</span>
                    <div className={"flex justify-between items-center mt-4 gap-2"}>
                        <a href={"https://github.com/Badbird5907"} target={"_blank"} className={"w-full"}>
                            <CustomButton href={"https://github.com/Badbird5907"} variant={"faded"}
                                          className={"text-white w-full"}><FaGithub/> GitHub</CustomButton>
                        </a>
                        <a href={"https://twitter.com/Badbird5907"} target={"_blank"} className={"w-full"}>
                            <CustomButton href={"https://twitter.com/Badbird5907"}
                                          className={"w-full"}><FaTwitter/> Twitter</CustomButton>
                        </a>
                    </div>
                    <Divider className={"my-4"}/>
                    <CustomButton className={"w-full"} onClickLoading={() => {
                        return new Promise((resolve, reject) => {
                            showModal({
                                title: "Sign In",
                                body: <div className={"flex flex-col gap-2"}>
                                    <Input id={"password-input"} type={"password"} placeholder={"Password"}/>
                                </div>,
                                footer: (
                                    <>
                                        <CustomButton color={"danger"} onPress={() => {
                                            closeModal();
                                            reject();
                                        }}>Cancel</CustomButton>
                                        <CustomButton onClickLoading={async () => {
                                            const password = (document.getElementById("password-input") as HTMLInputElement).value;
                                            await axios.post("/api/auth/signin", {
                                                password
                                            }).then(res => {
                                                resolve(res.data);
                                                closeModal();
                                                setTimeout(() => {
                                                    window.location.href = "/admin";
                                                }, 500);
                                            }).catch(e => {
                                                reject(e);
                                                closeModal();
                                            });
                                        }}>Sign In</CustomButton>
                                    </>
                                ),
                                onClose: () => {
                                    reject();
                                }
                            });
                        })
                    }}
                    >Sign In</CustomButton>
                </CardBody>
            </Card>
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const token = context.req.cookies.qrTrackerToken;
    if (token && verifyToken(token)) {
        return {
            redirect: {
                destination: "/admin",
            }
        }
    }
    return {
        props: {},
    };
}
