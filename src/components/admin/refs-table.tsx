"use client";

import useSWR from "swr";
import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {Divider, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import React from "react";

type RefsTableProps = {
    id: string
}
const RefsTable = (props: RefsTableProps) => {
    const refsSwr = useSWR(`/api/admin/${props.id}/metrics/refs/`)
    return (
        <Card className={"mx-8 mt-4"}>
            <CardHeader className={"flex"}>
                <h1 className={
                    // center
                    "text-2xl font-bold text-center flex-1"
                }>
                    Top Refs
                </h1>
            </CardHeader>
            <Divider/>
            <CardBody>
                <Table aria-label={"Top Refs"}>
                    <TableHeader>
                        <TableColumn>Referrer</TableColumn>
                        <TableColumn>Count</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {refsSwr.data && refsSwr.data?.map((ref: any, i: number) => (
                            // [{"count":11,"ref":"abc"},{"count":5,"ref":"3094"},{"count":5,"ref":"123"},{"count":4,"ref":"124"},{"count":3,"ref":"iej"}]

                            <TableRow key={i}>
                                <TableCell>{!ref.ref ? "None" : ref.ref}</TableCell>
                                <TableCell>{ref.count}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardBody>
        </Card>
    );
};

export default RefsTable;