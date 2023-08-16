
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
// sont les dépendances nécessaires pour utiliser Apollo Client dans notre application React.
const httpLink = new HttpLink({
  uri: 'http://localhost:3000/dev/graphql', // ceci est l'URL de votre API GraphQL
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export default client;
