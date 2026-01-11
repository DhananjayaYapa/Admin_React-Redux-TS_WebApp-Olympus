import { call, put, takeEvery } from 'redux-saga/effects'
import { resignationService } from '../../service'
import type {
  CreateCommentDto,
  postResignationDto,
  ResignationListQueryParamsDto,
  StatusListQueryParamsDto,
  UpdateResignationDto,
} from '../../utilities/models'
import { COMMON_ACTION_TYPES, RESIGNATION_ACTION_TYPES } from '../../utilities/constants'
import { dispatchAlert } from '../../utilities/helpers'

function* createResignation(action: { type: string; payload: postResignationDto }) {
  try {
    // @ts-expect-error-ignore
    const createdResignation = yield call(resignationService.createResignation, action.payload)

    yield put({
      type: RESIGNATION_ACTION_TYPES.POST_RESIGNATION + COMMON_ACTION_TYPES.SUCCESS,
      data: createdResignation.data,
    })
    yield* dispatchAlert(
      RESIGNATION_ACTION_TYPES.POST_RESIGNATION,
      createdResignation.data.message,
      'success'
    )
  } catch (error) {
    yield put({
      type: RESIGNATION_ACTION_TYPES.POST_RESIGNATION + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
    yield* dispatchAlert(RESIGNATION_ACTION_TYPES.POST_RESIGNATION, error as string, 'error')
  }
}

function* getResignationList(action: { type: string; params: ResignationListQueryParamsDto }) {
  try {
    // @ts-expect-error-ignore
    const ResignationList = yield call(resignationService.getResignationList, action.params)
    yield put({
      type: RESIGNATION_ACTION_TYPES.GET_RESIGNATION_LIST + COMMON_ACTION_TYPES.SUCCESS,
      data: ResignationList.data,
    })
  } catch (error) {
    yield put({
      type: RESIGNATION_ACTION_TYPES.GET_RESIGNATION_LIST + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
    yield* dispatchAlert(RESIGNATION_ACTION_TYPES.GET_RESIGNATION_LIST, error as string, 'error')
  }
}

function* createComment(action: { type: string; params: CreateCommentDto }) {
  try {
    // @ts-expect-error-ignore
    const createdComment = yield call(resignationService.createComment, action.params)
    yield put({
      type: RESIGNATION_ACTION_TYPES.POST_COMMENT + COMMON_ACTION_TYPES.SUCCESS,
      data: createdComment.data,
    })
    yield* dispatchAlert(
      RESIGNATION_ACTION_TYPES.POST_COMMENT,
      createdComment.data.message,
      'success'
    )
  } catch (error) {
    yield put({
      type: RESIGNATION_ACTION_TYPES.POST_COMMENT + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
    yield* dispatchAlert(RESIGNATION_ACTION_TYPES.POST_COMMENT, error as string, 'error')
  }
}

function* getStatusList(action: { type: string; params: StatusListQueryParamsDto }) {
  try {
    // @ts-expect-error-ignore
    const statusList = yield call(resignationService.getStatusList, action.params)
    yield put({
      type: RESIGNATION_ACTION_TYPES.GET_STATUS_LIST + COMMON_ACTION_TYPES.SUCCESS,
      data: statusList.data,
    })
  } catch (error) {
    yield put({
      type: RESIGNATION_ACTION_TYPES.GET_STATUS_LIST + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
    yield* dispatchAlert(RESIGNATION_ACTION_TYPES.GET_STATUS_LIST, error as string, 'error')
  }
}

function* updateResignation(action: { type: string; payload: UpdateResignationDto }) {
  try {
    // @ts-expect-error-ignore
    const updatedResignation = yield call(resignationService.updateResignation, action.payload)
    yield put({
      type: RESIGNATION_ACTION_TYPES.UPDATE_RESIGNATION + COMMON_ACTION_TYPES.SUCCESS,
      data: updatedResignation.data,
    })
    yield* dispatchAlert(
      RESIGNATION_ACTION_TYPES.UPDATE_RESIGNATION,
      updatedResignation.data.message,
      'success'
    )
  } catch (error) {
    yield put({
      type: RESIGNATION_ACTION_TYPES.UPDATE_RESIGNATION + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
    yield* dispatchAlert(RESIGNATION_ACTION_TYPES.UPDATE_RESIGNATION, error as string, 'error')
  }
}

function* resignationSaga() {
  yield takeEvery(
    RESIGNATION_ACTION_TYPES.POST_RESIGNATION + COMMON_ACTION_TYPES.REQUEST,
    createResignation
  )
  yield takeEvery(
    RESIGNATION_ACTION_TYPES.GET_RESIGNATION_LIST + COMMON_ACTION_TYPES.REQUEST,
    getResignationList
  )
  yield takeEvery(
    RESIGNATION_ACTION_TYPES.POST_COMMENT + COMMON_ACTION_TYPES.REQUEST,
    createComment
  )
  yield takeEvery(
    RESIGNATION_ACTION_TYPES.GET_STATUS_LIST + COMMON_ACTION_TYPES.REQUEST,
    getStatusList
  )
  yield takeEvery(
    RESIGNATION_ACTION_TYPES.UPDATE_RESIGNATION + COMMON_ACTION_TYPES.REQUEST,
    updateResignation
  )
}

export default resignationSaga
