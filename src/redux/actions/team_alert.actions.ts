import { TEAM_ACTION_TYPES, COMMON_ACTION_TYPES } from '../../utilities/constants'

const clearPostTeamAlert = () => {
  return { type: TEAM_ACTION_TYPES.POST_TEAM + COMMON_ACTION_TYPES.CLEAR_ALERT }
}
const clearUpdateTeamAlert = () => {
  return { type: TEAM_ACTION_TYPES.UPDATE_TEAM + COMMON_ACTION_TYPES.CLEAR_ALERT }
}


export const team_alertActions = {
  clearPostTeamAlert,
  clearUpdateTeamAlert,
}
