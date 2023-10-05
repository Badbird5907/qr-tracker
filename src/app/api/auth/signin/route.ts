import {NextResponse} from "next/server";
import {verifyToken} from "@/util/auth-server";
import {cookies} from "next/headers";

export async function POST(req: Request) {
    const token = (await req.json()).password;
    if (typeof token !== "string") {
        return NextResponse.json({
            success: false,
            message: `Expected string but got ${typeof token}`,
        })
    }
    const valid = verifyToken(token);
    cookies().set("qrTrackerToken", token, {
        httpOnly: true,
    })
    return NextResponse.json({
        success: valid,
    });
}