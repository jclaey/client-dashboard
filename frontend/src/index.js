import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from './context/AuthContext.js'

const root = createRoot(document.getElementById('root'))
root.render(
    <AuthProvider>
        <App />
    </AuthProvider>
)