import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserData from "./pages/userData/userData"
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://127.0.0.1:8000/graphql/' }),
  cache: new InMemoryCache()
});



ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <UserData />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
