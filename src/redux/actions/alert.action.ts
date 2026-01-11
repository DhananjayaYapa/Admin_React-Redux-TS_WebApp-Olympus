import {
  BANNER_ACTION_TYPES,
  COMMON_ACTION_TYPES,
  RESIGNATION_ACTION_TYPES,
  CLIENT_ACTION_TYPES,
  SBU_ACTION_TYPES,
  USER_ACTION_TYPES,
  ROLE_ACTION_TYPES,
  FLYER_ACTION_TYPES,
  BADGE_ACTION_TYPES,
  ENTITLEMENTS_ACTION_TYPES,
} from '../../utilities/constants'

const clearPostBannerAlert = () => {
  return { type: BANNER_ACTION_TYPES.POST_BANNER + COMMON_ACTION_TYPES.CLEAR_ALERT }
}
const clearUpdateBannerAlert = () => {
  return { type: BANNER_ACTION_TYPES.UPDATE_BANNER + COMMON_ACTION_TYPES.CLEAR_ALERT }
}
const clearDeleteBannerAlert = () => {
  return { type: BANNER_ACTION_TYPES.DELETE_BANNER + COMMON_ACTION_TYPES.CLEAR_ALERT }
}
const clearPostResignationAlert = () => {
  return { type: RESIGNATION_ACTION_TYPES.POST_RESIGNATION + COMMON_ACTION_TYPES.CLEAR_ALERT }
}
const clearPostSbuAlert = () => {
  return { type: SBU_ACTION_TYPES.POST_SBU + COMMON_ACTION_TYPES.CLEAR_ALERT }
}
const clearUpdateSbuAlert = () => {
  return { type: SBU_ACTION_TYPES.UPDATE_SBU + COMMON_ACTION_TYPES.CLEAR_ALERT }
}
const clearPostClientAlert = () => {
  return { type: CLIENT_ACTION_TYPES.POST_CLIENT + COMMON_ACTION_TYPES.CLEAR_ALERT }
}
const clearUpdateClientAlert = () => {
  return { type: CLIENT_ACTION_TYPES.UPDATE_CLIENT + COMMON_ACTION_TYPES.CLEAR_ALERT }
}
const clearPostCommentAlert = () => {
  return { type: RESIGNATION_ACTION_TYPES.POST_COMMENT + COMMON_ACTION_TYPES.CLEAR_ALERT }
}
const clearUpdateResignationAlert = () => {
  return {
    type: RESIGNATION_ACTION_TYPES.UPDATE_RESIGNATION + COMMON_ACTION_TYPES.CLEAR_ALERT,
  }
}
//user
export const clearPostUserAlert = () => ({
  type: USER_ACTION_TYPES.CREATE_USER + COMMON_ACTION_TYPES.CLEAR_ALERT,
})

export const setPostUserAlert = (payload: {
  message: string
  severity: 'success' | 'error' | 'info' | 'warning'
}) => ({
  type: 'SET_POST_USER_ALERT',
  payload,
})

// user - update status
export const setUpdateUserStatusAlert = (
  message: string,
  severity: 'success' | 'error' | 'info' | 'warning'
) => ({
  type: USER_ACTION_TYPES.UPDATE_USER_STATUS + COMMON_ACTION_TYPES.SET_ALERT_REQ,
  message,
  severity,
})
export const clearUpdateUserStatusAlert = () => ({
  type: USER_ACTION_TYPES.UPDATE_USER_STATUS + COMMON_ACTION_TYPES.CLEAR_ALERT,
})
const clearUpdatePermissionAlert = () => {
  return {
    type: ROLE_ACTION_TYPES.UPDATE_PERMISSION + COMMON_ACTION_TYPES.CLEAR_ALERT,
  }
}
const clearPostFlyerAlert = () => {
  return {
    type: FLYER_ACTION_TYPES.POST_FLYER + COMMON_ACTION_TYPES.CLEAR_ALERT,
  }
}
const clearDeleteFlyerAlert = () => {
  return {
    type: FLYER_ACTION_TYPES.DELETE_FLYER + COMMON_ACTION_TYPES.CLEAR_ALERT,
  }
}
const clearUpdateUserDetailsAlert = () => {
  return {
    type: USER_ACTION_TYPES.UPDATE_USER_DETAILS + COMMON_ACTION_TYPES.CLEAR_ALERT,
  }
}
const clearPostBadgeAlert = () => {
  return {
    type: BADGE_ACTION_TYPES.POST_BADGE + COMMON_ACTION_TYPES.CLEAR_ALERT,
  }
}

const clearUpdateBadgeAlert = () => {
  return {
    type: BADGE_ACTION_TYPES.UPDATE_BADGE + COMMON_ACTION_TYPES.CLEAR_ALERT,
  }
}
const clearAllocationBadgeAlert = () => {
  return {
    type: BADGE_ACTION_TYPES.POST_ALLOCATION + COMMON_ACTION_TYPES.CLEAR_ALERT,
  }
}

const clearUpdateAllocationBadgeAlert = () => {
  return {
    type: BADGE_ACTION_TYPES.UPDATE_ALLOCATION + COMMON_ACTION_TYPES.CLEAR_ALERT,
  }
}

const clearRemoveBadgeAllocationAlert = () => {
  return {
    type: BADGE_ACTION_TYPES.REMOVE_BADGE_ALLOCATION + COMMON_ACTION_TYPES.CLEAR_ALERT,
  }
}
const clearSaveEntitlementAlert = () => {
  return {
    type: ENTITLEMENTS_ACTION_TYPES.SAVE_USER_ENTITLEMENTS + COMMON_ACTION_TYPES.CLEAR_ALERT,
  }
}

export const alertActions = {
  clearPostBannerAlert,
  clearUpdateBannerAlert,
  clearDeleteBannerAlert,
  clearPostResignationAlert,
  clearPostUserAlert,
  setPostUserAlert,
  clearPostSbuAlert,
  clearUpdateSbuAlert,
  clearPostClientAlert,
  clearUpdateClientAlert,
  clearPostCommentAlert,
  clearUpdateResignationAlert,
  clearUpdateUserStatusAlert,
  setUpdateUserStatusAlert,
  clearUpdatePermissionAlert,
  clearPostFlyerAlert,
  clearDeleteFlyerAlert,
  clearUpdateUserDetailsAlert,
  clearPostBadgeAlert,
  clearUpdateBadgeAlert,
  clearAllocationBadgeAlert,
  clearUpdateAllocationBadgeAlert,
  clearRemoveBadgeAllocationAlert,
  clearSaveEntitlementAlert,
}
