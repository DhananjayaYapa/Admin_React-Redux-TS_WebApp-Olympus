import { COMMON_ACTION_TYPES, RESIGNATION_ACTION_TYPES } from '../../utilities/constants'

const INITIAL_STATE = {
  createResignation: {
    isLoading: false,
    data: [],
    error: null,
  },
  getResignationList: {
    isLoading: false,
    data: [],
    error: null,
  },
  createComment: {
    isLoading: false,
    data: [],
    error: null,
  },
  getStatusList: {
    isLoading: false,
    data: [],
    error: null,
  },
  updateResignation: {
    isLoading: false,
    data: [],
    error: null,
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resignationreducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case RESIGNATION_ACTION_TYPES.POST_RESIGNATION + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        createResignation: {
          ...state.createResignation,
          isLoading: true,
          error: null,
        },
      }
    case RESIGNATION_ACTION_TYPES.POST_RESIGNATION + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        createResignation: {
          ...state.createResignation,
          isLoading: false,
          data: action.data,
          error: null,
        },
      }
    case RESIGNATION_ACTION_TYPES.POST_RESIGNATION + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        createResignation: {
          ...state.createResignation,
          isLoading: false,
          error: action.error,
        },
      }
    case RESIGNATION_ACTION_TYPES.GET_RESIGNATION_LIST + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        getResignationList: {
          ...state.getResignationList,
          isLoading: true,
          error: null,
        },
      }
    case RESIGNATION_ACTION_TYPES.GET_RESIGNATION_LIST + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        getResignationList: {
          ...state.getResignationList,
          isLoading: false,
          data: action.data,
          error: null,
        },
      }
    case RESIGNATION_ACTION_TYPES.GET_RESIGNATION_LIST + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        getResignationList: {
          ...state.getResignationList,
          isLoading: false,
          error: action.error,
        },
      }
    case RESIGNATION_ACTION_TYPES.POST_COMMENT + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        createComment: {
          ...state.createComment,
          isLoading: true,
          data: [],
          error: null,
        },
      }
    case RESIGNATION_ACTION_TYPES.POST_COMMENT + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        createComment: {
          ...state.createComment,
          isLoading: false,
          data: action.data,
          error: null,
        },
      }
    case RESIGNATION_ACTION_TYPES.POST_COMMENT + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        createComment: {
          ...state.createComment,
          isLoading: false,
          data: [],
          error: action.error,
        },
      }
    case RESIGNATION_ACTION_TYPES.GET_STATUS_LIST + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        getStatusList: {
          ...state.getStatusList,
          isLoading: true,
          data: [],
          error: null,
        },
      }
    case RESIGNATION_ACTION_TYPES.GET_STATUS_LIST + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        getStatusList: {
          ...state.getStatusList,
          isLoading: false,
          data: action.data,
          error: null,
        },
      }
    case RESIGNATION_ACTION_TYPES.GET_STATUS_LIST + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        getStatusList: {
          ...state.getStatusList,
          isLoading: false,
          data: [],
          error: action.error,
        },
      }
    case RESIGNATION_ACTION_TYPES.UPDATE_RESIGNATION + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        updateResignation: {
          ...state.updateResignation,
          isLoading: true,
          data: [],
          error: null,
        },
      }
    case RESIGNATION_ACTION_TYPES.UPDATE_RESIGNATION + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        updateResignation: {
          ...state.updateResignation,
          isLoading: false,
          data: action.data,
          error: null,
        },
      }
    case RESIGNATION_ACTION_TYPES.UPDATE_RESIGNATION + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        updateResignation: {
          ...state.updateResignation,
          isLoading: false,
          data: [],
          error: action.error,
        },
      }
    default:
      return state
  }
}

export default resignationreducer
