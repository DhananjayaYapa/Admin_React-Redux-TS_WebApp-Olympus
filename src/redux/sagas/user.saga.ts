/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeEvery } from 'redux-saga/effects'
import { userService } from '../../service/user.service'
import type {
  CreateUserDto,
  UpdateUserDto,
  UpdateUserStatusDto,
  UserListBriefQueryParamsDto,
} from '../../utilities/models/users.model'
import { USER_ACTION_TYPES, COMMON_ACTION_TYPES } from '../../utilities/constants'
import { dispatchAlert } from '../../utilities/helpers'

// CREATE USER
function* createUser(action: { type: string; payload: CreateUserDto }) {
  try {
    // @ts-expect-error-ignore
    const response = yield call(userService.createUser, action.payload)
    yield put({
      type: USER_ACTION_TYPES.CREATE_USER + COMMON_ACTION_TYPES.SUCCESS,
      data: response.data,
    })
    yield* dispatchAlert(
      USER_ACTION_TYPES.CREATE_USER,
      response.data.message || 'User created successfully',
      'success'
    )
    yield put({
      type: USER_ACTION_TYPES.GET_USER_LIST + COMMON_ACTION_TYPES.REQUEST,
      params: { getAll: true },
    })
  } catch (error: any) {
    yield put({
      type: USER_ACTION_TYPES.CREATE_USER + COMMON_ACTION_TYPES.ERROR,
      error,
    })
    const backendMessage =
      error?.response?.data?.message || error?.response?.data?.error || error?.message
    yield* dispatchAlert(USER_ACTION_TYPES.CREATE_USER, backendMessage, 'error')
  }
}

// GET USER LIST
function* getUserList(action: { type: string; params: any }) {
  try {
    // @ts-expect-error-ignore
    const response = yield call(userService.getUserList, action.params)

    yield put({
      type: USER_ACTION_TYPES.GET_USER_LIST + COMMON_ACTION_TYPES.SUCCESS,
      data: response.data.data,
    })
  } catch (error) {
    yield put({
      type: USER_ACTION_TYPES.GET_USER_LIST + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
  }
}

// GET DESIGNATIONS
function* getUserDesignations() {
  try {
    // @ts-expect-error-ignore
    const response = yield call(userService.getUserDesignationList)

    yield put({
      type: USER_ACTION_TYPES.GET_USER_DESIGNATIONS + COMMON_ACTION_TYPES.SUCCESS,
      data: response.data.data,
    })
  } catch (error) {
    yield put({
      type: USER_ACTION_TYPES.GET_USER_DESIGNATIONS + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
  }
}
// UPDATE USER STATUS
function* updateUserStatus(action: {
  type: string
  payload: UpdateUserStatusDto
}): Generator<any, void, any> {
  try {
    const response = yield call(userService.updateUserStatus, action.payload)

    yield put({
      type: USER_ACTION_TYPES.UPDATE_USER_STATUS + COMMON_ACTION_TYPES.SUCCESS,
      data: response.data,
    })

    yield* dispatchAlert(
      USER_ACTION_TYPES.UPDATE_USER_STATUS,
      response.data.message || 'User status updated successfully',
      'success'
    )

    // refresh user list
    yield put({
      type: USER_ACTION_TYPES.GET_USER_LIST + COMMON_ACTION_TYPES.REQUEST,
      params: { getAll: true },
    })
  } catch (error: any) {
    yield put({
      type: USER_ACTION_TYPES.UPDATE_USER_STATUS + COMMON_ACTION_TYPES.ERROR,
      error,
    })

    const backendMessage =
      error?.response?.data?.message || error?.response?.data?.error || error?.message

    yield* dispatchAlert(USER_ACTION_TYPES.UPDATE_USER_STATUS, backendMessage, 'error')
  }
}

function* getUserBriefList(action: { type: string; params: UserListBriefQueryParamsDto }) {
  try {
    // @ts-expect-error-ignore
    const response = yield call(userService.getUserBriefList, action.params)
    yield put({
      type: USER_ACTION_TYPES.GET_USER_BRIEF_LIST + COMMON_ACTION_TYPES.SUCCESS,
      data: response.data.data,
    })
  } catch (error) {
    yield put({
      type: USER_ACTION_TYPES.GET_USER_BRIEF_LIST + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
    yield* dispatchAlert(USER_ACTION_TYPES.GET_USER_BRIEF_LIST, error as string, 'error')
  }
}

function* updateUserDetails(action: { type: string; payload: UpdateUserDto }) {
  try {
    // @ts-expect-error-ignore
    const updatedUser = yield call(userService.updateUserDetails, action.payload)
    yield put({
      type: USER_ACTION_TYPES.UPDATE_USER_DETAILS + COMMON_ACTION_TYPES.SUCCESS,
      data: updatedUser.data,
    })
    yield* dispatchAlert(USER_ACTION_TYPES.UPDATE_USER_DETAILS, updatedUser.data.message, 'success')
    yield put({
      type: USER_ACTION_TYPES.GET_USER_LIST + COMMON_ACTION_TYPES.REQUEST,
      params: { getAll: true, ignoreApplication: true, username: action.payload.username },
    })
    yield put({
      type: USER_ACTION_TYPES.GET_USER_DESIGNATIONS + COMMON_ACTION_TYPES.REQUEST,
    })
  } catch (error) {
    yield put({
      type: USER_ACTION_TYPES.UPDATE_USER_DETAILS + COMMON_ACTION_TYPES.ERROR,
      error: error as string,
    })
    yield* dispatchAlert(USER_ACTION_TYPES.UPDATE_USER_DETAILS, error as string, 'error')
  }
}

export default function* userSaga() {
  yield takeEvery(USER_ACTION_TYPES.CREATE_USER + COMMON_ACTION_TYPES.REQUEST, createUser)
  yield takeEvery(USER_ACTION_TYPES.GET_USER_LIST + COMMON_ACTION_TYPES.REQUEST, getUserList)
  yield takeEvery(
    USER_ACTION_TYPES.GET_USER_DESIGNATIONS + COMMON_ACTION_TYPES.REQUEST,
    getUserDesignations
  )

  // register update status saga
  yield takeEvery(
    USER_ACTION_TYPES.UPDATE_USER_STATUS + COMMON_ACTION_TYPES.REQUEST,
    updateUserStatus
  )
  yield takeEvery(
    USER_ACTION_TYPES.GET_USER_BRIEF_LIST + COMMON_ACTION_TYPES.REQUEST,
    getUserBriefList
  )
  yield takeEvery(
    USER_ACTION_TYPES.UPDATE_USER_DETAILS + COMMON_ACTION_TYPES.REQUEST,
    updateUserDetails
  )
}
