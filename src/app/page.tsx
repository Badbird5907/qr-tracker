import {Card, CardBody} from "@nextui-org/card";
import CustomButton from "@/components/button";
import {FaGithub, FaTwitter} from "react-icons/fa";
import {Divider, Input} from "@nextui-org/react";
import {useDynamicModal} from "@/components/dynamic-modal";
import axios from "axios";
import LoginButton from "@/components/login-button";
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