import { COMMON_ACTION_TYPES, USER_ACTION_TYPES } from '../../utilities/constants'

const INITIAL_STATE = {
  createUser: {
    isLoading: false,
    data: [],
    error: null,
    success: false,
  },
  getUserList: {
    isLoading: false,
    data: [],
    error: null,
  },
  getUserDesignations: {
    isLoading: false,
    data: [],
    error: null,
  },
  updateUserStatus: {
    isLoading: false,
    data: [],
    error: null,
    success: false,
  },
  getUserBriefList: {
    isLoading: false,
    data: [],
    error: null,
  },
  updateUserDetails: {
    isLoading: false,
    data: [],
    error: null,
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const userReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case USER_ACTION_TYPES.CREATE_USER + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        createUser: {
          ...state.createUser,
          isLoading: true,
          error: null,
          success: false,
        },
      }

    case USER_ACTION_TYPES.CREATE_USER + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        createUser: {
          isLoading: false,
          data: action.data,
          error: null,
          success: true,
        },
      }

    case USER_ACTION_TYPES.CREATE_USER + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        createUser: {
          isLoading: false,
          data: [],
          error: action.error,
          success: false,
        },
      }

    // UPDATE USER STATUS
    case USER_ACTION_TYPES.UPDATE_USER_STATUS + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        updateUserStatus: {
          ...state.updateUserStatus,
          isLoading: true,
          error: null,
          success: false,
        },
      }

    case USER_ACTION_TYPES.UPDATE_USER_STATUS + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        updateUserStatus: {
          isLoading: false,
          data: action.data,
          error: null,
          success: true,
        },
      }

    case USER_ACTION_TYPES.UPDATE_USER_STATUS + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        updateUserStatus: {
          isLoading: false,
          data: [],
          error: action.error,
          success: false,
        },
      }

    // CLEAR SUCCESS / RESET CREATE USER STATE
    case USER_ACTION_TYPES.CREATE_USER + COMMON_ACTION_TYPES.CLEAR:
      return {
        ...state,
        createUser: {
          isLoading: false,
          data: [],
          error: null,
          success: false,
        },
      }

    case USER_ACTION_TYPES.GET_USER_LIST + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        getUserList: {
          ...state.getUserList,
          isLoading: true,
          data: [],
          error: null,
        },
      }

    case USER_ACTION_TYPES.GET_USER_LIST + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        getUserList: {
          isLoading: false,
          data: action.data,
          error: null,
        },
      }

    case USER_ACTION_TYPES.GET_USER_LIST + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        getUserList: {
          isLoading: false,
          data: [],
          error: action.error,
        },
      }

    case USER_ACTION_TYPES.GET_USER_DESIGNATIONS + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        getUserDesignations: {
          ...state.getUserDesignations,
          isLoading: true,
          data: [],
          error: null,
        },
      }

    case USER_ACTION_TYPES.GET_USER_DESIGNATIONS + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        getUserDesignations: {
          isLoading: false,
          data: action.data,
          error: null,
        },
      }

    case USER_ACTION_TYPES.GET_USER_DESIGNATIONS + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        getUserDesignations: {
          isLoading: false,
          data: [],
          error: action.error,
        },
      }
    case USER_ACTION_TYPES.GET_USER_BRIEF_LIST + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        getUserBriefList: {
          ...state.getUserBriefList,
          isLoading: true,
          data: [],
          error: null,
        },
      }
    case USER_ACTION_TYPES.GET_USER_BRIEF_LIST + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        getUserBriefList: {
          isLoading: false,
          data: action.data,
          error: null,
        },
      }
    case USER_ACTION_TYPES.GET_USER_BRIEF_LIST + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        getUserBriefList: {
          isLoading: false,
          data: [],
          error: action.error,
        },
      }
    case USER_ACTION_TYPES.UPDATE_USER_DETAILS + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        updateUserDetails: {
          ...state.updateUserDetails,
          isLoading: true,
          data: [],
          error: null,
        },
      }
    case USER_ACTION_TYPES.UPDATE_USER_DETAILS + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        updateUserDetails: {
          isLoading: false,
          data: action.data,
          error: null,
        },
      }
    case USER_ACTION_TYPES.UPDATE_USER_DETAILS + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        updateUserDetails: {
          isLoading: false,
          data: [],
          error: action.error,
        },
      }
    default:
      return state
  }
}

export default userReducer
