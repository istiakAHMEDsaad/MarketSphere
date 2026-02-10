import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import router from './routes/app.routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import AppProvider from './context/AppProvider';

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position='top-right'
          toastOptions={{ duration: 2000 }}
          reverseOrder={false}
        />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AppProvider>
  </StrictMode>,
);
