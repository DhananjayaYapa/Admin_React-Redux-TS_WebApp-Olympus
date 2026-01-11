import { axiosPrivateInstance } from '.'
import type { EmployeeUsernameDto, saveEntitlementDto } from '../utilities/models'

const getUserEntitlements = (params: EmployeeUsernameDto) => {
  return axiosPrivateInstance.get(`core/api/v1/entitlements/${params.username}`)
}

const saveUserEntitlements = (payload: saveEntitlementDto, username: string) => {
  // API expects an array of entitlements (matching Angular's createEntitlement[])
  return axiosPrivateInstance.post(`core/api/v1/entitlements/${username}`, [payload])
}

export const userEntitlementsService = {
  getUserEntitlements,
  saveUserEntitlements,
}
