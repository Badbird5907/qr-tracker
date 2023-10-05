import {NextRequest, NextResponse} from "next/server";
import {verifyToken} from "@/util/auth-server";

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    // if we are on /admin
    if (request.nextUrl.pathname.startsWith("/admin")) {
        // get the qrTrackerToken cookie
        const qrTrackerToken = request.cookies.get("qrTrackerToken");
        if (!qrTrackerToken || !verifyToken(qrTrackerToken.value)) {
            url.pathname = "/";
            return NextResponse.redirect(url);
        }
    } else if (request.nextUrl.pathname.startsWith("/api/admin")) {
        const qrTrackerToken = request.cookies.get("qrTrackerToken");
        if (!qrTrackerToken || !verifyToken(qrTrackerToken.value)) { // if the token is invalid
            // return 401
            const response = new Response(JSON.stringify({
                success: false,
                message: "Unauthorized",
                code: 401
            }), {
                status: 401,
            });
            response.headers.set("Content-Type", "application/json");
            return response;
        }
    }
    return NextResponse.next();
}