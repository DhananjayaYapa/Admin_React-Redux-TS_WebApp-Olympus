import React from 'react'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import { loginRequest } from '../../core'
import styles from './Login.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { APP_CONFIGS, APP_ROUTES } from '../../utilities/constants'
import type { IPublicClientApplication } from '@azure/msal-browser'
import { acenturaLogo } from '../../assets/images'
import { authActions } from '../../redux/actions'
import { MsLoginButton } from '../../components'
import type { AppStateDto } from '../../utilities/models'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const isAuthenticated = useIsAuthenticated()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { instance, accounts } = useMsal()
  const userAuthorizing = useSelector((state: AppStateDto) => state.auth.userAuthorizing)
  const authorizedUser = useSelector((state: AppStateDto) => state.auth.authorizedUser)
  const activeUserRole = useSelector((state: AppStateDto) => state.auth.activeUserRole)

  React.useEffect(() => {
    if (isAuthenticated) {
      instance.setActiveAccount(accounts[0])
      dispatch(authActions.authorizeUser())
    }
  }, [isAuthenticated])

  const handleLogin = (instance: IPublicClientApplication) => {
    instance.loginRedirect(loginRequest).catch((error: string) => {
      console.error(error)
    })
  }

  React.useEffect(() => {
    if (isAuthenticated && authorizedUser.data.isAuthorized) {
      if (Object.keys(activeUserRole.data).length > 0) {
        navigate(APP_ROUTES.USERS)
      }
    }
  }, [userAuthorizing, authorizedUser, activeUserRole])

  return (
    <section
      className={`${styles.container} content-padding container layout-row layout-wrap layout-align-center center`}
    >
      <section className={`${styles.login} layout-row`}>
        <aside className={styles.loginRandomImage} />
        <aside className={styles.loginActions}>
          <img alt="acenturaLogo" className={styles.logo} src={acenturaLogo} />
          <h1>Welcome to Olympus</h1>
          <p>Olympus is the internal application portfolio of Acentura.</p>
          <div className={styles.loginNotification}>
            {!!userAuthorizing.isLoading && <p className={styles.isAuthorizing}>Authorizing...</p>}
            {!userAuthorizing.isLoading && !!userAuthorizing.error && (
              <p className={styles.error}>
                {userAuthorizing.error}
                <a href={`${APP_CONFIGS.DASHBOARD_CLIENT}dashboard`}>[Go to Dashboard]</a>
              </p>
            )}
          </div>
          <MsLoginButton handleLogin={handleLogin} disabled={userAuthorizing.isLoading} />
          <div className={styles.loginFooter}>
            <span className="f-14">
              {' '}
              &copy; {2025} {APP_CONFIGS.APP_OWNER}
            </span>
          </div>
        </aside>
      </section>
    </section>
  )
}

export default Login
