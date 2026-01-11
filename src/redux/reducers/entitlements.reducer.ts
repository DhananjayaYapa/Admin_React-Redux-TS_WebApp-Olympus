import { COMMON_ACTION_TYPES, ENTITLEMENTS_ACTION_TYPES } from '../../utilities/constants'

const INITIAL_STATE = {
  getUserEntitlements: {
    isLoading: false,
    data: [],
    error: null,
  },
  saveUserEntitlements: {
    isLoading: false,
    data: [],
    error: null,
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const entitlementsReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case ENTITLEMENTS_ACTION_TYPES.GET_USER_ENTITLEMENTS + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        getUserEntitlements: {
          ...state.getUserEntitlements,
          isLoading: true,
          data: [],
          error: null,
        },
      }
    case ENTITLEMENTS_ACTION_TYPES.GET_USER_ENTITLEMENTS + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        getUserEntitlements: {
          ...state.getUserEntitlements,
          isLoading: false,
          data: action.data,
          error: null,
        },
      }
    case ENTITLEMENTS_ACTION_TYPES.GET_USER_ENTITLEMENTS + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        getUserEntitlements: {
          ...state.getUserEntitlements,
          isLoading: false,
          data: [],
          error: action.error,
        },
      }
    case ENTITLEMENTS_ACTION_TYPES.SET_USER_ENTITLEMENTS:
      return {
        ...state,
        getUserEntitlements: {
          ...state.getUserEntitlements,
          data: action.data,
        },
      }
    case ENTITLEMENTS_ACTION_TYPES.SAVE_USER_ENTITLEMENTS + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        saveUserEntitlements: {
          ...state.saveUserEntitlements,
          isLoading: true,
          data: [],
          error: null,
        },
      }
    case ENTITLEMENTS_ACTION_TYPES.SAVE_USER_ENTITLEMENTS + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        saveUserEntitlements: {
          ...state.saveUserEntitlements,
          isLoading: false,
          data: action.data,
          error: null,
        },
      }
    case ENTITLEMENTS_ACTION_TYPES.SAVE_USER_ENTITLEMENTS + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        saveUserEntitlements: {
          ...state.saveUserEntitlements,
          isLoading: false,
          data: [],
          error: action.error,
        },
      }
    default:
      return state
  }
}

export default entitlementsReducer
