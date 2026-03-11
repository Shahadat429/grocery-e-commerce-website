import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Routes from './components/routes/Routes.jsx'

import AuthProvider from './context/AuthProvider.jsx'
import { RouterProvider } from 'react-router';
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Toaster position='top-center' />
      <RouterProvider router={Routes} />
    </AuthProvider>
  </StrictMode>
)
