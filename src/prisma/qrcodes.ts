import prisma from "@/prisma/prisma";
export const getQrCode = async (slug: string) => {
    return prisma.qrCodes.findFirst({
        where: {
            slug,
        },
    });
}