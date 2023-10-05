import prisma from "@/prisma/prisma";
import {QrCodes} from ".prisma/client";
export const getQrCode = async (slug: string) => {
    return prisma.qrCodes.findFirst({
        where: {
            slug,
        }
    });
}
export const getQrCodeById = async (id: string) => {
    return prisma.qrCodes.findFirst({
        where: {
            id,
        }
    });
}
export const getAllQrCodes = async () => {
    return prisma.qrCodes.findMany();
}
export const saveQrCode = async (qrCode: any) => {
    return prisma.qrCodes.create({
        data: qrCode,
    });
}
export const deleteQrCode = async (id: string) => {
    return prisma.qrCodes.delete({
        where: {
            id,
        }
    });
}

export const setField = async (id: string, data: any) => {
    return prisma.qrCodes.update({
        where: {
            id,
        },
        data
    });
}