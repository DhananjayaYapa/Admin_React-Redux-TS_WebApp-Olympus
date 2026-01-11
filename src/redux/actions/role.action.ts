import { COMMON_ACTION_TYPES, ROLE_ACTION_TYPES } from '../../utilities/constants'
import type { CreatePermissionsDto, getUserRoleQueryParams } from '../../utilities/models'

const getUserRoles = (params: getUserRoleQueryParams) => {
  return {
    type: ROLE_ACTION_TYPES.GET_USERROLE_LIST + COMMON_ACTION_TYPES.REQUEST,
    params,
    applicationId: params.applicationId,
  }
}

const clearUserRoles = () => {
  return {
    type: ROLE_ACTION_TYPES.CLEAR_USER_ROLES,
  }
}

const getFeaturesList = (params: getUserRoleQueryParams) => {
  return {
    type: ROLE_ACTION_TYPES.GET_FEATURE_LIST + COMMON_ACTION_TYPES.REQUEST,
    params,
  }
}

const updatePermission = (params: CreatePermissionsDto) => {
  return {
    type: ROLE_ACTION_TYPES.UPDATE_PERMISSION + COMMON_ACTION_TYPES.REQUEST,
    params,
  }
}

export const roleActions = {
  getUserRoles,
  clearUserRoles,
  getFeaturesList,
  updatePermission,
}
