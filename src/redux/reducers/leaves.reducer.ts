import { COMMON_ACTION_TYPES, LEAVES_ACTION_TYPES } from '../../utilities/constants'

const INITIAL_STATE = {
  getAllLeaveCounts: {
    isLoading: false,
    data: [],
    error: null,
  },
  userLeaveCounts: {
    isLoading: false,
    data: [],
    error: null,
  },
  updateLeaveCounts: {
    isLoading: false,
    data: [],
    error: null,
  },
  addLeaveCount: {
    isLoading: false,
    data: [],
    error: null,
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const leavesReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case LEAVES_ACTION_TYPES.GET_ALL_LEAVE_COUNTS + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        getAllLeaveCounts: {
          isLoading: true,
          data: [],
          error: null,
        },
      }
    case LEAVES_ACTION_TYPES.GET_ALL_LEAVE_COUNTS + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        getAllLeaveCounts: {
          isLoading: false,
          data: action.data,
          error: null,
        },
      }
    case LEAVES_ACTION_TYPES.GET_ALL_LEAVE_COUNTS + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        getAllLeaveCounts: {
          isLoading: false,
          data: [],
          error: action.error,
        },
      }
    case LEAVES_ACTION_TYPES.GET_USER_LEAVE_COUNTS + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        userLeaveCounts: {
          isLoading: true,
          data: [],
          error: null,
        },
      }
    case LEAVES_ACTION_TYPES.GET_USER_LEAVE_COUNTS + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        userLeaveCounts: {
          isLoading: false,
          data: action.data,
          error: null,
        },
      }
    case LEAVES_ACTION_TYPES.GET_USER_LEAVE_COUNTS + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        userLeaveCounts: {
          isLoading: false,
          data: [],
          error: action.error,
        },
      }
    case LEAVES_ACTION_TYPES.UPDATE_LEAVE_COUNTS + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        updateLeaveCounts: {
          isLoading: true,
          data: [],
          error: null,
        },
      }
    case LEAVES_ACTION_TYPES.UPDATE_LEAVE_COUNTS + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        updateLeaveCounts: {
          isLoading: false,
          data: action.data,
          error: null,
        },
      }
    case LEAVES_ACTION_TYPES.UPDATE_LEAVE_COUNTS + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        updateLeaveCounts: {
          isLoading: false,
          data: [],
          error: action.error,
        },
      }
    case LEAVES_ACTION_TYPES.ADD_LEAVE_COUNT + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        addLeaveCount: {
          isLoading: true,
          data: [],
          error: null,
        },
      }
    case LEAVES_ACTION_TYPES.ADD_LEAVE_COUNT + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        addLeaveCount: {
          isLoading: false,
          data: action.data,
          error: null,
        },
      }
    case LEAVES_ACTION_TYPES.ADD_LEAVE_COUNT + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        addLeaveCount: {
          isLoading: false,
          data: [],
          error: action.error,
        },
      }
    default:
      return state
  }
}

export default leavesReducer
