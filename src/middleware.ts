import {NextRequest, NextResponse} from "next/server";
import {verifyToken} from "@/pages/util/auth-server";

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
    }
    return NextResponse.next();
}