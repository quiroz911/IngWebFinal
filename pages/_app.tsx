import 'styles/globals.css';
import type { AppProps } from 'next/app';
import {
  ApolloClient,
  InMemoryCache,
  from,
  HttpLink,
  ApolloProvider,
} from '@apollo/client';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { PublicLayout } from 'layout/PublicLayout';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    new HttpLink({
      // uri: 'http://localhost:3000/api/graphql',
      uri: 'https://ing-web-final.vercel.app/api/graphql',
    }),
  ]),
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Head>
          <title>Proyecto final</title>
        </Head>
        <PublicLayout pageAuth={pageProps.auth}>
          <Component {...pageProps} />
        </PublicLayout>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
