import React from 'react';
import ReactDOM from 'react-dom/client';
import { CustomRouter } from '@/routes/base';
import '@/index.css';
import { ThemeProvider } from './components/themeprovider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

  <React.StrictMode>
    <CustomRouter />
  </React.StrictMode>
  </ThemeProvider>
);
