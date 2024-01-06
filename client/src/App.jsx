import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { Outlet } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';

import Navbar from './components/Navbar';
import './App.css';

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Error handling for Apollo Client
const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`GraphQL error ${message}`);
      return message;
    });
  }

  if (networkError) {
    alert(`Network error: ${networkError.message}`);
  }
});

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Setup Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
