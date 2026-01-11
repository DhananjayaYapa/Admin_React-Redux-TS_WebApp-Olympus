import { TEAM_ACTION_TYPES, COMMON_ACTION_TYPES } from '../../utilities/constants'

const INITIAL_STATE = {
  postTeam: {
    isLoading: false,
    data: [],
  },
  getTeamList: {
    isLoading: false,
    data: [],
    error: null,
  },
  updateTeam: {
    isLoading: false,
    data: [],
    error: null,
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const teamReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case TEAM_ACTION_TYPES.POST_TEAM + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        postTeam: {
          ...state.postTeam,
          isLoading: true,
        },
      }

    case TEAM_ACTION_TYPES.POST_TEAM + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        postTeam: {
          ...state.postTeam,
          isLoading: false,
          data: action.data,
        },
      }

    case TEAM_ACTION_TYPES.POST_TEAM + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        postTeam: {
          ...state.postTeam,
          isLoading: false,
          data: action.error,
        },
      }

    case TEAM_ACTION_TYPES.GET_TEAM_LIST + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        getTeamList: {
          ...state.getTeamList,
          isLoading: true,
          data: [],
          error: null,
        },
      }

    case TEAM_ACTION_TYPES.GET_TEAM_LIST + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        getTeamList: {
          ...state.getTeamList,
          isLoading: false,
          data: action.data,
          error: null,
        },
      }

    case TEAM_ACTION_TYPES.GET_TEAM_LIST + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        getTeamList: {
          ...state.getTeamList,
          isLoading: false,
          data: action.error,
        },
      }

    case TEAM_ACTION_TYPES.UPDATE_TEAM + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        updateTeam: {
          ...state.updateTeam,
          isLoading: true,
          data: [],
          error: null,
        },
      }

    case TEAM_ACTION_TYPES.UPDATE_TEAM + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        updateTeam: {
          ...state.updateTeam,
          isLoading: false,
          data: action.data,
          error: null,
        },
      }

    case TEAM_ACTION_TYPES.UPDATE_TEAM + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        updateTeam: {
          ...state.updateTeam,
          isLoading: false,
          data: action.error,
        },
      }
    default:
      return state
  }
}

export default teamReducer
