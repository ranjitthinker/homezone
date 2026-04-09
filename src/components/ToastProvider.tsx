'use client';

import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 9000,
        style: {
          borderRadius: '10px',
          fontSize: '16px',
        },
        success: {
          iconTheme: {
            primary: '#16a34a',
            secondary: '#ffffff',
          },
        },
        error: {
          iconTheme: {
            primary: '#dc2626',
            secondary: '#ffffff',
          },
        },
      }}
    />
  );
}