import { call, put, takeEvery } from 'redux-saga/effects'
import { flyerService } from '../../service'
import { COMMON_ACTION_TYPES, FLYER_ACTION_TYPES } from '../../utilities/constants'
import type {
  CreateFlyerDto,
  FlyerDeleteDto,
  FlyerListQueryParamsDto,
} from '../../utilities/models'
import { dispatchAlert } from '../../utilities/helpers'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* getFlyerTags(_action: { type: string }) {
  try {
    // @ts-expect-error-ignore
    const flyerTags = yield call(flyerService.getFlyerTags)
    yield put({
      type: FLYER_ACTION_TYPES.GET_FLYER_TAGS + COMMON_ACTION_TYPES.SUCCESS,
      data: flyerTags.data,
    })
  } catch (error) {
    yield put({
      type: FLYER_ACTION_TYPES.GET_FLYER_TAGS + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
    yield* dispatchAlert(FLYER_ACTION_TYPES.GET_FLYER_TAGS, error as string, 'error')
  }
}

function* postFlyer(action: { type: string; payload: CreateFlyerDto }) {
  try {
    // @ts-expect-error-ignore
    const postedFlyer = yield call(flyerService.postFlyer, action.payload)
    yield put({
      type: FLYER_ACTION_TYPES.POST_FLYER + COMMON_ACTION_TYPES.SUCCESS,
      data: postedFlyer.data,
    })
    yield* dispatchAlert(FLYER_ACTION_TYPES.POST_FLYER, postedFlyer.data.message, 'success')
    yield* getFlyerList({
      type: FLYER_ACTION_TYPES.GET_FLYER_LIST + COMMON_ACTION_TYPES.REQUEST,
      params: {},
    })
  } catch (error) {
    yield put({
      type: FLYER_ACTION_TYPES.POST_FLYER + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
    yield* dispatchAlert(FLYER_ACTION_TYPES.POST_FLYER, error as string, 'error')
  }
}

function* getFlyerList(action: { type: string; params: FlyerListQueryParamsDto }) {
  try {
    // @ts-expect-error-ignore
    const flyerList = yield call(flyerService.getFlyerList, action.params)
    yield put({
      type: FLYER_ACTION_TYPES.GET_FLYER_LIST + COMMON_ACTION_TYPES.SUCCESS,
      data: flyerList.data,
    })
  } catch (error) {
    yield put({
      type: FLYER_ACTION_TYPES.GET_FLYER_LIST + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
    yield* dispatchAlert(FLYER_ACTION_TYPES.GET_FLYER_LIST, error as string, 'error')
  }
}

function* deleteFlyer(action: { type: string; params: FlyerDeleteDto }) {
  try {
    // @ts-expect-error-ignore
    const deletedFlyer = yield call(flyerService.deleteFlyer, action.params)
    yield put({
      type: FLYER_ACTION_TYPES.DELETE_FLYER + COMMON_ACTION_TYPES.SUCCESS,
      data: deletedFlyer.data,
    })
    yield* dispatchAlert(FLYER_ACTION_TYPES.DELETE_FLYER, deletedFlyer.data.message, 'success')
    yield* getFlyerList({
      type: FLYER_ACTION_TYPES.GET_FLYER_LIST + COMMON_ACTION_TYPES.REQUEST,
      params: {},
    })
  } catch (error) {
    yield put({
      type: FLYER_ACTION_TYPES.DELETE_FLYER + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
    yield* dispatchAlert(FLYER_ACTION_TYPES.DELETE_FLYER, error as string, 'error')
  }
}

function* flyerSaga() {
  yield takeEvery(FLYER_ACTION_TYPES.GET_FLYER_TAGS + COMMON_ACTION_TYPES.REQUEST, getFlyerTags)
  yield takeEvery(FLYER_ACTION_TYPES.POST_FLYER + COMMON_ACTION_TYPES.REQUEST, postFlyer)
  yield takeEvery(FLYER_ACTION_TYPES.GET_FLYER_LIST + COMMON_ACTION_TYPES.REQUEST, getFlyerList)
  yield takeEvery(FLYER_ACTION_TYPES.DELETE_FLYER + COMMON_ACTION_TYPES.REQUEST, deleteFlyer)
}

export default flyerSaga
