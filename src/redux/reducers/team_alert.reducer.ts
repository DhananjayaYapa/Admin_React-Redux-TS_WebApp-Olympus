import { TEAM_ACTION_TYPES, COMMON_ACTION_TYPES } from '../../utilities/constants'
import type { AlertActionDto } from '../../utilities/models'

const INITIAL_STATE = {
  postTeamAlert: {
    message: null,
    serverity: null,
  },
  updateTeamAlert: {
    message: null,
    serverity: null,
  },

}

const teamAlertReducer = (state = INITIAL_STATE, action: AlertActionDto) => {
  switch (action.type) {
    case TEAM_ACTION_TYPES.POST_TEAM + COMMON_ACTION_TYPES.SET_ALERT:
      return {
        ...state,
        postTeamAlert: {
          message: action.message,
          serverity: action.severity,
        },
      }
    case TEAM_ACTION_TYPES.POST_TEAM + COMMON_ACTION_TYPES.CLEAR_ALERT:
      return {
        ...state,
        postTeamAlert: {
          message: null,
          serverity: null,
        },
      }
    case TEAM_ACTION_TYPES.UPDATE_TEAM + COMMON_ACTION_TYPES.SET_ALERT:
      return {
        ...state,
         updateTeamAlert: {
          message: action.message,
          serverity: action.severity,
        },
      }
    case TEAM_ACTION_TYPES.UPDATE_TEAM + COMMON_ACTION_TYPES.CLEAR_ALERT:
      return {
        ...state,
        updateTeamAlert: {
          message: null,
          serverity: null,
        },
      }
    default:
      return state
  }
}

export default teamAlertReducer
