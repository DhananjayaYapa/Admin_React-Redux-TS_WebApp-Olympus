import { COMMON_ACTION_TYPES, ENTITLEMENTS_ACTION_TYPES } from '../../utilities/constants'
import type { EmployeeUsernameDto, saveEntitlementDto } from '../../utilities/models'

const getUserEntitlements = (params: EmployeeUsernameDto) => {
  return {
    type: ENTITLEMENTS_ACTION_TYPES.GET_USER_ENTITLEMENTS + COMMON_ACTION_TYPES.REQUEST,
    params,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setUserEntitlements = (data: any[]) => {
  return {
    type: ENTITLEMENTS_ACTION_TYPES.SET_USER_ENTITLEMENTS,
    data,
  }
}

const saveUserEntitlements = (payload: saveEntitlementDto, username: string) => {
  return {
    type: ENTITLEMENTS_ACTION_TYPES.SAVE_USER_ENTITLEMENTS + COMMON_ACTION_TYPES.REQUEST,
    payload,
    username,
  }
}

export const entitlementsActions = {
  getUserEntitlements,
  setUserEntitlements,
  saveUserEntitlements,
}
