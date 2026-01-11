import { COMMON_ACTION_TYPES, ROLE_ACTION_TYPES } from '../../utilities/constants'

const INITIAL_ROLE_STATE = {
  getUserRoles: {
    isLoading: {} as Record<number, boolean>, // Loading state per applicationId
    data: {} as Record<number, unknown[]>, // Data keyed by applicationId
    error: {} as Record<number, string | null>, // Error state per applicationId
  },
  getFeatures: {
    isLoading: false,
    data: [],
    error: null,
  },
  updatePermission: {
    isLoading: false,
    data: [],
    error: null,
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const roleReducer = (state = INITIAL_ROLE_STATE, action: any) => {
  switch (action.type) {
    case ROLE_ACTION_TYPES.GET_USERROLE_LIST + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        getUserRoles: {
          ...state.getUserRoles,
          isLoading: {
            ...state.getUserRoles.isLoading,
            [action.applicationId]: true,
          },
          error: {
            ...state.getUserRoles.error,
            [action.applicationId]: null,
          },
        },
      }
    case ROLE_ACTION_TYPES.GET_USERROLE_LIST + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        getUserRoles: {
          ...state.getUserRoles,
          isLoading: {
            ...state.getUserRoles.isLoading,
            [action.applicationId]: false,
          },
          data: {
            ...state.getUserRoles.data,
            [action.applicationId]: action.data,
          },
        },
      }
    case ROLE_ACTION_TYPES.GET_USERROLE_LIST + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        getUserRoles: {
          ...state.getUserRoles,
          isLoading: {
            ...state.getUserRoles.isLoading,
            [action.applicationId]: false,
          },
          data: {
            ...state.getUserRoles.data,
            [action.applicationId]: [],
          },
          error: {
            ...state.getUserRoles.error,
            [action.applicationId]: action.error,
          },
        },
      }
    case ROLE_ACTION_TYPES.CLEAR_USER_ROLES:
      return {
        ...state,
        getUserRoles: {
          isLoading: {},
          data: {},
          error: {},
        },
      }
    case ROLE_ACTION_TYPES.GET_FEATURE_LIST + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        getFeatures: {
          ...state.getFeatures,
          isLoading: true,
          data: [],
          error: null,
        },
      }
    case ROLE_ACTION_TYPES.GET_FEATURE_LIST + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        getFeatures: {
          ...state.getFeatures,
          isLoading: false,
          data: action.data,
        },
      }
    case ROLE_ACTION_TYPES.GET_FEATURE_LIST + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        getFeatures: {
          ...state.getFeatures,
          isLoading: false,
          data: [],
          error: action.error,
        },
      }
    case ROLE_ACTION_TYPES.UPDATE_PERMISSION + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        updatePermission: {
          ...state.updatePermission,
          isLoading: true,
          data: [],
          error: null,
        },
      }
    case ROLE_ACTION_TYPES.UPDATE_PERMISSION + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        updatePermission: {
          ...state.updatePermission,
          isLoading: false,
          data: action.data,
          error: null,
        },
      }
    case ROLE_ACTION_TYPES.UPDATE_PERMISSION + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        updatePermission: {
          ...state.updatePermission,
          isLoading: false,
          data: [],
          error: action.error,
        },
      }
    default:
      return state
  }
}

export default roleReducer
