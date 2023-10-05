import React from "react";

import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {PopoverContent, PopoverTrigger} from "@/components/popover";
import {Button, Popover} from "@nextui-org/react";

const SlugPage = (
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
    return (
        <>
            <Popover placement="right">
                <PopoverTrigger>
                    <Button>Open Popover</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="px-1 py-2">
                        <div className="text-small font-bold">Popover Content</div>
                        <div className="text-tiny">This is the popover content</div>
                    </div>
                </PopoverContent>
            </Popover>

        </>
    );
};

export default SlugPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {slug} = context.params!;
    return {
        props: {
            slug: slug,
        },
    };
}
