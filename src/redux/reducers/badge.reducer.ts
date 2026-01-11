import { BADGE_ACTION_TYPES, COMMON_ACTION_TYPES } from '../../utilities/constants'

const INITIAL_STATE = {
  getBadgeList: {
    isLoading: false,
    data: [],
    error: null,
  },
  postBadge: {
    isLoading: false,
    data: [],
  },

  updateBadge: {
    isLoading: false,
    data: [],
    error: null,
  },
  getAllocationList: {
    isLoading: false,
    data: [],
    error: null,
  },
  postAllocation: {
    isLoading: false,
    data: [],
  },
  updateAllocation: {
    isLoading: false,
    data: [],
    error: null,
  },
  getUserBrief: {
    isLoading: false,
    data: [],
    error: null,
  },
  removeBadgeAllocation: {
    isLoading: false,
    data: [],
    error: null,
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const badgeReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case BADGE_ACTION_TYPES.GET_BADGE_LIST + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        getBadgeList: {
          ...state.getBadgeList,
          isLoading: true,
          data: [],
          error: null,
        },
      }

    case BADGE_ACTION_TYPES.GET_BADGE_LIST + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        getBadgeList: {
          ...state.getBadgeList,
          isLoading: false,
          data: action.data,
          error: null,
        },
      }

    case BADGE_ACTION_TYPES.GET_BADGE_LIST + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        getBadgeList: {
          ...state.getBadgeList,
          isLoading: false,
          data: action.error,
        },
      }

    case BADGE_ACTION_TYPES.POST_BADGE + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        postBadge: {
          ...state.postBadge,
          isLoading: true,
        },
      }

    case BADGE_ACTION_TYPES.POST_BADGE + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        postBadge: {
          ...state.postBadge,
          isLoading: false,
          data: action.data,
        },
      }

    case BADGE_ACTION_TYPES.POST_BADGE + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        postBAdge: {
          ...state.postBadge,
          isLoading: false,
          data: action.error,
        },
      }

    case BADGE_ACTION_TYPES.UPDATE_BADGE + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        updateBadge: {
          ...state.updateBadge,
          isLoading: true,
          data: [],
          error: null,
        },
      }

    case BADGE_ACTION_TYPES.UPDATE_BADGE + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        updateBadge: {
          ...state.updateBadge,
          isLoading: false,
          data: action.data,
          error: null,
        },
      }

    case BADGE_ACTION_TYPES.UPDATE_BADGE + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        updateBadge: {
          ...state.updateBadge,
          isLoading: false,
          data: action.error,
        },
      }
      case BADGE_ACTION_TYPES.GET_ALLOCATION_LIST + COMMON_ACTION_TYPES.REQUEST:
        return{
          ...state,
          getAllocationList:{
            ...state.getAllocationList,
            isLoading:true,
            data:[],
            error: null
          }
        }
      case BADGE_ACTION_TYPES.GET_ALLOCATION_LIST + COMMON_ACTION_TYPES.SUCCESS:
        return{
          ...state,
          getAllocationList:{
            ...state.getAllocationList,
            isLoading:false,
            data:action.data,
            error:null
          }
        }
      case BADGE_ACTION_TYPES.GET_ALLOCATION_LIST + COMMON_ACTION_TYPES.ERROR:
        return{
          ...state,
          getAllocationList:{
            ...state.getAllocationList,
            isLoading:false,
            data:action.error
          }
        }
      
      case BADGE_ACTION_TYPES.POST_ALLOCATION + COMMON_ACTION_TYPES.REQUEST:
        return{
          ...state,
          postAllocation:{
            ...state.postAllocation,
            isLoading : true
          }
        }
      
      case BADGE_ACTION_TYPES.POST_ALLOCATION + COMMON_ACTION_TYPES.SUCCESS:
        return{
          ...state,
          postAllocation:{
            ...state.postAllocation,
            isLoading:false,
            data:action.data
          }
        }
      case BADGE_ACTION_TYPES.POST_ALLOCATION + COMMON_ACTION_TYPES.ERROR:
        return{
          ...state,
          postAllocation:{
            ...state.postAllocation,
            isLoading:false,
            data: action.error
          }
        }
      case BADGE_ACTION_TYPES.UPDATE_ALLOCATION + COMMON_ACTION_TYPES.REQUEST:
        return{
          ...state,
          updateAllocation:{
            ...state.updateAllocation,
            isLoading:true,
            data:[],
            error:null
          }
        }
        case BADGE_ACTION_TYPES.UPDATE_ALLOCATION + COMMON_ACTION_TYPES.SUCCESS:
          return{
            ...state,
            updateAllocation:{
              ...state.updateAllocation,
              isLoading: false,
              data: action.data,
              error: null
            }
          }
        case BADGE_ACTION_TYPES.UPDATE_ALLOCATION + COMMON_ACTION_TYPES.ERROR:
          return{
            ...state,
            updateAllocation:{
              ...state.updateAllocation,
              isLoading:false,
              data:action.error
            }
          }
        case BADGE_ACTION_TYPES.GET_USER_BRIEF + COMMON_ACTION_TYPES.REQUEST:
          return{
            ...state,
            getUserBrief:{
              ...state.getUserBrief,
              isLoading:true,
              data:[],
              error:null
            }
          }
        case BADGE_ACTION_TYPES.GET_USER_BRIEF + COMMON_ACTION_TYPES.SUCCESS:
          return{
            ...state,
            getUserBrief:{
              ...state.getUserBrief,
              isLoading:false,
              data: action.data,
              error: null
            }
          }
        case BADGE_ACTION_TYPES.GET_USER_BRIEF + COMMON_ACTION_TYPES.ERROR:
          return{
            ...state,
            getUserBrief:{
              ...state.getUserBrief,
              isLoading:false,
              data:action.error
            }
          }
        case BADGE_ACTION_TYPES.REMOVE_BADGE_ALLOCATION + COMMON_ACTION_TYPES.REQUEST:
          return{
            ...state,
            removeBadgeAllocation:{
              ...state.removeBadgeAllocation,
              isLoading:true,
              data:[],
              error:null
            }
          }
        case BADGE_ACTION_TYPES.REMOVE_BADGE_ALLOCATION + COMMON_ACTION_TYPES.SUCCESS:
          return{
            ...state,
            removeBadgeAllocation:{
              ...state.removeBadgeAllocation,
              isLoading:false,
              data: action.data,
              error: null
            }
          }
        case BADGE_ACTION_TYPES.REMOVE_BADGE_ALLOCATION + COMMON_ACTION_TYPES.ERROR:
          return{
            ...state,
            removeBadgeAllocation:{
              ...state.removeBadgeAllocation,
              isLoading:false,
              data:action.error
            }
          }
    default:
      return state
  }
}

export default badgeReducer
