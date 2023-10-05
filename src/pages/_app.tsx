import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {NextUIProvider} from "@nextui-org/react";
import {DynamicModalProvider} from "@/components/dynamic-modal";
import {SWRConfig} from "swr";
import {fetcher} from "@/util/swr";
import {useEffect, useState} from "react";
import axios from "axios";

export default function App({Component, pageProps}: AppProps) {
    const [commitString, setCommitString] = useState<string>("Loading...");
    const [commitUrl, setCommitUrl] = useState<string>("");
    useEffect(() => {
        axios.get("/api/info").then((res) => {
            const { versionString, commitUrl } = res.data;
            setCommitString(versionString);
            setCommitUrl(commitUrl);
        }).catch(() => {
            setCommitString("Could not find commit hash");
        })
    }, [])
    return (
        <SWRConfig value={{
            fetcher,
            refreshInterval: 10000,
        }}>
            <NextUIProvider>
                <div className={"dark text-foreground h-full pt-4 min-h-screen bg-background font-sans antialiased"}>
                    <DynamicModalProvider>
                        {/* stick on the bottom left */}
                        <div className={"fixed bottom-0 left-0 p-2 text-xs text-gray-500 dark:text-gray-400"}>
                            <a className={"hover:underline"} href={commitUrl} target={"_blank"} rel={"noreferrer"}>
                                {commitString}
                            </a>
                        </div>
                        <Component {...pageProps} />
                    </DynamicModalProvider>
                </div>
            </NextUIProvider>
        </SWRConfig>
    )
}
