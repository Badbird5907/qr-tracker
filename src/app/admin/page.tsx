"use client";

import {useDynamicModal} from "@/components/dynamic-modal";
import useSWR from "swr";
import {
    Button,
    Button as NextUIButton,
    Input,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import CustomButton from "@/components/button";
import {FaEdit, FaPlus, FaTrash} from "react-icons/fa";
import NextLink from "next/link";
import axios from "axios";
import {QrCodes} from ".prisma/client";
import React from "react";

export default function Page() {
    const {showModal, closeModal} = useDynamicModal();
    const {data, mutate} = useSWR('/api/admin/list')
    return (
        <>
            <div className={"mt-16"}>
                <h1 className={"text-4xl font-bold text-center"}>Admin</h1>
                <p className={"text-2xl text-gray-400 text-center pt-4"}>
                    Welcome to the admin panel.
                </p>
                <div className={"w-full flex justify-center mt-10"}>
                    <div className={"w-[75%]"}>
                        <Button color={"primary"}
                                className={"md:float-right md:right-4 md:top-14 md:z-10 md:mb-0 md:w-fit w-full mb-4"}
                                onPress={() => {
                                    showModal({
                                        title: "Add slug",
                                        body: (
                                            <>
                                                <Input
                                                    autoFocus
                                                    label={"Slug"}
                                                    id={"slug"}
                                                    placeholder={"dummy"}
                                                    variant={"bordered"}
                                                />
                                                <Input
                                                    label={"Target Link"}
                                                    placeholder={"https://example.com"}
                                                    type={"url"}
                                                    variant={"bordered"}
                                                    id={"link"}
                                                />
                                                <Input
                                                    label={"Title"}
                                                    placeholder={"Title"}
                                                    variant={"bordered"}
                                                    id={"title"}
                                                />
                                                <Input
                                                    label={"Description"}
                                                    placeholder={"A short description of what this is."}
                                                    variant={"bordered"}
                                                    id={"description"}
                                                />
                                            </>
                                        ),
                                        footer: (
                                            <>
                                                <NextUIButton
                                                    color={"default"}
                                                    onPress={closeModal}
                                                >
                                                    Cancel
                                                </NextUIButton>
                                                <CustomButton
                                                    color={"primary"}
                                                    closeModal={closeModal}
                                                    onClickLoading={() => {
                                                        const slug = (document.getElementById("slug") as HTMLInputElement).value;
                                                        const title = (document.getElementById("title") as HTMLInputElement).value;
                                                        const link = (document.getElementById("link") as HTMLInputElement).value;
                                                        const description = (document.getElementById("description") as HTMLInputElement).value;

                                                        return axios.post('/api/admin/create', {
                                                            slug,
                                                            title,
                                                            link,
                                                            description
                                                        }).then(() => {
                                                            // trigger swr to revalidate
                                                            return mutate();
                                                        });
                                                    }}
                                                >
                                                    Create
                                                </CustomButton>
                                            </>
                                        )
                                    });
                                }}
                        ><FaPlus/> Create</Button>
                        <Table aria-label={"List of positions"}>
                            <TableHeader>
                                <TableColumn>Slug</TableColumn>
                                <TableColumn>Title</TableColumn>
                                <TableColumn>Created</TableColumn>
                                <TableColumn>Last Modified</TableColumn>
                                <TableColumn>Actions</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {data && data?.map((qrCode: QrCodes, i: number) => {
                                    return (
                                        <TableRow key={i}>
                                            <TableCell>{qrCode.slug}</TableCell>
                                            <TableCell>{qrCode.title}</TableCell>
                                            <TableCell>{new Date(qrCode.createdAt).toLocaleString()}</TableCell>
                                            <TableCell>{new Date(qrCode.updatedAt).toLocaleString()}</TableCell>
                                            <TableCell>
                                                <NextLink href={`/admin/${qrCode.id}`}
                                                          className={"outline-0"}>
                                                    <Button color={"primary"} className={"mr-4"}><FaEdit/> Edit</Button>
                                                </NextLink>
                                                <Button color={"danger"} onPress={() => {
                                                    showModal({
                                                        title: "Are you sure?",
                                                        body: "Are you sure you want to delete this? This action cannot be undone.",
                                                        footer: (
                                                            <>
                                                                <NextUIButton
                                                                    color={"default"}
                                                                    onPress={closeModal}
                                                                >
                                                                    No
                                                                </NextUIButton>
                                                                <CustomButton
                                                                    color={"danger"}
                                                                    closeModal={closeModal}
                                                                    onClickLoading={() => {
                                                                        return axios.delete(`/api/admin/${qrCode.id}/remove`).then(() => {
                                                                            // trigger swr to revalidate
                                                                            return mutate()
                                                                        })
                                                                    }}
                                                                >
                                                                    Yes
                                                                </CustomButton>
                                                            </>
                                                        ),
                                                    });
                                                }}><FaTrash/> Delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
}