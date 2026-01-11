import { COMMON_ACTION_TYPES, SBU_ACTION_TYPES } from '../../utilities/constants'

const INITIAL_STATE = {
  postSbu: {
    isLoading: false,
    data: [],
    error: null,
  },
  getAllSbuList: {
    isLoading: false,
    data: [],
    error: null,
  },
  updateSbu: {
    isLoading: false,
    data: [],
    error: null,
  },
  getSbuHierarchy: {
    isLoading: false,
    data: [],
    error: null,
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sbuReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SBU_ACTION_TYPES.POST_SBU + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        postSbu: {
          ...state.postSbu,
          isLoading: true,
          data: [],
        },
      }
    case SBU_ACTION_TYPES.POST_SBU + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        postSbu: {
          ...state.postSbu,
          isLoading: false,
          data: action.data,
        },
      }
    case SBU_ACTION_TYPES.POST_SBU + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        postSbu: {
          ...state.postSbu,
          isLoading: false,
          error: action.error,
        },
      }
    case SBU_ACTION_TYPES.GET_SBU_LIST + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        getAllSbuList: {
          ...state.getAllSbuList,
          isLoading: true,
          data: [],
          error: null,
        },
      }
    case SBU_ACTION_TYPES.GET_SBU_LIST + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        getAllSbuList: {
          ...state.getAllSbuList,
          isLoading: false,
          data: action.data,
          error: null,
        },
      }
    case SBU_ACTION_TYPES.GET_SBU_LIST + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        getAllSbuList: {
          ...state.getAllSbuList,
          isLoading: false,
          data: [],
          error: action.error,
        },
      }
    case SBU_ACTION_TYPES.UPDATE_SBU + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        updateSbu: {
          ...state.updateSbu,
          isLoading: true,
          data: [],
          error: null,
        },
      }
    case SBU_ACTION_TYPES.UPDATE_SBU + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        updateSbu: {
          ...state.updateSbu,
          isLoading: false,
          data: action.data,
          error: null,
        },
      }
    case SBU_ACTION_TYPES.UPDATE_SBU + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        updateSbu: {
          ...state.updateSbu,
          isLoading: false,
          data: [],
          error: action.error,
        },
      }
    case SBU_ACTION_TYPES.GET_SBU_HIERARCHY + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        getSbuHierarchy: {
          ...state.getSbuHierarchy,
          isLoading: true,
          data: [],
          error: null,
        },
      }
    case SBU_ACTION_TYPES.GET_SBU_HIERARCHY + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        getSbuHierarchy: {
          ...state.getSbuHierarchy,
          isLoading: false,
          data: action.data,
          error: null,
        },
      }
    case SBU_ACTION_TYPES.GET_SBU_HIERARCHY + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        getSbuHierarchy: {
          ...state.getSbuHierarchy,
          isLoading: false,
          data: [],
          error: action.error,
        },
      }
    default:
      return state
  }
}

export default sbuReducer
