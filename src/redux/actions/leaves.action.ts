import { COMMON_ACTION_TYPES, LEAVES_ACTION_TYPES } from '../../utilities/constants'
import type { LeaveCountPayloadDto, LeavesCountUpdateDto } from '../../utilities/models'

const getAllLeaveCounts = () => {
  return {
    type: LEAVES_ACTION_TYPES.GET_ALL_LEAVE_COUNTS + COMMON_ACTION_TYPES.REQUEST,
  }
}
const userLeaveCounts = (payload: LeaveCountPayloadDto) => {
  return {
    type: LEAVES_ACTION_TYPES.GET_USER_LEAVE_COUNTS + COMMON_ACTION_TYPES.REQUEST,
    payload: payload,
  }
}
const updateLeaveCounts = (payload: LeavesCountUpdateDto) => {
  return {
    type: LEAVES_ACTION_TYPES.UPDATE_LEAVE_COUNTS + COMMON_ACTION_TYPES.REQUEST,
    payload: payload,
  }
}

const addLeaveCount = (payload: LeavesCountUpdateDto) => {
  return {
    type: LEAVES_ACTION_TYPES.ADD_LEAVE_COUNT + COMMON_ACTION_TYPES.REQUEST,
    payload: payload,
  }
}

export const leavesActions = {
  getAllLeaveCounts,
  userLeaveCounts,
  updateLeaveCounts,
  addLeaveCount,
}
