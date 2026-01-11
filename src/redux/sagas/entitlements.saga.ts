import { call, put, takeEvery } from 'redux-saga/effects'
import { userEntitlementsService } from '../../service'
import { COMMON_ACTION_TYPES, ENTITLEMENTS_ACTION_TYPES } from '../../utilities/constants'
import type { EmployeeUsernameDto, saveEntitlementDto } from '../../utilities/models'
import { dispatchAlert } from '../../utilities/helpers';

function* getUserEntitlements(action: { type: string; params: EmployeeUsernameDto }) {
  try {
    // @ts-expect-error-ignore
    const userEntitlement = yield call(userEntitlementsService.getUserEntitlements, action.params)
    yield put({
      type: ENTITLEMENTS_ACTION_TYPES.GET_USER_ENTITLEMENTS + COMMON_ACTION_TYPES.SUCCESS,
      data: userEntitlement.data,
    })
  } catch (error) {
    yield put({
      type: ENTITLEMENTS_ACTION_TYPES.GET_USER_ENTITLEMENTS + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
  }
}

function* saveUserEntitlements(action: { type: string; payload: saveEntitlementDto; username: string }) {
  try {
    // @ts-expect-error-ignore
    const userEntitlement = yield call(userEntitlementsService.saveUserEntitlements, action.payload, action.username)
    yield put({
      type: ENTITLEMENTS_ACTION_TYPES.SAVE_USER_ENTITLEMENTS + COMMON_ACTION_TYPES.SUCCESS,
      data: userEntitlement.data,
    })
    yield* dispatchAlert(ENTITLEMENTS_ACTION_TYPES.SAVE_USER_ENTITLEMENTS, userEntitlement.data.message, 'success')
    yield put({
      type: ENTITLEMENTS_ACTION_TYPES.GET_USER_ENTITLEMENTS + COMMON_ACTION_TYPES.REQUEST,
      params: { username: action.username },
    })
  } catch (error) {
    yield put({
      type: ENTITLEMENTS_ACTION_TYPES.SAVE_USER_ENTITLEMENTS + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
    yield* dispatchAlert(ENTITLEMENTS_ACTION_TYPES.SAVE_USER_ENTITLEMENTS, error as string, 'error')
  }
}

function* entitlementsSaga() {
  yield takeEvery(
    ENTITLEMENTS_ACTION_TYPES.GET_USER_ENTITLEMENTS + COMMON_ACTION_TYPES.REQUEST,
    getUserEntitlements
  )
  yield takeEvery(
    ENTITLEMENTS_ACTION_TYPES.SAVE_USER_ENTITLEMENTS + COMMON_ACTION_TYPES.REQUEST,
    saveUserEntitlements
  )
}

export default entitlementsSaga
