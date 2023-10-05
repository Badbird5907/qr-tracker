import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {NextUIProvider} from "@nextui-org/react";
import {DynamicModalProvider} from "@/components/dynamic-modal";
import {SWRConfig} from "swr";
import {fetcher} from "@/util/swr";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <SWRConfig value={{
          fetcher,
          refreshInterval: 10000,
      }}>
      <NextUIProvider>
          <div className={"dark text-foreground h-full pt-4 min-h-screen bg-background font-sans antialiased"}>
              <DynamicModalProvider>
                  <Component {...pageProps} />
              </DynamicModalProvider>
          </div>
      </NextUIProvider>
      </SWRConfig>
  )
}
