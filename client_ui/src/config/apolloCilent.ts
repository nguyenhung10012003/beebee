import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const baseURL = process.env.SERVER_URL_API || 'http://localhost:3001/graphql';
const isServer = typeof window === 'undefined';

const httpLink = createHttpLink({
  uri: baseURL,
});

const authLink = setContext(async (_, { headers }) => {
  if (isServer) {
    const { cookies } = (await import('next/headers'))
      , token = cookies().get('token')?.value;
    if (token)
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
  } else {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    if (token)
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
  }
  return headers;

});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;