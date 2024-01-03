import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import './App.css';

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

// Setup Apollo Client
const client = new ApolloClient({
  link: from([
    errorLink,
    new HttpLink({ uri: '/graphql' }) 
  ]),
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
