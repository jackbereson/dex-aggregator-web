import { useMemo } from 'react';

import {
    ApolloClient,
    ApolloLink,
    HttpLink,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client';

import { ErrorLink } from './error.link';
import { AuthLink } from './auth.link';

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient({ uri }: { uri: string }) {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined', // set to true for SSR
        link: ApolloLink.from([
            ErrorLink as unknown as ApolloLink,
            AuthLink as unknown as ApolloLink,
            new HttpLink({ uri }),
        ]),
        cache: new InMemoryCache(),
    });
}

export function initializeApollo({
    initialState = null,
    uri,
}: {
    initialState?: any;
    uri: string;
}) {
    const _apolloClient = apolloClient ?? createApolloClient({ uri });

    // If your page has Next.js data fetching methods that use Apollo Client,
    // the initial state gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();

        // Restore the cache using the data passed from
        // getStaticProps/getServerSideProps combined with the existing cached data
        _apolloClient.cache.restore({ ...existingCache, ...initialState });
    }

    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined') return _apolloClient;

    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

export function useApollo({ uri }: { uri: string }) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const store = useMemo(() => initializeApollo({ uri }), []);

    return store;
}

// @ts-ignore
const uri = `${process.env.API_URI}/graphql`;

export const client = createApolloClient({ uri });
