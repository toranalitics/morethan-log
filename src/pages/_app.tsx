import { AppPropsWithLayout } from "../types"
import { Hydrate, QueryClientProvider } from "@tanstack/react-query"
import Sparkle from "src/components/Sparkle"
import { RootLayout } from "src/layouts"
import { queryClient } from "src/libs/react-query"
import Head from "next/head"; // Head import 추가

import "/src/styles/themes/prism.css"

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RootLayout>
          <Head>
  <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_ID}`}></script>
  <script>
    {`window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_TAG_ID}');`}
  </script>
</Head>

          {getLayout(<Component {...pageProps} />)}
        </RootLayout>
      </Hydrate>
      <Sparkle />
    </QueryClientProvider>
  )
}

export default App
