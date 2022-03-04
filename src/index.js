import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AUTH_TOKEN } from './constants';
import { BrowserRouter } from 'react-router-dom'; //We now need to wrap the App with BrowserRouter so that all child components of App will get access to the routing functionality.

const httpLink = createHttpLink({
  uri: 'http://localhost:4000' //Graphql server
});
//Apollo provides a nice way for authenticating all requests by using the concept of middleware, implemented as an Apollo Link.
const authLink = setContext((_, { headers }) => {
  //we get the authentication token from localStorage if it exists
  const token = localStorage.getItem(AUTH_TOKEN);
  // we return the headers to the context so httpLink can read them.
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <BrowserRouter>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
