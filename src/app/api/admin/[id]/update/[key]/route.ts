import {setField} from "@/prisma/qrcodes";
import {NextResponse} from "next/server";

export async function POST(req: Request, {params}: { params: { id: string, key: string } }) {
    const {id, key} = params;
    const body = await req.json();
    const value = body[key];
    await setField(id as string, {
        [key]: value
    });
    return NextResponse.json({
        success: true,
        message: `Successfully updated ${key}`
    });
}