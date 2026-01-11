import { call, put, takeEvery } from 'redux-saga/effects'
import { COMMON_ACTION_TYPES, LEAVES_ACTION_TYPES } from '../../utilities/constants'
import { leavesService } from '../../service'
import type { LeaveCountPayloadDto, LeavesCountUpdateDto } from '../../utilities/models'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* getAllLeaveCounts(_action: { type: string }) {
  try {
    // @ts-expect-error-ignore
    const leaveCounts = yield call(leavesService.getAllLeaveCounts)
    yield put({
      type: LEAVES_ACTION_TYPES.GET_ALL_LEAVE_COUNTS + COMMON_ACTION_TYPES.SUCCESS,
      data: leaveCounts.data,
    })
  } catch (error) {
    yield put({
      type: LEAVES_ACTION_TYPES.GET_ALL_LEAVE_COUNTS + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
  }
}

function* userLeaveCounts(action: { type: string; payload: LeaveCountPayloadDto }) {
  try {
    // @ts-expect-error-ignore
    const userLeaveCount = yield call(leavesService.userLeaveCounts, action.payload)
    yield put({
      type: LEAVES_ACTION_TYPES.GET_USER_LEAVE_COUNTS + COMMON_ACTION_TYPES.SUCCESS,
      data: userLeaveCount.data,
    })
  } catch (error) {
    yield put({
      type: LEAVES_ACTION_TYPES.GET_USER_LEAVE_COUNTS + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
  }
}

function* updateLeaveCounts(action: { type: string; payload: LeavesCountUpdateDto }) {
  try {
    // @ts-expect-error-ignore
    const updatedLeaveCounts = yield call(leavesService.updateLeaveCounts, action.payload)
    yield put({
      type: LEAVES_ACTION_TYPES.UPDATE_LEAVE_COUNTS + COMMON_ACTION_TYPES.SUCCESS,
      data: updatedLeaveCounts.data,
    })
  } catch (error) {
    yield put({
      type: LEAVES_ACTION_TYPES.UPDATE_LEAVE_COUNTS + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
  }
}

function* addLeaveCount(action: { type: string; payload: LeavesCountUpdateDto }) {
  try {
    // @ts-expect-error-ignore
    const addedLeaveCount = yield call(leavesService.addLeaveCount, action.payload)
    yield put({
      type: LEAVES_ACTION_TYPES.ADD_LEAVE_COUNT + COMMON_ACTION_TYPES.SUCCESS,
      data: addedLeaveCount.data,
    })
  } catch (error) {
    yield put({
      type: LEAVES_ACTION_TYPES.ADD_LEAVE_COUNT + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
  }
}

function* leavesSaga() {
  yield takeEvery(
    LEAVES_ACTION_TYPES.GET_ALL_LEAVE_COUNTS + COMMON_ACTION_TYPES.REQUEST,
    getAllLeaveCounts
  )
  yield takeEvery(
    LEAVES_ACTION_TYPES.GET_USER_LEAVE_COUNTS + COMMON_ACTION_TYPES.REQUEST,
    userLeaveCounts
  )
  yield takeEvery(
    LEAVES_ACTION_TYPES.UPDATE_LEAVE_COUNTS + COMMON_ACTION_TYPES.REQUEST,
    updateLeaveCounts
  )
  yield takeEvery(
    LEAVES_ACTION_TYPES.ADD_LEAVE_COUNT + COMMON_ACTION_TYPES.REQUEST,
    addLeaveCount
  )
}
export default leavesSaga
