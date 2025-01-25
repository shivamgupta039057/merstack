import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Providers from './providers/Providers.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <Providers>
     <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
  </Providers>
)
