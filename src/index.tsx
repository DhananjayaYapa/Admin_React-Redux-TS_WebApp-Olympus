import React from 'react'
import App from './App'
import './assets/theme/base.css'
import './assets/theme/main.scss'
import { MsalProvider } from '@azure/msal-react'
import {
  EventType,
  PublicClientApplication,
  type AuthenticationResult,
  type EventMessage,
} from '@azure/msal-browser'
import { msalConfig } from './core'
import { Provider } from 'react-redux'
import store from './redux/store'
import { createRoot } from 'react-dom/client'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


export const msalInstance = new PublicClientApplication(msalConfig)

msalInstance.initialize().then(() => {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  const accounts = msalInstance.getAllAccounts()
  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0])
  }

  msalInstance.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const payload = event.payload as AuthenticationResult
      const account = payload.account
      msalInstance.setActiveAccount(account)
    }
  })
  createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <MsalProvider instance={msalInstance}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>

          <App />
          </LocalizationProvider>
        </MsalProvider>
      </Provider>
    </React.StrictMode>
  )
})
