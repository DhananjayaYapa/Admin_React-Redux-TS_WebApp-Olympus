import { axiosPrivateInstance } from '.'
import type {
  AllocationListQueryParamsDto,
  AssignBadgePayload,
  BadgeListQueryParamsDto,
  BriefUserListQueryParamsDto,
  CreateBadgeDto,
  RemoveBadgeAllocationDto,
  UpdateBadgeDto,
} from '../utilities/models/badge.model'

const getBadgeList = (params: BadgeListQueryParamsDto) => {
  return axiosPrivateInstance.get('/core/api/v1/badges', { params: params })
}

const postBadge = (payload: CreateBadgeDto) => {
  return axiosPrivateInstance.post('/core/api/v1/badges', payload)
}

const updateBadge = (payload: UpdateBadgeDto) => {
  return axiosPrivateInstance.put('/core/api/v1/badges', payload)
}

const getAllocationList = (params: AllocationListQueryParamsDto) => {
  return axiosPrivateInstance.get('/core/api/v1/badges/allocations', { params: params })
}

const postAllocation = (payload: AssignBadgePayload) => {
  return axiosPrivateInstance.post('/core/api/v1/badges/allocations', payload)
}

const updateAllocation = (payload: UpdateBadgeDto) => {
  return axiosPrivateInstance.put(`/core/api/v1/badges/revoke/?id=${payload.id}`, payload.id)
}

const getUserBrief = (params: BriefUserListQueryParamsDto) => {
  return axiosPrivateInstance.get('/core/api/v1/brief/users', { params: params })
}

const removeBadgeAllocation = (payload: RemoveBadgeAllocationDto) => {
  return axiosPrivateInstance.put(`/core/api/v1/badges/revoke/?id=${payload.id}`, payload.id)
}
export const badgeService = {
  getBadgeList,
  postBadge,
  updateBadge,
  getAllocationList,
  postAllocation,
  updateAllocation,
  getUserBrief,
  removeBadgeAllocation,
}
