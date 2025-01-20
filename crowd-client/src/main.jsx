import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './bootstrap.min.css'
import {BrowserRouter} from 'react-router-dom'
import { WalletProvider } from './ContextAPI/walletContext.jsx'
import { StateContextProvider } from './ContextAPI/web3.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <StateContextProvider>
    {/* <WalletProvider> */}
      <App />
    {/* </WalletProvider> */}
    </StateContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
