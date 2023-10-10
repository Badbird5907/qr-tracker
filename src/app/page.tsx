import LoginCard from "@/components/login-card";
import {cookies} from "next/headers";
import {verifyToken} from "@/util/auth-server";
import {redirect} from "next/navigation";

export default function Page() {
    const cookieStore = cookies();
    const qrTrackerToken = cookieStore.get("qrTrackerToken");
    if (qrTrackerToken?.value && verifyToken(qrTrackerToken.value as string)) {
        redirect("/admin");
        return null;
    }
    return (
        <div className="flex h-screen items-center justify-center">
            <LoginCard />
        </div>
    )
}