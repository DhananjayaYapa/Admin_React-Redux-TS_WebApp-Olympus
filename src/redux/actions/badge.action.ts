import { BADGE_ACTION_TYPES, COMMON_ACTION_TYPES } from '../../utilities/constants'
import type {
  AllocationListQueryParamsDto,
  AssignBadgePayload,
  BadgeListQueryParamsDto,
  BriefUserListQueryParamsDto,
  CreateBadgeDto,
  RemoveBadgeAllocationDto,
  UpdateAssignBadgeDto,
  UpdateBadgeDto,
} from '../../utilities/models/badge.model'

const getBadgeList = (params: BadgeListQueryParamsDto) => {
  return {
    type: BADGE_ACTION_TYPES.GET_BADGE_LIST + COMMON_ACTION_TYPES.REQUEST,
    params: params,
  }
}
const getAllocationList = (params: AllocationListQueryParamsDto) => {
  return {
    type: BADGE_ACTION_TYPES.GET_ALLOCATION_LIST + COMMON_ACTION_TYPES.REQUEST,
    params: params,
  }
}

const getUserBrief = (params: BriefUserListQueryParamsDto) => {
  return {
    type: BADGE_ACTION_TYPES.GET_USER_BRIEF + COMMON_ACTION_TYPES.REQUEST,
    params: params,
  }
}

const postBadge = (payload: CreateBadgeDto) => {
  return {
    type: BADGE_ACTION_TYPES.POST_BADGE + COMMON_ACTION_TYPES.REQUEST,
    payload: payload,
  }
}

const postAllocation = (payload: AssignBadgePayload) => {
  return {
    type: BADGE_ACTION_TYPES.POST_ALLOCATION + COMMON_ACTION_TYPES.REQUEST,
    payload: payload,
  }
}

const updateBadge = (payload: UpdateBadgeDto) => {
  return {
    type: BADGE_ACTION_TYPES.UPDATE_BADGE + COMMON_ACTION_TYPES.REQUEST,
    payload: payload,
  }
}

const updateAllocation = (payload: UpdateAssignBadgeDto) => {
  return {
    type: BADGE_ACTION_TYPES.UPDATE_ALLOCATION + COMMON_ACTION_TYPES.REQUEST,
    payload: payload,
  }
}

const removeBadgeAllocation = (payload: RemoveBadgeAllocationDto) => {
  return {
    type: BADGE_ACTION_TYPES.REMOVE_BADGE_ALLOCATION + COMMON_ACTION_TYPES.REQUEST,
    payload: payload,
  }
}

export const badgeActions = {
  getBadgeList,
  postBadge,
  updateBadge,
  getAllocationList,
  postAllocation,
  updateAllocation,
  getUserBrief,
  removeBadgeAllocation,
}
