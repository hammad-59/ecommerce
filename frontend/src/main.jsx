import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from "../src/store/store.js"
import { Provider } from 'react-redux'
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {store}>
    <AuthProvider>
    <App />


    </AuthProvider>
    </Provider>
  </StrictMode>,
)
