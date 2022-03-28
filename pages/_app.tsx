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

<<<<<<< HEAD
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
=======
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    new HttpLink({
      uri: "http://localhost:3000/api/graphql",
    }),
  ]),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
>>>>>>> main
      <div>
        <head>
          <title>Proyecto final</title>
        </head>
        <PublicLayout>
          <Component {...pageProps} />
        </PublicLayout>
      </div>
<<<<<<< HEAD
    </SessionProvider>
=======
    </ApolloProvider>
>>>>>>> main
  );
}

export default MyApp;
