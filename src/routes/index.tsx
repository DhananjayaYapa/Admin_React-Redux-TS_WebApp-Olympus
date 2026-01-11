import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import {
  BadgeManagement,
  BannerManagement,
  ClientManagement,
  EditUser,
  FlyersManagement,
  Login,
  ResignationManagement,
  RoleManagement,
  SbuManagement,
  TeamManagement,
  UserManagement,
} from '../pages'
import { APP_FEATURE_KEYS, APP_ROUTES } from '../utilities/constants'
import PrivateRoute from './PrivateRoute'
import BadgeAssignment from '../pages/BadgeAssignment/BadgeAssignment'
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to={APP_ROUTES.ROOT} />} />
        <Route path={APP_ROUTES.ROOT} element={<Login />} />
        <Route
          path={APP_ROUTES.USERS}
          element={
            <PrivateRoute
              permissionKeys={[APP_FEATURE_KEYS.VIEW_ALL_USERS]}
              redirectTo={APP_ROUTES.ROOT}
            >
              <UserManagement />
            </PrivateRoute>
          }
        />
        <Route
          path={APP_ROUTES.SBU}
          element={
            <PrivateRoute
              permissionKeys={[APP_FEATURE_KEYS.VIEW_ALL_SBU]}
              redirectTo={APP_ROUTES.ROOT}
            >
              <SbuManagement />
            </PrivateRoute>
          }
        />
        <Route
          path={APP_ROUTES.CLIENTS}
          element={
            <PrivateRoute
              permissionKeys={[APP_FEATURE_KEYS.VIEW_ALL_CLIENTS]}
              redirectTo={APP_ROUTES.ROOT}
            >
              <ClientManagement />
            </PrivateRoute>
          }
        />
        <Route
          path={APP_ROUTES.TEAMS}
          element={
            <PrivateRoute
              permissionKeys={[APP_FEATURE_KEYS.VIEW_ALL_PROJECTS]}
              redirectTo={APP_ROUTES.ROOT}
            >
              <TeamManagement />
            </PrivateRoute>
          }
        />
        <Route
          path={APP_ROUTES.BANNERS}
          element={
            <PrivateRoute
              permissionKeys={[APP_FEATURE_KEYS.VIEW_ALL_BANNERS]}
              redirectTo={APP_ROUTES.ROOT}
            >
              <BannerManagement />
            </PrivateRoute>
          }
        />
        <Route
          path={APP_ROUTES.RESIGNATIONS}
          element={
            <PrivateRoute
              permissionKeys={[APP_FEATURE_KEYS.VIEW_ALL_RESIGNATIONS]}
              redirectTo={APP_ROUTES.ROOT}
            >
              <ResignationManagement />
            </PrivateRoute>
          }
        />
        <Route
          path={APP_ROUTES.BADGE}
          element={
            <PrivateRoute
              permissionKeys={[APP_FEATURE_KEYS.VIEW_ALL_BADGES]}
              redirectTo={APP_ROUTES.ROOT}
            >
              <BadgeManagement />
            </PrivateRoute>
          }
        />
        <Route
          path={APP_ROUTES.FLYER}
          element={
            <PrivateRoute
              permissionKeys={[APP_FEATURE_KEYS.VIEW_FLYERS]}
              redirectTo={APP_ROUTES.ROOT}
            >
              <FlyersManagement />
            </PrivateRoute>
          }
        />
        <Route
          path={APP_ROUTES.ROLE_MANAGEMENT}
          element={
            <PrivateRoute
              permissionKeys={[APP_FEATURE_KEYS.MANAGE_FEATURE_PERMISSIONS]}
              redirectTo={APP_ROUTES.ROOT}
            >
              <RoleManagement />
            </PrivateRoute>
          }
        />
        <Route
          path={APP_ROUTES.EDIT_USER}
          element={
            <PrivateRoute permissionKeys={[]} redirectTo={APP_ROUTES.ROOT}>
              <EditUser />
            </PrivateRoute>
          }
        />
        <Route
          path={APP_ROUTES.BADGE_ASSIGNMENT}
          element={
            <PrivateRoute
              permissionKeys={[APP_FEATURE_KEYS.CREATE_BADGE_ASSIGNMENT]}
              redirectTo={APP_ROUTES.ROOT}
            >
              <BadgeAssignment />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
export default AppRoutes
