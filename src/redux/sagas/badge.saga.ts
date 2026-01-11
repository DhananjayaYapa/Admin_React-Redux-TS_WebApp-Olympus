import { call, put, takeEvery } from 'redux-saga/effects'
import { badgeService } from '../../service'
import { dispatchAlert } from '../../utilities/helpers'
import type {
  AllocationListQueryParamsDto,
  AssignBadgePayload,
  BadgeListQueryParamsDto,
  BriefUserListQueryParamsDto,
  CreateBadgeDto,
  RemoveBadgeAllocationDto,
  UpdateAssignBadgeDto,
  UpdateBadgeDto,
} from '../../utilities/models/badge.model'
import { BADGE_ACTION_TYPES, COMMON_ACTION_TYPES } from '../../utilities/constants'

function* getBadgeList(action: { type: string; params: BadgeListQueryParamsDto }) {
  try {
    // @ts-expect-error-ignore
    const badgeList = yield call(badgeService.getBadgeList, action.params)
    yield put({
      type: BADGE_ACTION_TYPES.GET_BADGE_LIST + COMMON_ACTION_TYPES.SUCCESS,
      data: badgeList.data,
    })
  } catch (error) {
    yield put({
      type: BADGE_ACTION_TYPES.GET_BADGE_LIST + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
  }
}
function* getAllocationList(action: { type: string; params: AllocationListQueryParamsDto }) {
  try {
    // @ts-expect-error-ignore
    const allocationList = yield call(badgeService.getAllocationList, action.params)
    yield put({
      type: BADGE_ACTION_TYPES.GET_ALLOCATION_LIST + COMMON_ACTION_TYPES.SUCCESS,
      data: allocationList.data,
    })
  } catch (error) {
    yield put({
      type: BADGE_ACTION_TYPES.GET_ALLOCATION_LIST + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
  }
}
function* getUserBrief(action: { type: string; params: BriefUserListQueryParamsDto }) {
  try {
    // @ts-expect-error-ignore
    const briefUserList = yield call(badgeService.getUserBrief, action.params)
    yield put({
      type: BADGE_ACTION_TYPES.GET_USER_BRIEF + COMMON_ACTION_TYPES.SUCCESS,
      data: briefUserList.data,
    })
  } catch (error) {
    yield put({
      type: BADGE_ACTION_TYPES.GET_USER_BRIEF + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
  }
}

function* postBadge(action: { type: string; payload: CreateBadgeDto }) {
  try {
    // @ts-expect-error-ignore
    const badge = yield call(badgeService.postBadge, action.payload)
    yield put({
      type: BADGE_ACTION_TYPES.POST_BADGE + COMMON_ACTION_TYPES.SUCCESS,
      data: badge.data,
    })
    yield* dispatchAlert(BADGE_ACTION_TYPES.POST_BADGE, badge.data.message, 'success')
    yield put({
      type: BADGE_ACTION_TYPES.GET_BADGE_LIST + COMMON_ACTION_TYPES.REQUEST,
      params: {
        getDisabled: true,
      },
    })
  } catch (error) {
    put({
      type: BADGE_ACTION_TYPES.POST_BADGE + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
    yield* dispatchAlert(BADGE_ACTION_TYPES.POST_BADGE, error as string, 'error')
  }
}
function* postAllocation(action: { type: string; payload: AssignBadgePayload }) {
  try {
    // @ts-expect-error-ignore
    const allocation = yield call(badgeService.postAllocation, action.payload)
    yield put({
      type: BADGE_ACTION_TYPES.POST_ALLOCATION + COMMON_ACTION_TYPES.SUCCESS,
      data: allocation.data,
    })
    yield* dispatchAlert(BADGE_ACTION_TYPES.POST_ALLOCATION, allocation.data.message, 'success')
  } catch (error) {
    put({
      type: BADGE_ACTION_TYPES.POST_ALLOCATION + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
    yield* dispatchAlert(BADGE_ACTION_TYPES.POST_ALLOCATION, error as string, 'error')
  }
}

function* updateBadge(action: { type: string; payload: UpdateBadgeDto }) {
  try {
    // @ts-expect-error-ignore
    const updateBadge = yield call(badgeService.updateBadge, action.payload)
    yield put({
      type: BADGE_ACTION_TYPES.UPDATE_BADGE + COMMON_ACTION_TYPES.SUCCESS,
      data: updateBadge.data,
    })
    yield* dispatchAlert(BADGE_ACTION_TYPES.UPDATE_BADGE, updateBadge.data.message, 'success')

    yield put({
      type: BADGE_ACTION_TYPES.GET_BADGE_LIST + COMMON_ACTION_TYPES.REQUEST,
      params: {
        getDisabled: true,
      },
    })
  } catch (error) {
    put({
      type: BADGE_ACTION_TYPES.UPDATE_BADGE + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
    yield* dispatchAlert(BADGE_ACTION_TYPES.UPDATE_BADGE, error as string, 'error')
  }
}
function* updateAllocation(action: { type: string; payload: UpdateAssignBadgeDto }) {
  try {
    // @ts-expect-error-ignore
    const updateAllocation = yield call(badgeService.updateAllocation, action.payload)
    yield put({
      type: BADGE_ACTION_TYPES.UPDATE_ALLOCATION + COMMON_ACTION_TYPES.SUCCESS,
      data: updateAllocation.data,
    })
    yield* dispatchAlert(
      BADGE_ACTION_TYPES.UPDATE_ALLOCATION,
      updateAllocation.data.message,
      'success'
    )

    yield put({
      type: BADGE_ACTION_TYPES.GET_ALLOCATION_LIST + COMMON_ACTION_TYPES.REQUEST,
      params: {
        getDisabled: false,
        badgeId: action.payload.badgeId,
      },
    })
  } catch (error) {
    put({
      type: BADGE_ACTION_TYPES.UPDATE_ALLOCATION + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
    yield* dispatchAlert(BADGE_ACTION_TYPES.UPDATE_ALLOCATION, error as string, 'error')
  }
}

function* removeBadgeAllocation(action: { type: string; payload: RemoveBadgeAllocationDto }) {
  try {
    // @ts-expect-error-ignore
    const removeAllocation = yield call(badgeService.removeBadgeAllocation, action.payload)
    yield put({
      type: BADGE_ACTION_TYPES.REMOVE_BADGE_ALLOCATION + COMMON_ACTION_TYPES.SUCCESS,
      data: removeAllocation.data,
    })
    yield* dispatchAlert(
      BADGE_ACTION_TYPES.REMOVE_BADGE_ALLOCATION,
      removeAllocation.data.message,
      'success'
    )
  } catch (error) {
    yield put({
      type: BADGE_ACTION_TYPES.REMOVE_BADGE_ALLOCATION + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
    yield* dispatchAlert(BADGE_ACTION_TYPES.REMOVE_BADGE_ALLOCATION, error as string, 'error')
  }
}

function* badgeSaga() {
  yield takeEvery(BADGE_ACTION_TYPES.GET_BADGE_LIST + COMMON_ACTION_TYPES.REQUEST, getBadgeList)
  yield takeEvery(BADGE_ACTION_TYPES.POST_BADGE + COMMON_ACTION_TYPES.REQUEST, postBadge)
  yield takeEvery(BADGE_ACTION_TYPES.UPDATE_BADGE + COMMON_ACTION_TYPES.REQUEST, updateBadge)
  yield takeEvery(
    BADGE_ACTION_TYPES.GET_ALLOCATION_LIST + COMMON_ACTION_TYPES.REQUEST,
    getAllocationList
  )
  yield takeEvery(BADGE_ACTION_TYPES.POST_ALLOCATION + COMMON_ACTION_TYPES.REQUEST, postAllocation)
  yield takeEvery(
    BADGE_ACTION_TYPES.UPDATE_ALLOCATION + COMMON_ACTION_TYPES.REQUEST,
    updateAllocation
  )
  yield takeEvery(BADGE_ACTION_TYPES.GET_USER_BRIEF + COMMON_ACTION_TYPES.REQUEST, getUserBrief)
  yield takeEvery(
    BADGE_ACTION_TYPES.REMOVE_BADGE_ALLOCATION + COMMON_ACTION_TYPES.REQUEST,
    removeBadgeAllocation
  )
}

export default badgeSaga
