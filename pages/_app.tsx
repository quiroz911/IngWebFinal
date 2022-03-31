import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  ApolloClient,
  InMemoryCache,
  from,
  HttpLink,
  ApolloProvider,
} from "@apollo/client";
import { PublicLayout } from "../layout/PublicLayout";
import { SessionProvider } from "next-auth/react";
import NotAuthorized from "@components/NotAuthorized";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    new HttpLink({
      // uri: 'https://gestion-proyectos.vercel.app/api/graphql',
      uri: "http://localhost:3000/api/graphql",
    }),
  ]),
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <head>
          <title>Proyecto final</title>
        </head>
        <PublicLayout pageAuth={pageProps.auth}>
          <Component {...pageProps} />
        </PublicLayout>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
