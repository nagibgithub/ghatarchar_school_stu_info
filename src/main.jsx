import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './app.css'
import { RouterProvider } from "react-router-dom";
import router from './routes/MainRoute';
import AuthProvider from './provider/AuthProvider';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
);