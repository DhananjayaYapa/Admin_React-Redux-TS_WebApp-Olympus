import { axiosPrivateInstance } from '.'
import type { CreatePermissionsDto, getUserRoleQueryParams } from '../utilities/models'

const getUserRoles = (params: getUserRoleQueryParams) => {
  return axiosPrivateInstance.get(`core/api/v1/applications/${params.applicationId}/userRoles`)
}

const getFeatures = (params: getUserRoleQueryParams) => {
  return axiosPrivateInstance.get(`core/api/v1/applications/${params.applicationId}/features`)
}

const updatePermissions = (params: CreatePermissionsDto) => {
  return axiosPrivateInstance.put(
    `core/api/v1/applications/${params.applicationId}/userRoles/${params.userRoleId}/features`,
    params
  )
}

export const roleService = {
  getUserRoles,
  getFeatures,
  updatePermissions,
}
