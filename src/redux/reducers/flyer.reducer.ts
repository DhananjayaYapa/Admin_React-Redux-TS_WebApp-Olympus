import { COMMON_ACTION_TYPES, FLYER_ACTION_TYPES } from '../../utilities/constants'

const INITIAL_FLYER_STATE = {
  getFlyerTags: {
    isLoading: false,
    data: [],
    error: null,
  },
  postFlyer: {
    isLoading: false,
    data: [],
    error: null,
  },
  getFlyerList: {
    isLoading: false,
    data: [],
    error: null,
  },
  deleteFlyer: {
    isLoading: false,
    data: [],
    error: null,
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const flyerReducer = (state = INITIAL_FLYER_STATE, action: any) => {
  switch (action.type) {
    case FLYER_ACTION_TYPES.GET_FLYER_TAGS + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        getFlyerTags: {
          ...state.getFlyerTags,
          isLoading: true,
          data: [],
          error: null,
        },
      }
    case FLYER_ACTION_TYPES.GET_FLYER_TAGS + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        getFlyerTags: {
          ...state.getFlyerTags,
          isLoading: false,
          data: action.data,
          error: null,
        },
      }
    case FLYER_ACTION_TYPES.GET_FLYER_TAGS + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        getFlyerTags: {
          ...state.getFlyerTags,
          isLoading: false,
          data: [],
          error: action.error,
        },
      }
    case FLYER_ACTION_TYPES.POST_FLYER + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        postFlyer: {
          ...state.postFlyer,
          isLoading: true,
          data: [],
          error: null,
        },
      }
    case FLYER_ACTION_TYPES.POST_FLYER + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        postFlyer: {
          ...state.postFlyer,
          isLoading: false,
          data: action.data,
          error: null,
        },
      }
    case FLYER_ACTION_TYPES.POST_FLYER + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        postFlyer: {
          ...state.postFlyer,
          isLoading: false,
          data: [],
          error: action.error,
        },
      }
    case FLYER_ACTION_TYPES.GET_FLYER_LIST + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        getFlyerList: {
          ...state.getFlyerList,
          isLoading: true,
          data: [],
          error: null,
        },
      }
    case FLYER_ACTION_TYPES.GET_FLYER_LIST + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        getFlyerList: {
          ...state.getFlyerList,
          isLoading: false,
          data: action.data,
          error: null,
        },
      }
    case FLYER_ACTION_TYPES.GET_FLYER_LIST + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        getFlyerList: {
          ...state.getFlyerList,
          isLoading: false,
          data: [],
          error: action.error,
        },
      }
    case FLYER_ACTION_TYPES.DELETE_FLYER + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        deleteFlyer: {
          ...state.deleteFlyer,
          isLoading: true,
          data: [],
          error: null,
        },
      }
    case FLYER_ACTION_TYPES.DELETE_FLYER + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        deleteFlyer: {
          ...state.deleteFlyer,
          isLoading: false,
          data: action.data,
          error: null,
        },
      }
    case FLYER_ACTION_TYPES.DELETE_FLYER + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        deleteFlyer: {
          ...state.deleteFlyer,
          isLoading: false,
          data: [],
          error: action.error,
        },
      }
    default:
      return state
  }
}

export default flyerReducer
