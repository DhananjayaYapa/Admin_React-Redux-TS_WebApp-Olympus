import { call, put, takeEvery } from 'redux-saga/effects'
import { clientService } from '../../service'
import type {
  CreateClientDto,
  ClientListQueryParamsDto,
  UpdateClientDto,
} from '../../utilities/models'
import { CLIENT_ACTION_TYPES, COMMON_ACTION_TYPES } from '../../utilities/constants'
import { dispatchAlert } from '../../utilities/helpers'

function* postClient(action: { type: string; payload: CreateClientDto }) {
  try {
    // @ts-expect-error-ignore
    const createdClient = yield call(clientService.postClient, action.payload)
    yield put({
      type: CLIENT_ACTION_TYPES.POST_CLIENT + COMMON_ACTION_TYPES.SUCCESS,
      data: createdClient.data,
    })
    yield* dispatchAlert(CLIENT_ACTION_TYPES.POST_CLIENT, createdClient.data.message, 'success')
    yield put({
      type: CLIENT_ACTION_TYPES.GET_CLIENT_LIST + COMMON_ACTION_TYPES.REQUEST,
      payload: {},
    })
  } catch (error) {
    yield put({
      type: CLIENT_ACTION_TYPES.POST_CLIENT + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
    yield* dispatchAlert(CLIENT_ACTION_TYPES.POST_CLIENT, error as string, 'error')
  }
}

function* getClientList(action: { type: string; payload: ClientListQueryParamsDto }) {
  try {
    // @ts-expect-error-ignore
    const clientList = yield call(clientService.getClientList, action.payload)
    yield put({
      type: CLIENT_ACTION_TYPES.GET_CLIENT_LIST + COMMON_ACTION_TYPES.SUCCESS,
      data: clientList.data,
    })
  } catch (error) {
    yield put({
      type: CLIENT_ACTION_TYPES.GET_CLIENT_LIST + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
    yield* dispatchAlert(CLIENT_ACTION_TYPES.GET_CLIENT_LIST, error as string, 'error')
  }
}

function* updateClient(action: { type: string; payload: UpdateClientDto }) {
  try {
    // @ts-expect-error-ignore
    const updatedClient = yield call(clientService.updateClient, action.payload)
    yield put({
      type: CLIENT_ACTION_TYPES.UPDATE_CLIENT + COMMON_ACTION_TYPES.SUCCESS,
      data: updatedClient.data,
    })
    yield* dispatchAlert(CLIENT_ACTION_TYPES.UPDATE_CLIENT, updatedClient.data.message, 'success')
    yield put({
      type: CLIENT_ACTION_TYPES.GET_CLIENT_LIST + COMMON_ACTION_TYPES.REQUEST,
      payload: {},
    })
  } catch (error) {
    yield put({
      type: CLIENT_ACTION_TYPES.UPDATE_CLIENT + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
    yield* dispatchAlert(CLIENT_ACTION_TYPES.UPDATE_CLIENT, error as string, 'error')
  }
}

function* clientSaga() {
  yield takeEvery(CLIENT_ACTION_TYPES.POST_CLIENT + COMMON_ACTION_TYPES.REQUEST, postClient)
  yield takeEvery(CLIENT_ACTION_TYPES.GET_CLIENT_LIST + COMMON_ACTION_TYPES.REQUEST, getClientList)
  yield takeEvery(CLIENT_ACTION_TYPES.UPDATE_CLIENT + COMMON_ACTION_TYPES.REQUEST, updateClient)
}

export default clientSaga
