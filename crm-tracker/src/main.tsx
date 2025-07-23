// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { RegionProvider } from './context/RegionContext';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <RegionProvider>
          <App />
        </RegionProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found!');
}
