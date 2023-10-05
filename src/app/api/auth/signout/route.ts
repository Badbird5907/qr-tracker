import {NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function POST(req: Request) {
    cookies().delete("qrTrackerToken");
    NextResponse.json({
        success: true,
    });
}