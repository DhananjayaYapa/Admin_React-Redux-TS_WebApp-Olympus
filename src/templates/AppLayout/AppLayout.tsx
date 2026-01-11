import {
  acenturaLogo,
  allAppsIcon,
  athenaIcon,
  heraIcon,
  hermesIcon,
  demeterIcon,
} from '../../assets/images'
import {
  APP_ROUTES,
  APP_CONFIGS,
  APP_FEATURE_KEYS,
  APPLICATION_IDS,
} from '../../utilities/constants'
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined'
import { Collapse, List, ListItemButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import AppLayoutHeader from '../AppLayoutHeader/AppLayoutHeader'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import PanoramaOutlinedIcon from '@mui/icons-material/PanoramaOutlined'
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined'
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined'
import InputOutlinedIcon from '@mui/icons-material/InputOutlined'
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined'
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined'
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import type { AppStateDto, Application, BreadCrumbDto } from '../../utilities/models'
import { useDispatch, useSelector } from 'react-redux'
import type { IPublicClientApplication } from '@azure/msal-browser'
import { useMsal } from '@azure/msal-react'
import { AppAuthorizer } from '../../components/shared'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import styles from './AppLayout.module.scss'
import { authActions } from '../../redux/actions'

const AppLayout: React.FC<{
  children: React.ReactNode
  breadcrumb: BreadCrumbDto[]
}> = (props) => {
  const { instance } = useMsal()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // get from local storage
  const authorizedUserDetail = useSelector((state: AppStateDto) => state.auth.authorizedUser.data)
  const authorizedUser = useSelector((state: AppStateDto) => state.auth.authorizedUser)
  const authorizedUserRoles = useSelector((state: AppStateDto) => state.auth.authorizedUserRoles)
  const activeUserRole = useSelector((state: AppStateDto) => state.auth.activeUserRole)

  const [sideNavigation, setSideNavigation] = useState(true)
  const [navClass, setNavClass] = useState('')
  const [roleListOpen, setRoleListOpen] = React.useState(false)
  const [open1, setOpen1] = React.useState(false)

  const handleRMClick = () => {
    setOpen1(!open1)
  }

  const handleClickRoleList = () => {
    setRoleListOpen(!roleListOpen)
  }
  React.useEffect(() => {
    if (!sideNavigation) {
      setNavClass('collapsed')
    } else {
      setNavClass('')
    }
  }, [sideNavigation])
  const handleSignOut = (instance: IPublicClientApplication) => {
    dispatch(authActions.logout())
    instance.logoutRedirect().catch((e) => {
      console.error('Sign-out Error', e)
    })
  }
  const setActiveUserRole = (key: string) => {
    window.location.reload()
    dispatch(authActions.setActiveUserRole(key))
  }
  return (
    <React.Fragment>
      <div className={'layout-row authorizedContainer'}>
        <aside className={`layout-row sideNavigation ${navClass}`}>
          <aside className="navBar">
            <div className={`menuBox ${navClass}`}>
              <a className="menuIcon" onClick={() => setSideNavigation(!sideNavigation)}>
                <span></span>
              </a>
            </div>

            <div className="appLinkIconGroup">
              {authorizedUserDetail.authorizedApps?.some(
                (item: Application) => item.applicationId === APPLICATION_IDS.DASHBOARD
              ) && (
                <div>
                  <div className="appLinkIcon">
                    <Tooltip title="All Apps" placement="right">
                      <a href={`${APP_CONFIGS.DASHBOARD_CLIENT}dashboard`}>
                        <img src={allAppsIcon} />
                      </a>
                    </Tooltip>
                  </div>
                  <hr />
                </div>
              )}

              {authorizedUserDetail.authorizedApps?.some(
                (item: Application) => item.applicationId === APPLICATION_IDS.HERMES
              ) && (
                <div>
                  <div className="appLinkIcon">
                    <Tooltip title="Hermes" placement="right">
                      <a href={`${APP_CONFIGS.HERMES_CLIENT}dashboard`}>
                        <img src={hermesIcon} />
                      </a>
                    </Tooltip>
                  </div>
                  <hr />
                </div>
              )}

              {authorizedUserDetail.authorizedApps?.some(
                (item: Application) => item.applicationId === APPLICATION_IDS.ATHENA
              ) && (
                <div>
                  <div className="appLinkIcon">
                    <Tooltip title="Athena" placement="right">
                      <a href={`${APP_CONFIGS.ATHENA_CLIENT}dashboard`}>
                        <img src={athenaIcon} />
                      </a>
                    </Tooltip>
                  </div>
                  <hr />
                </div>
              )}

              {authorizedUserDetail.authorizedApps?.some(
                (item: Application) => item.applicationId === APPLICATION_IDS.HERA
              ) && (
                <div>
                  <div className="appLinkIcon">
                    <Tooltip title="Hera" placement="right">
                      <a href={`${APP_CONFIGS.HERA_CLIENT}dashboard`}>
                        <img src={heraIcon} />
                      </a>
                    </Tooltip>
                  </div>
                  <hr />
                </div>
              )}

              {authorizedUserDetail.authorizedApps?.some(
                (item: Application) => item.applicationId === APPLICATION_IDS.DEMETER
              ) && (
                <div>
                  <div className="appLinkIcon">
                    <Tooltip title="Demeter" placement="right">
                      <a href={`${APP_CONFIGS.DEMETER_CLIENT}dashboard`}>
                        <img src={demeterIcon} />
                      </a>
                    </Tooltip>
                  </div>
                </div>
              )}
            </div>

            <div className={'cursorPointer profile'}>
              <span className={'infoCircle layout-row layout-align-center center'}>
                <sup>{authorizedUser.data.tag}</sup>
              </span>
              <div className="infoMenu">
                <span className={styles.activeUserRole}>{activeUserRole.data.userRoleName}</span>
                <p className="name">
                  {authorizedUser.data.firstName} {authorizedUser.data.lastName}
                </p>
                <span className="email">{authorizedUser.data.username}</span>
                {authorizedUserRoles.data.length > 1 && (
                  <div className={'switchRole layout-row'}>
                    <div className={'layout-row'}>
                      <a onClick={handleClickRoleList}>Switch Role</a>
                      <ArrowRightOutlinedIcon className="switchRoleArrow" />
                    </div>
                    <div className={'roleMenu layout-row'}>
                      <List disablePadding>
                        {authorizedUserRoles.data
                          .map((i) => ({
                            role: i.userRoleName,
                            key: i.userRoleKey,
                          }))
                          .map((role, index) => (
                            <div key={index} onClick={() => setActiveUserRole(role.key)}>
                              <div
                                className={
                                  authorizedUserRoles.data.length === index + 1
                                    ? 'switchRoleDiv_last layout-row'
                                    : 'switchRoleDiv layout-row'
                                }
                              >
                                <span>{role.role} </span>
                                <br></br>
                              </div>
                            </div>
                          ))}
                      </List>
                    </div>
                  </div>
                )}

                {
                  <a
                    onClick={() => {
                      navigate(APP_ROUTES.USERS)
                    }}
                  >
                    My Profile
                  </a>
                }
                <a>Help</a>
                <a
                  className="signOut"
                  onClick={() => {
                    handleSignOut(instance)
                  }}
                >
                  Sign Out
                </a>
              </div>
            </div>
          </aside>
          <aside className={`navBarContent ${navClass}`}>
            <div className="contentGroup">
              <img className="logo" src={acenturaLogo} />
              <h1>Olympus Admin</h1>
              <AppAuthorizer
                activeRoleFeatures={activeUserRole.data.features}
                authorizedFeatureKey={[APP_FEATURE_KEYS.VIEW_ALL_USERS]}
              >
                <Link to={APP_ROUTES.USERS} className="navLink">
                  <GroupOutlinedIcon />
                  Users
                </Link>
              </AppAuthorizer>
              <AppAuthorizer
                activeRoleFeatures={activeUserRole.data.features}
                authorizedFeatureKey={[APP_FEATURE_KEYS.VIEW_ALL_SBU]}
              >
                <Link to={APP_ROUTES.SBU} className="navLink">
                  <AccountTreeOutlinedIcon />
                  SBU
                </Link>
              </AppAuthorizer>
              <AppAuthorizer
                activeRoleFeatures={activeUserRole.data.features}
                authorizedFeatureKey={[APP_FEATURE_KEYS.VIEW_ALL_CLIENTS]}
              >
                <Link to={APP_ROUTES.CLIENTS} className="navLink">
                  <BusinessCenterOutlinedIcon />
                  Clients
                </Link>
              </AppAuthorizer>
              <AppAuthorizer
                activeRoleFeatures={activeUserRole.data.features}
                authorizedFeatureKey={[APP_FEATURE_KEYS.VIEW_ALL_PROJECTS]}
              >
                <Link to={APP_ROUTES.TEAMS} className="navLink">
                  <AccountTreeOutlinedIcon />
                  Teams
                </Link>
              </AppAuthorizer>
              <AppAuthorizer
                activeRoleFeatures={activeUserRole.data.features}
                authorizedFeatureKey={[APP_FEATURE_KEYS.VIEW_ALL_BANNERS]}
              >
                <Link to={APP_ROUTES.BANNERS} className="navLink">
                  <PanoramaOutlinedIcon />
                  Banners
                </Link>
              </AppAuthorizer>
              <AppAuthorizer
                activeRoleFeatures={activeUserRole.data.features}
                authorizedFeatureKey={[APP_FEATURE_KEYS.VIEW_ALL_RESIGNATIONS]}
              >
                <Link to={APP_ROUTES.RESIGNATIONS} className="navLink">
                  <InputOutlinedIcon />
                  Resignations
                </Link>
              </AppAuthorizer>
              <AppAuthorizer
                activeRoleFeatures={activeUserRole.data.features}
                authorizedFeatureKey={[APP_FEATURE_KEYS.VIEW_ALL_BADGES]}
              >
                <Link to={APP_ROUTES.BADGE} className="navLink">
                  <CollectionsBookmarkOutlinedIcon />
                  Badges
                </Link>
              </AppAuthorizer>
              <AppAuthorizer
                activeRoleFeatures={activeUserRole.data.features}
                authorizedFeatureKey={[APP_FEATURE_KEYS.VIEW_FLYERS]}
              >
                <Link to={APP_ROUTES.FLYER} className="navLink">
                  <CollectionsOutlinedIcon />
                  Flyers
                </Link>
              </AppAuthorizer>
              <AppAuthorizer
                activeRoleFeatures={activeUserRole.data.features}
                authorizedFeatureKey={[APP_FEATURE_KEYS.MANAGE_FEATURE_PERMISSIONS]}
              >
                <Link to={'#'} className="navLink">
                  <div className={'layout-row'} onClick={handleRMClick}>
                    <AssignmentIndOutlinedIcon color="primary" />
                    Configuration
                    <ListItemButton style={{ padding: '0px 0px 0px 55px' }}>
                      {open1 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  </div>
                </Link>
              </AppAuthorizer>
              <Collapse in={open1} timeout="auto">
                <List disablePadding>
                  <AppAuthorizer
                    activeRoleFeatures={activeUserRole.data.features}
                    authorizedFeatureKey={[APP_FEATURE_KEYS.MANAGE_FEATURE_PERMISSIONS]}
                  >
                    <NavLink
                      style={{ textDecoration: 'none' }}
                      className="navLink"
                      to={APP_ROUTES.ROLE_MANAGEMENT}
                    >
                      <div>
                        <span style={{ padding: '0px 0px 0px 40px' }}>Role Management</span>
                      </div>
                    </NavLink>
                  </AppAuthorizer>
                </List>
              </Collapse>
            </div>
          </aside>
        </aside>
        <aside className="content">
          <AppLayoutHeader componentBreadCrumb={props.breadcrumb} />
          {props.children}
        </aside>
      </div>
    </React.Fragment>
  )
}

export default AppLayout
