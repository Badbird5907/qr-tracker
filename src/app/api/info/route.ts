import {getVersionString} from "@/util/server/info";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
    const ver = await getVersionString();
    return NextResponse.json({
        versionString: ver.version,
        commitUrl: ver.url,
    })
}