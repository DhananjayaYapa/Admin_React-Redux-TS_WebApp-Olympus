import { CLIENT_ACTION_TYPES, COMMON_ACTION_TYPES } from '../../utilities/constants'

const INITIAL_STATE = {
  postClient: {
    isLoading: false,
    data: [],
    error: null,
  },
  getClientList: {
    isLoading: false,
    data: [],
    error: null,
  },
  updateClient: {
    isLoading: false,
    data: [],
    error: null,
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const clientReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case CLIENT_ACTION_TYPES.POST_CLIENT + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        postClient: {
          ...state.postClient,
          isLoading: true,
          data: [],
        },
      }
    case CLIENT_ACTION_TYPES.POST_CLIENT + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        postClient: {
          ...state.postClient,
          isLoading: false,
          data: action.data,
        },
      }
    case CLIENT_ACTION_TYPES.POST_CLIENT + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        postClient: {
          ...state.postClient,
          isLoading: false,
          error: action.error,
        },
      }
    case CLIENT_ACTION_TYPES.GET_CLIENT_LIST + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        getClientList: {
          ...state.getClientList,
          isLoading: true,
          data: [],
          error: null,
        },
      }
    case CLIENT_ACTION_TYPES.GET_CLIENT_LIST + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        getClientList: {
          ...state.getClientList,
          isLoading: false,
          data: action.data,
          error: null,
        },
      }
    case CLIENT_ACTION_TYPES.GET_CLIENT_LIST + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        getClientList: {
          ...state.getClientList,
          isLoading: false,
          data: action.error,
          error: action.error,
        },
      }
    case CLIENT_ACTION_TYPES.UPDATE_CLIENT + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        updateClient: {
          ...state.updateClient,
          isLoading: true,
          data: [],
        },
      }
    case CLIENT_ACTION_TYPES.UPDATE_CLIENT + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        updateClient: {
          ...state.updateClient,
          isLoading: false,
          data: action.data,
        },
      }
    case CLIENT_ACTION_TYPES.UPDATE_CLIENT + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        updateClient: {
          ...state.updateClient,
          isLoading: false,
          error: action.error,
        },
      }
    default:
      return state
  }
}

export default clientReducer
