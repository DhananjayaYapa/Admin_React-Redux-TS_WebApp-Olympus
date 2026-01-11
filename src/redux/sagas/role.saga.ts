import { call, put, takeEvery } from 'redux-saga/effects'
import { roleService } from '../../service/role.service'
import { COMMON_ACTION_TYPES, ROLE_ACTION_TYPES } from '../../utilities/constants'
import type { CreatePermissionsDto, getUserRoleQueryParams } from '../../utilities/models'
import { dispatchAlert } from '../../utilities/helpers'

function* getUserRoles(action: {
  type: string
  params: getUserRoleQueryParams
  applicationId: number
}) {
  try {
    // @ts-expect-error-ignore
    const userRoles = yield call(roleService.getUserRoles, action.params)
    yield put({
      type: ROLE_ACTION_TYPES.GET_USERROLE_LIST + COMMON_ACTION_TYPES.SUCCESS,
      data: userRoles.data,
      applicationId: action.applicationId,
    })
  } catch (error) {
    yield put({
      type: ROLE_ACTION_TYPES.GET_USERROLE_LIST + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
      applicationId: action.applicationId,
    })
    yield* dispatchAlert(ROLE_ACTION_TYPES.GET_USERROLE_LIST, error as string, 'error')
  }
}

function* getFeatureList(action: { type: string; params: getUserRoleQueryParams }) {
  try {
    // @ts-expect-error-ignore
    const features = yield call(roleService.getFeatures, action.params)
    yield put({
      type: ROLE_ACTION_TYPES.GET_FEATURE_LIST + COMMON_ACTION_TYPES.SUCCESS,
      data: features.data,
    })
  } catch (error) {
    yield put({
      type: ROLE_ACTION_TYPES.GET_FEATURE_LIST + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
    yield* dispatchAlert(ROLE_ACTION_TYPES.GET_FEATURE_LIST, error as string, 'error')
  }
}

function* updatePermission(action: { type: string; params: CreatePermissionsDto }) {
  try {
    // @ts-expect-error-ignore
    const updatedPermissions = yield call(roleService.updatePermissions, action.params)
    yield put({
      type: ROLE_ACTION_TYPES.UPDATE_PERMISSION + COMMON_ACTION_TYPES.SUCCESS,
      data: updatedPermissions.data,
    })
    yield* dispatchAlert(
      ROLE_ACTION_TYPES.UPDATE_PERMISSION,
      updatedPermissions.data.message,
      'success'
    )
    yield put({
      type: ROLE_ACTION_TYPES.GET_USERROLE_LIST + COMMON_ACTION_TYPES.REQUEST,
      params: { applicationId: action.params.applicationId },
    })
  } catch (error) {
    yield put({
      type: ROLE_ACTION_TYPES.UPDATE_PERMISSION + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
    yield* dispatchAlert(ROLE_ACTION_TYPES.UPDATE_PERMISSION, error as string, 'error')
  }
}

function* roleSaga() {
  yield takeEvery(ROLE_ACTION_TYPES.GET_USERROLE_LIST + COMMON_ACTION_TYPES.REQUEST, getUserRoles)
  yield takeEvery(ROLE_ACTION_TYPES.GET_FEATURE_LIST + COMMON_ACTION_TYPES.REQUEST, getFeatureList)
  yield takeEvery(
    ROLE_ACTION_TYPES.UPDATE_PERMISSION + COMMON_ACTION_TYPES.REQUEST,
    updatePermission
  )
}

export default roleSaga
