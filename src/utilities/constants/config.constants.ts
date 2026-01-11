export const APP_CONFIGS = {
  APP_OWNER: 'Acentura Inc',
  APP_ENV: import.meta.env.VITE_APP_ENV,
  API_BASE: import.meta.env.VITE_API_BASE,
  // AD Authentication
  AUTHORITY: import.meta.env.VITE_AUTHORITY,
  CLIENT_ID: import.meta.env.VITE_CLIENT_ID,
  REDIRECT_URL: import.meta.env.VITE_REDIRECT_URL,
  POS_REDIRECT_URL: import.meta.env.VITE_POST_REDIRECT_URL,
  APP_SCOPES: [import.meta.env.VITE_APP_SCOPE],
  // APP Client Urls
  ATHENA_CLIENT: import.meta.env.VITE_ATHENA_CLIENT,
  HERMES_CLIENT: import.meta.env.VITE_HERMES_CLIENT,
  DASHBOARD_CLIENT: import.meta.env.VITE_DASHBOARD_CLIENT,
  HERA_CLIENT: import.meta.env.VITE_HERA_CLIENT,
  DEMETER_CLIENT: import.meta.env.VITE_DEMETER_CLIENT,

  // APP ID
  APPLICATION_ID: import.meta.env.VITE_APPLICATION_ID,
  DATA_ENC_SECRET: import.meta.env.VITE_DATA_ENC_SECRET,
  // User CookieADLOlympus
  USER_INFO_COOKIE: 'OlympusAthenaUserInfoCookie',
  USER_AUTHORIZED_ROLES: 'OlympusAthenaUserAuthorizedRoles',
  USER_ACTIVE_ROLE: 'OlympusAthenaUserActiveRole',
}
