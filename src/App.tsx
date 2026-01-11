import { ThemeProvider } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { PrimaryTheme } from './assets/theme/theme'
import { authActions } from './redux/actions'

import AppRoutes from './routes'
function App() {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(authActions.fetchAuthorizeUser())
    dispatch(authActions.fetchAuthorizeUserRoles())
    dispatch(authActions.fetchActiveUserRole())
  }, [])

  return (
    <ThemeProvider theme={PrimaryTheme}>
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App
