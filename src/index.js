import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';
// c'est un module qui permet de faire des requêtes graphql
import client from './api/apolloClient';
// nous faut le provider pour que l'application puisse accéder au client
// et donc faire des requêtes graphql
// on va l'entourer de notre app pour que toute l'application puisse accéder au client
// et donc faire des requêtes graphql

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
