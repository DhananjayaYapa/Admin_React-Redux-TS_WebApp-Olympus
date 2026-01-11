import { APP_CONFIGS } from './../utilities/constants/config.constants'
import axios from 'axios'

import { exceptionHandler } from '../core'
import { authService } from './auth.service'
import type { UserRoleDto } from '../utilities/models'
import CryptoJS from 'crypto-js'
import { msalInstance } from '../index'
import { InteractionRequiredAuthError } from '@azure/msal-browser'
axios.defaults.baseURL = APP_CONFIGS.API_BASE

export const axiosPublicInstance = axios.create()
export const axiosPrivateInstance = axios.create()

// Request interceptor to manage authorization & headers
axiosPrivateInstance.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (request: any) => {
    const msalRequest = {
      scopes: APP_CONFIGS.APP_SCOPES,
    }
    const tokenResponse = await msalInstance
      .acquireTokenSilent(msalRequest)
      .catch((error: Error) => {
        if (error instanceof InteractionRequiredAuthError) {
          // fallback to interaction when silent call fails
          return msalInstance.acquireTokenRedirect(msalRequest)
        }
      })

    request.headers.Authorization = `Bearer ${tokenResponse?.accessToken}`
    request.headers['Application-key'] = APP_CONFIGS.APPLICATION_ID

    const _encryptedUserRole = await authService.fetchActiveUserRole()
    if (_encryptedUserRole) {
      const bytes =
        _encryptedUserRole !== '' &&
        CryptoJS.AES.decrypt(_encryptedUserRole, APP_CONFIGS.DATA_ENC_SECRET)
      const activeUserRole: UserRoleDto = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
      request.headers['user-role'] = activeUserRole.userRoleKey
    }

    return request
  },
  (error) => {
    // eslint-disable-next-line no-console
    console.log('Req interceptor Error', error)
  }
)

// Response interceptor to manage responses & errors
axiosPrivateInstance.interceptors.response.use(
  async (response) => {
    return response
  },
  async (error) => {
    return Promise.reject(await exceptionHandler(error.response))
  }
)

axiosPublicInstance.interceptors.response.use(
  async (response) => {
    return response
  },
  async (error) => {
    return Promise.reject(await exceptionHandler(error.response))
  }
)

// Response interceptor to manage responses & errors
axiosPublicInstance.interceptors.response.use(
  async (response) => {
    return response
  },
  async (error) => {
    return Promise.reject(await exceptionHandler(error.response))
  }
)

export * from './auth.service'
export * from './banner.service'
export * from './team.service'
export * from './user.service'
export * from './resignation.service'
export * from './sbu.service'
export * from './client.service'
export * from './role.service'
export * from './application.service'
export * from './flyer.service'
export * from './badge.service'
export * from './entitlements.service'
export * from './leaves.service'
