import { axiosPrivateInstance } from '.'
import type {
  CreateUserDto,
  UpdateUserDto,
  UpdateUserStatusDto,
  UserListBriefQueryParamsDto,
  UserListQueryParamsDto,
} from '../utilities/models/users.model'

// CREATE USER
const createUser = (payload: CreateUserDto) => {
  return axiosPrivateInstance.post('/core/api/v1/users', payload)
}

// USER LIST (v2)
const getUserList = (params: UserListQueryParamsDto) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cleanedParams: any = {}
  Object.keys(params).forEach((key) => {
    const value = params[key as keyof UserListQueryParamsDto]

    cleanedParams[key] = value === null || value === undefined ? '' : value
  })

  return axiosPrivateInstance.get('/core/api/v2/users', {
    params: cleanedParams,
    paramsSerializer: (p) => {
      return Object.entries(p)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
    },
  })
}

// DESIGNATION LIST
const getUserDesignationList = () => {
  return axiosPrivateInstance.get('/core/api/v1/designations')
}

// UPDATE USER STATUS
const updateUserStatus = (payload: UpdateUserStatusDto) => {
  return axiosPrivateInstance.patch('/core/api/v1/users', payload)
}

const getUserBriefList = (params: UserListBriefQueryParamsDto) => {
  return axiosPrivateInstance.get('/core/api/v1/brief/users', { params: params })
}

const updateUserDetails = (payload: UpdateUserDto) => {
  return axiosPrivateInstance.patch('/core/api/v1/users', payload)
}

// EXPORT SERVICE
export const userService = {
  createUser,
  getUserList,
  getUserDesignationList,
  updateUserStatus,
  getUserBriefList,
  updateUserDetails,
}
