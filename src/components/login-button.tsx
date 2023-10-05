"use client";

import {useDynamicModal} from "@/components/dynamic-modal";
import CustomButton from "@/components/button";
import {Input} from "@nextui-org/react";
import axios from "axios";

const LoginButton = () => {
    const {showModal, closeModal} = useDynamicModal();
    return (
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
    );
};

export default LoginButton;