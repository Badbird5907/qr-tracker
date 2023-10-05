"use client";

import '@/styles/globals.css';

import {SWRConfig} from "swr";
import {fetcher} from "@/util/swr";
import {DynamicModalProvider} from "@/components/dynamic-modal";
import {Providers} from "@/app/providers";

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={"dark"}>
        <body>
        <SWRConfig value={{
            fetcher,
            refreshInterval: 10000,
        }}>
            <Providers>
                <div className={"dark text-foreground h-full pt-4 min-h-screen bg-background font-sans antialiased"}>
                    <DynamicModalProvider>
                        {/* stick on the bottom left
                        <div className={"fixed bottom-0 left-0 p-2 text-xs text-gray-500 dark:text-gray-400"}>
                            <a className={"hover:underline"} href={url} target={"_blank"} rel={"noreferrer"}>
                                {version}
                            </a>
                        </div>
                        */}
                        {children}
                    </DynamicModalProvider>
                </div>
            </Providers>
        </SWRConfig>
        </body>
        </html>
    )
}
