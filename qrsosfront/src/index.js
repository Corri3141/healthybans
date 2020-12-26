import React from 'react';
import ReactDOM from 'react-dom';

// styles
import './styles/index.scss';

import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import App from './App'

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://127.0.0.1:8000/graphql/' }),
  cache: new InMemoryCache()
});

ReactDOM.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
