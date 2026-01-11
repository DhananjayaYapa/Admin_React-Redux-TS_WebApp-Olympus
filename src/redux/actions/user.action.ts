import type {
  CreateUserDto,
  UpdateUserDto,
  UpdateUserStatusDto,
  UserListBriefQueryParamsDto,
  UserListQueryParamsDto,
} from '../../utilities/models'
import { USER_ACTION_TYPES, COMMON_ACTION_TYPES } from '../../utilities/constants'

// CREATE USER
const createUserRequest = (payload: CreateUserDto) => ({
  type: USER_ACTION_TYPES.CREATE_USER + COMMON_ACTION_TYPES.REQUEST,
  payload,
})

export const clearCreateUserState = () => ({
  type: USER_ACTION_TYPES.CREATE_USER + COMMON_ACTION_TYPES.CLEAR,
})

// GET USER LIST
const getUserListRequest = (params?: UserListQueryParamsDto) => ({
  type: USER_ACTION_TYPES.GET_USER_LIST + COMMON_ACTION_TYPES.REQUEST,
  params,
})

// GET DESIGNATION LIST
const getUserDesignationsRequest = () => ({
  type: USER_ACTION_TYPES.GET_USER_DESIGNATIONS + COMMON_ACTION_TYPES.REQUEST,
})


//update user status
export const updateUserStatusRequest = (payload: UpdateUserStatusDto) => ({
  type: USER_ACTION_TYPES.UPDATE_USER_STATUS + COMMON_ACTION_TYPES.REQUEST,
  payload,
})

const getUserBriefList = (params: UserListBriefQueryParamsDto) => {
  return {
    type: USER_ACTION_TYPES.GET_USER_BRIEF_LIST + COMMON_ACTION_TYPES.REQUEST,
    params: params,
  }
}

const updateUserDetails = (payload: UpdateUserDto) => {
  return {
    type: USER_ACTION_TYPES.UPDATE_USER_DETAILS + COMMON_ACTION_TYPES.REQUEST,
    payload: payload,
  }
}

export const userActions = {
  createUserRequest,
  getUserListRequest,
  getUserDesignationsRequest,
  clearCreateUserState,
  updateUserStatusRequest,
  getUserBriefList,
  updateUserDetails,
}
