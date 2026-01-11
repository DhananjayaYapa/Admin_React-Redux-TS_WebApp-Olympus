import { BANNER_ACTION_TYPES, COMMON_ACTION_TYPES } from '../../utilities/constants'

const INITIAL_STATE = {
  postBanner: {
    isLoading: false,
    data: [],
  },
  getBannerList: {
    isLoading: false,
    data: [],
    error: null,
  },
  updateBanner: {
    isLoading: false,
    data: [],
    error: null,
  },
  deleteBanner: {
    isLoading: false,
    data: [],
    error: null,
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bannerReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case BANNER_ACTION_TYPES.POST_BANNER + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        postBanner: {
          ...state.postBanner,
          isLoading: true,
        },
      }
    case BANNER_ACTION_TYPES.POST_BANNER + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        postBanner: {
          ...state.postBanner,
          isLoading: false,
          data: action.data,
        },
      }
    case BANNER_ACTION_TYPES.POST_BANNER + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        postBanner: {
          ...state.postBanner,
          isLoading: false,
          data: action.error,
        },
      }
    case BANNER_ACTION_TYPES.GET_BANNER_LIST + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        getBannerList: {
          ...state.getBannerList,
          isLoading: true,
          data: [],
          error: null,
        },
      }
    case BANNER_ACTION_TYPES.GET_BANNER_LIST + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        getBannerList: {
          ...state.getBannerList,
          isLoading: false,
          data: action.data,
          error: null,
        },
      }
    case BANNER_ACTION_TYPES.GET_BANNER_LIST + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        getBannerList: {
          ...state.getBannerList,
          isLoading: false,
          data: action.error,
        },
      }
    case BANNER_ACTION_TYPES.UPDATE_BANNER + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        updateBanner: {
          ...state.updateBanner,
          isLoading: true,
          data: [],
          error: null,
        },
      }
    case BANNER_ACTION_TYPES.UPDATE_BANNER + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        updateBanner: {
          ...state.updateBanner,
          isLoading: false,
          data: action.data,
          error: null,
        },
      }
    case BANNER_ACTION_TYPES.UPDATE_BANNER + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        updateBanner: {
          ...state.updateBanner,
          isLoading: false,
          data: action.error,
        },
      }
    case BANNER_ACTION_TYPES.DELETE_BANNER + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        deleteBanner: {
          ...state.deleteBanner,
          isLoading: true,
          data: [],
          error: null,
        },
      }
    case BANNER_ACTION_TYPES.DELETE_BANNER + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        deleteBanner: {
          ...state.deleteBanner,
          isLoading: false,
          data: action.data,
          error: null,
        },
      }
    case BANNER_ACTION_TYPES.DELETE_BANNER + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        deleteBanner: {
          ...state.deleteBanner,
          isLoading: false,
          error: action.error,
        },
      }
    default:
      return state
  }
}

export default bannerReducer
