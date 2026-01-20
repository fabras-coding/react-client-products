import React from 'react';
import './global.css';
import AppRoutes from './routes';
import { ModalProvider } from './contexts/ModalContext';  

export default function App() {
  

  return (
    <ModalProvider>
    
      <AppRoutes/>
    </ModalProvider>
  );
}

