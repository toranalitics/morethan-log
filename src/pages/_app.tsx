import { AppPropsWithLayout } from "../types"
import { Hydrate, QueryClientProvider } from "@tanstack/react-query"
import Sparkle from "src/components/Sparkle"
import { RootLayout } from "src/layouts"
import { queryClient } from "src/libs/react-query"

import "/src/styles/themes/prism.css"
import { useEffect } from "react"

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)

  useEffect(() => {
    // Google Tag 코드 추가
    const script1 = document.createElement('script');
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-9P1NERCL82';
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-9P1NERCL82');
    `;
    document.body.appendChild(script2);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RootLayout>{getLayout(<Component {...pageProps} />)}</RootLayout>
      </Hydrate>
      {/* <AnimatedCursor /> */}
      <Sparkle />
    </QueryClientProvider>
  )
}
