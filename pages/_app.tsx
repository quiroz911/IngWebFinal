import "../styles/globals.css";
import type { AppProps } from "next/app";
import { PublicLayout } from "../layout/PublicLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <head>
        <title>Proyecto final</title>
      </head>
      <PublicLayout>
        <Component {...pageProps} />
      </PublicLayout>
    </div>
  );
}

export default MyApp;
