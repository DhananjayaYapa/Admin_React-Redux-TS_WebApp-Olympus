import {
  APPLICATION_ACTION_TYPES,
  COMMON_ACTION_TYPES,
  
} from '../../utilities/constants'

const INITIAL_STATE = {
  getAppList: {
    isLoading: false,
    data: [],
    error: null,
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const applicationReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case APPLICATION_ACTION_TYPES.GET_APPLICATION_LIST + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        getAppList: {
          ...state.getAppList,
          isLoading: true,
          data: [],
          error: null,
        },
      }
    case APPLICATION_ACTION_TYPES.GET_APPLICATION_LIST + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        getAppList: {
          ...state.getAppList,
          isLoading: false,
          data: action.data,
          error: null,
        },
      }
    case APPLICATION_ACTION_TYPES.GET_APPLICATION_LIST + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        getAppList: {
          ...state.getAppList,
          isLoading: false,
          data: action.error,
        },
      }
    default:
      return state
  }
}

export default applicationReducer
