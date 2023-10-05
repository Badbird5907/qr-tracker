import {getQrCodeById} from "@/prisma/qrcodes";
import {NextResponse} from "next/server";

export async function GET(req: Request, {params}: { params: { id: string } }) {
    const data = await getQrCodeById(params.id);
    return NextResponse.json(data, {status: 200});
}