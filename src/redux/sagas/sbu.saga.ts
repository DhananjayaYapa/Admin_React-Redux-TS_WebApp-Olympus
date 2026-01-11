import { call, put, takeEvery } from 'redux-saga/effects'
import { sbuService } from '../../service'
import type { CreateSbuDto, SubListQueryParamsDto, UpdateSbuDto } from '../../utilities/models'
import { COMMON_ACTION_TYPES, SBU_ACTION_TYPES } from '../../utilities/constants'
import { dispatchAlert } from '../../utilities/helpers'

function* postSbu(action: { type: string; payload: CreateSbuDto }) {
  try {
    // @ts-expect-error-ignore
    const createdSbu = yield call(sbuService.postSbu, action.payload)
    yield put({
      type: SBU_ACTION_TYPES.POST_SBU + COMMON_ACTION_TYPES.SUCCESS,
      data: createdSbu.data,
    })
    yield* dispatchAlert(SBU_ACTION_TYPES.POST_SBU, createdSbu.data.message, 'success')
    yield put({
      type: SBU_ACTION_TYPES.GET_SBU_LIST + COMMON_ACTION_TYPES.REQUEST,
      params: {
        getDisabled: true,
        getAll: true,
      },
    })
  } catch (error) {
    yield put({
      type: SBU_ACTION_TYPES.POST_SBU + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
    yield* dispatchAlert(SBU_ACTION_TYPES.POST_SBU, error as string, 'error')
  }
}

function* getAllSbuList(action: { type: string; params: SubListQueryParamsDto }) {
  try {
    // @ts-expect-error-ignore
    const sbuList = yield call(sbuService.getAllSbuList, action.params)
    yield put({
      type: SBU_ACTION_TYPES.GET_SBU_LIST + COMMON_ACTION_TYPES.SUCCESS,
      data: sbuList.data,
    })
  } catch (error) {
    yield put({
      type: SBU_ACTION_TYPES.GET_SBU_LIST + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
    yield* dispatchAlert(SBU_ACTION_TYPES.GET_SBU_LIST, error as string, 'error')
  }
}

function* updateSbu(action: { type: string; payload: UpdateSbuDto }) {
  try {
    // @ts-expect-error-ignore
    const updatedSbu = yield call(sbuService.updateSbu, action.payload)
    yield put({
      type: SBU_ACTION_TYPES.UPDATE_SBU + COMMON_ACTION_TYPES.SUCCESS,
      data: updatedSbu.data,
    })
    yield* dispatchAlert(SBU_ACTION_TYPES.UPDATE_SBU, updatedSbu.data.message, 'success')
    yield put({
      type: SBU_ACTION_TYPES.GET_SBU_LIST + COMMON_ACTION_TYPES.REQUEST,
      params: {
        getDisabled: true,
        getAll: true,
      },
    })
  } catch (error) {
    yield put({
      type: SBU_ACTION_TYPES.UPDATE_SBU + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
    yield* dispatchAlert(SBU_ACTION_TYPES.UPDATE_SBU, error as string, 'error')
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* getSbuHierarchy(_action: { type: string }) {
  try {
    // @ts-expect-error-ignore
    const sbuHierarchy = yield call(sbuService.getSbuHierarchy)
    yield put({
      type: SBU_ACTION_TYPES.GET_SBU_HIERARCHY + COMMON_ACTION_TYPES.SUCCESS,
      data: sbuHierarchy.data,
    })
  } catch (error) {
    yield put({
      type: SBU_ACTION_TYPES.GET_SBU_HIERARCHY + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
  }
}
function* sbuSaga() {
  yield takeEvery(SBU_ACTION_TYPES.POST_SBU + COMMON_ACTION_TYPES.REQUEST, postSbu)
  yield takeEvery(SBU_ACTION_TYPES.GET_SBU_LIST + COMMON_ACTION_TYPES.REQUEST, getAllSbuList)
  yield takeEvery(SBU_ACTION_TYPES.UPDATE_SBU + COMMON_ACTION_TYPES.REQUEST, updateSbu)
  yield takeEvery(SBU_ACTION_TYPES.GET_SBU_HIERARCHY + COMMON_ACTION_TYPES.REQUEST, getSbuHierarchy)
}

export default sbuSaga
