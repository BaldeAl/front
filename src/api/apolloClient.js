
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
// sont les dépendances nécessaires pour utiliser Apollo Client dans notre application React.
const httpLink = new HttpLink({
  uri: 'https://main.d2qway82dzlpqd.amplifyapp.com', // ceci est l'URL de votre API GraphQL
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export default client;
