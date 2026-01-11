import { COMMON_ACTION_TYPES, RESIGNATION_ACTION_TYPES } from '../../utilities/constants'
import type {
  CreateCommentDto,
  postResignationDto,
  ResignationListQueryParamsDto,
  StatusListQueryParamsDto,
  UpdateResignationDto,
} from '../../utilities/models'

const createResignation = (payload: postResignationDto) => {
  return {
    type: RESIGNATION_ACTION_TYPES.POST_RESIGNATION + COMMON_ACTION_TYPES.REQUEST,
    payload: payload,
  }
}

const getResignationList = (params: ResignationListQueryParamsDto) => {
  return {
    type: RESIGNATION_ACTION_TYPES.GET_RESIGNATION_LIST + COMMON_ACTION_TYPES.REQUEST,
    params,
  }
}

const createComment = (params: CreateCommentDto) => {
  return {
    type: RESIGNATION_ACTION_TYPES.POST_COMMENT + COMMON_ACTION_TYPES.REQUEST,
    params,
  }
}

const getStatusList = (params: StatusListQueryParamsDto) => {
  return {
    type: RESIGNATION_ACTION_TYPES.GET_STATUS_LIST + COMMON_ACTION_TYPES.REQUEST,
    params,
  }
}

const updateResignation = (payload: UpdateResignationDto) => {
  return {
    type: RESIGNATION_ACTION_TYPES.UPDATE_RESIGNATION + COMMON_ACTION_TYPES.REQUEST,
    payload,
  }
}
export const resignationActions = {
  createResignation,
  getResignationList,
  createComment,
  getStatusList,
  updateResignation,
}
