import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query'; // Import QueryClient and QueryClientProvider

import App from './App'; // Replace with the actual path to your App component

const queryClient = new QueryClient(); // Create a new instance of QueryClient

ReactDOM.render(
  <QueryClientProvider client={queryClient}> {/* Wrap your app with QueryClientProvider */}
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
);
