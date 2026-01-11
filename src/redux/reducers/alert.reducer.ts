import {
  BANNER_ACTION_TYPES,
  USER_ACTION_TYPES,
  CLIENT_ACTION_TYPES,
  COMMON_ACTION_TYPES,
  RESIGNATION_ACTION_TYPES,
  SBU_ACTION_TYPES,
  ROLE_ACTION_TYPES,
  FLYER_ACTION_TYPES,
  BADGE_ACTION_TYPES,
  ENTITLEMENTS_ACTION_TYPES,
} from '../../utilities/constants'
import type { AlertActionDto } from '../../utilities/models'

const INITIAL_STATE = {
  postBannerAlert: {
    message: null,
    serverity: null,
  },
  updateBannerAlert: {
    message: null,
    serverity: null,
  },
  deleteBannerAlert: {
    message: null,
    serverity: null,
  },
  postResignation: {
    message: null,
    serverity: null,
  },
  postComment: {
    message: null,
    serverity: null,
  },
  // user
  postUserAlert: {
    message: null,
    severity: null,
  },
  updateUserAlert: {
    message: null,
    severity: null,
  },
  deleteUserAlert: {
    message: null,
    severity: null,
  },
  postSbu: {
    message: null,
    serverity: null,
  },
  updateSbu: {
    message: null,
    serverity: null,
  },
  postClient: {
    message: null,
    serverity: null,
  },
  updateClient: {
    message: null,
    serverity: null,
  },
  updateResignation: {
    message: null,
    serverity: null,
  },
  updateUserStatusAlert: {
    message: null,
    severity: null,
  },
  UpdatePermissionAlert: {
    message: null,
    severity: null,
  },
  postFlyer: {
    message: null,
    severity: null,
  },
  deleteFlyer: {
    message: null,
    severity: null,
  },
  updateUserDetailsAlert: {
    message: null,
    severity: null,
  },
  postBadgeAlert: {
    message: null,
    serverity: null,
  },
  updateBadgeAlert: {
    message: null,
    serverity: null,
  },
  postAllocationBadgeAlert: {
    message: null,
    serverity: null,
  },
  updateAllocationBadgeAlert: {
    message: null,
    serverity: null,
  },
  removeBadgeAllocation: {
    message: null,
    severity: null,
  },
  saveUserEntitlementAlert: {
    message: null,
    severity: null,
  },
}

const alertReducer = (state = INITIAL_STATE, action: AlertActionDto) => {
  switch (action.type) {
    case BANNER_ACTION_TYPES.POST_BANNER + COMMON_ACTION_TYPES.SET_ALERT:
      return {
        ...state,
        postBannerAlert: {
          message: action.message,
          serverity: action.severity,
        },
      }
    case BANNER_ACTION_TYPES.POST_BANNER + COMMON_ACTION_TYPES.CLEAR_ALERT:
      return {
        ...state,
        postBannerAlert: {
          message: null,
          serverity: null,
        },
      }
    case BANNER_ACTION_TYPES.UPDATE_BANNER + COMMON_ACTION_TYPES.SET_ALERT:
      return {
        ...state,
        postBannerAlert: {
          message: action.message,
          serverity: action.severity,
        },
      }
    case BANNER_ACTION_TYPES.UPDATE_BANNER + COMMON_ACTION_TYPES.CLEAR_ALERT:
      return {
        ...state,
        postBannerAlert: {
          message: null,
          serverity: null,
        },
      }
    case BANNER_ACTION_TYPES.DELETE_BANNER + COMMON_ACTION_TYPES.SET_ALERT:
      return {
        ...state,
        postBannerAlert: {
          message: action.message,
          serverity: action.severity,
        },
      }
    case BANNER_ACTION_TYPES.DELETE_BANNER + COMMON_ACTION_TYPES.CLEAR_ALERT:
      return {
        ...state,
        postBannerAlert: {
          message: null,
          serverity: null,
        },
      }
    case RESIGNATION_ACTION_TYPES.POST_RESIGNATION + COMMON_ACTION_TYPES.SET_ALERT:
      return {
        ...state,
        postResignation: {
          ...state.postResignation,
          message: action.message,
          serverity: action.severity,
        },
      }
    // user
    case USER_ACTION_TYPES.CREATE_USER + COMMON_ACTION_TYPES.SET_ALERT:
      return {
        ...state,
        postUserAlert: {
          message: action.message,
          severity: action.severity,
        },
      }

    case USER_ACTION_TYPES.CREATE_USER + COMMON_ACTION_TYPES.CLEAR_ALERT:
      return {
        ...state,
        postUserAlert: { message: null, severity: null },
      }

    case SBU_ACTION_TYPES.POST_SBU + COMMON_ACTION_TYPES.SET_ALERT:
      return {
        ...state,
        postSbu: {
          ...state.postSbu,
          message: action.message,
          serverity: action.severity,
        },
      }
    case RESIGNATION_ACTION_TYPES.POST_RESIGNATION + COMMON_ACTION_TYPES.CLEAR_ALERT:
      return {
        ...state,
        postResignation: {
          message: null,
          serverity: null,
        },
      }
    case RESIGNATION_ACTION_TYPES.POST_COMMENT + COMMON_ACTION_TYPES.SET_ALERT:
      return {
        ...state,
        postComment: {
          message: action.message,
          serverity: action.severity,
        },
      }
    case RESIGNATION_ACTION_TYPES.POST_COMMENT + COMMON_ACTION_TYPES.CLEAR_ALERT:
      return {
        ...state,
        postComment: {
          message: null,
          serverity: null,
        },
      }
    case SBU_ACTION_TYPES.POST_SBU + COMMON_ACTION_TYPES.CLEAR_ALERT:
      return {
        ...state,
        postSbu: {
          message: null,
          serverity: null,
        },
      }
    case SBU_ACTION_TYPES.UPDATE_SBU + COMMON_ACTION_TYPES.SET_ALERT:
      return {
        ...state,
        updateSbu: {
          ...state.updateSbu,
          message: action.message,
          serverity: action.severity,
        },
      }
    case SBU_ACTION_TYPES.UPDATE_SBU + COMMON_ACTION_TYPES.CLEAR_ALERT:
      return {
        ...state,
        updateSbu: {
          ...state.updateSbu,
          message: null,
          serverity: null,
        },
      }
    case CLIENT_ACTION_TYPES.POST_CLIENT + COMMON_ACTION_TYPES.SET_ALERT:
      return {
        ...state,
        postClient: {
          ...state.postClient,
          message: action.message,
          serverity: action.severity,
        },
      }
    case CLIENT_ACTION_TYPES.POST_CLIENT + COMMON_ACTION_TYPES.CLEAR_ALERT:
      return {
        ...state,
        postClient: {
          message: null,
          serverity: null,
        },
      }
    case CLIENT_ACTION_TYPES.UPDATE_CLIENT + COMMON_ACTION_TYPES.SET_ALERT:
      return {
        ...state,
        updateClient: {
          ...state.updateClient,
          message: action.message,
          serverity: action.severity,
        },
      }
    case CLIENT_ACTION_TYPES.UPDATE_CLIENT + COMMON_ACTION_TYPES.CLEAR_ALERT:
      return {
        ...state,
        updateClient: {
          ...state.updateClient,
          message: null,
          serverity: null,
        },
      }
    case RESIGNATION_ACTION_TYPES.UPDATE_RESIGNATION + COMMON_ACTION_TYPES.SET_ALERT:
      return {
        ...state,
        updateResignation: {
          ...state.updateResignation,
          message: action.message,
          serverity: action.severity,
        },
      }
    case RESIGNATION_ACTION_TYPES.UPDATE_RESIGNATION + COMMON_ACTION_TYPES.CLEAR_ALERT:
      return {
        ...state,
        updateResignation: {
          ...state.updateResignation,
          message: null,
          serverity: null,
        },
      }

    // USER — UPDATE STATUS (SET)
    case USER_ACTION_TYPES.UPDATE_USER_STATUS + COMMON_ACTION_TYPES.SET_ALERT:
      return {
        ...state,
        updateUserStatusAlert: {
          message: action.message,
          severity: action.severity,
        },
      }

    // USER — UPDATE STATUS (CLEAR)
    case USER_ACTION_TYPES.UPDATE_USER_STATUS + COMMON_ACTION_TYPES.CLEAR_ALERT:
      return {
        ...state,
        updateUserStatusAlert: {
          message: null,
          severity: null,
        },
      }
    case ROLE_ACTION_TYPES.UPDATE_PERMISSION + COMMON_ACTION_TYPES.SET_ALERT:
      return {
        ...state,
        UpdatePermissionAlert: {
          message: action.message,
          severity: action.severity,
        },
      }
    case ROLE_ACTION_TYPES.UPDATE_PERMISSION + COMMON_ACTION_TYPES.CLEAR_ALERT:
      return {
        ...state,
        UpdatePermissionAlert: {
          message: null,
          severity: null,
        },
      }
    case FLYER_ACTION_TYPES.POST_FLYER + COMMON_ACTION_TYPES.SET_ALERT:
      return {
        ...state,
        postFlyer: {
          message: action.message,
          severity: action.severity,
        },
      }
    case FLYER_ACTION_TYPES.POST_FLYER + COMMON_ACTION_TYPES.CLEAR_ALERT:
      return {
        ...state,
        postFlyer: {
          message: null,
          severity: null,
        },
      }
    case FLYER_ACTION_TYPES.DELETE_FLYER + COMMON_ACTION_TYPES.SET_ALERT:
      return {
        ...state,
        deleteFlyer: {
          message: action.message,
          severity: action.severity,
        },
      }
    case FLYER_ACTION_TYPES.DELETE_FLYER + COMMON_ACTION_TYPES.CLEAR_ALERT:
      return {
        ...state,
        deleteFlyer: {
          message: null,
          severity: null,
        },
      }
    case USER_ACTION_TYPES.UPDATE_USER_DETAILS + COMMON_ACTION_TYPES.SET_ALERT:
      return {
        ...state,
        updateUserDetailsAlert: {
          message: action.message,
          severity: action.severity,
        },
      }
    case USER_ACTION_TYPES.UPDATE_USER_DETAILS + COMMON_ACTION_TYPES.CLEAR_ALERT:
      return {
        ...state,
        updateUserDetailsAlert: {
          message: null,
          severity: null,
        },
      }
    case BADGE_ACTION_TYPES.POST_BADGE + COMMON_ACTION_TYPES.SET_ALERT:
      return {
        ...state,
        postBadgeAlert: {
          message: action.message,
          serverity: action.severity,
        },
      }
    case BADGE_ACTION_TYPES.POST_BADGE + COMMON_ACTION_TYPES.CLEAR_ALERT:
      return {
        ...state,
        postBadgeAlert: {
          message: null,
          serverity: null,
        },
      }
    case BADGE_ACTION_TYPES.UPDATE_BADGE + COMMON_ACTION_TYPES.SET_ALERT:
      return {
        ...state,
        updateBadgeAlert: {
          message: action.message,
          serverity: action.severity,
        },
      }
    case BADGE_ACTION_TYPES.UPDATE_BADGE + COMMON_ACTION_TYPES.CLEAR_ALERT:
      return {
        ...state,
        updateBadgeAlert: {
          message: null,
          serverity: null,
        },
      }
    case BADGE_ACTION_TYPES.POST_ALLOCATION + COMMON_ACTION_TYPES.SET_ALERT:
      return {
        ...state,
        postAllocationBadgeAlert: {
          message: action.message,
          serverity: action.severity,
        },
      }
    case BADGE_ACTION_TYPES.POST_ALLOCATION + COMMON_ACTION_TYPES.CLEAR_ALERT:
      return {
        ...state,
        postAllocationBadgeAlert: {
          message: null,
          serverity: null,
        },
      }
    case BADGE_ACTION_TYPES.UPDATE_ALLOCATION + COMMON_ACTION_TYPES.SET_ALERT:
      return {
        ...state,
        updateAllocationBadgeAlert: {
          message: action.message,
          serverity: action.severity,
        },
      }
    case BADGE_ACTION_TYPES.UPDATE_ALLOCATION + COMMON_ACTION_TYPES.CLEAR_ALERT:
      return {
        ...state,
        updateAllocationBadgeAlert: {
          message: null,
          serverity: null,
        },
      }
    case BADGE_ACTION_TYPES.REMOVE_BADGE_ALLOCATION + COMMON_ACTION_TYPES.SET_ALERT:
      return {
        ...state,
        removeBadgeAllocation: {
          message: action.message,
          severity: action.severity,
        },
      }
    case BADGE_ACTION_TYPES.REMOVE_BADGE_ALLOCATION + COMMON_ACTION_TYPES.CLEAR_ALERT:
      return {
        ...state,
        removeBadgeAllocation: {
          message: null,
          severity: null,
        },
      }
    case ENTITLEMENTS_ACTION_TYPES.SAVE_USER_ENTITLEMENTS + COMMON_ACTION_TYPES.SET_ALERT:
      return {
        ...state,
        saveUserEntitlementAlert: {
          message: action.message,
          severity: action.severity,
        },
      }
    case ENTITLEMENTS_ACTION_TYPES.SAVE_USER_ENTITLEMENTS + COMMON_ACTION_TYPES.CLEAR_ALERT:
      return {
        ...state,
        saveUserEntitlementAlert: {
          message: null,
          severity: null,
        },
      }
    default:
      return state
  }
}

export default alertReducer
