import React from 'react';
import ReactDOM from 'react-dom/client';
import { CustomRouter } from '@/routes/base';
import '@/index.css';
import { ThemeProvider } from './components/themeprovider';
import AuthProvider from './context/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

  <React.StrictMode>
    <AuthProvider>
    <CustomRouter />
    </AuthProvider>
  </React.StrictMode>
  </ThemeProvider>
);
