import {getAllQrCodes} from "@/prisma/qrcodes";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
    const all = await getAllQrCodes();
    return NextResponse.json(all)
}