import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress
        color="#29D"              // Optional: bar color
        startPosition={0.3}       // Optional: where the bar starts
        stopDelayMs={200}         // Optional: delay before stopping
        height={3}                // Optional: bar height in px
        showOnShallow={true}      // Optional: show on shallow routing
      />
      <Component {...pageProps} />
    </>
  );
}
