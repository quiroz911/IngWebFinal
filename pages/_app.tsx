import "../styles/globals.css";
import type { AppProps } from "next/app";
import { PublicLayout } from "../layout/PublicLayout";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div>
        <head>
          <title>Proyecto final</title>
        </head>
        <PublicLayout>
          <Component {...pageProps} />
        </PublicLayout>
      </div>
    </SessionProvider>
  );
}

export default MyApp;
