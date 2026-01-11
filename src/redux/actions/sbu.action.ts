import { COMMON_ACTION_TYPES, SBU_ACTION_TYPES } from '../../utilities/constants'
import type { CreateSbuDto, SubListQueryParamsDto, UpdateSbuDto } from '../../utilities/models'

const postSbu = (payload: CreateSbuDto) => {
  return {
    type: SBU_ACTION_TYPES.POST_SBU + COMMON_ACTION_TYPES.REQUEST,
    payload: payload,
  }
}

const getAllSbuList = (params: SubListQueryParamsDto) => {
  return {
    type: SBU_ACTION_TYPES.GET_SBU_LIST + COMMON_ACTION_TYPES.REQUEST,
    params: params,
  }
}

const updateSbu = (payload: UpdateSbuDto) => {
  return {
    type: SBU_ACTION_TYPES.UPDATE_SBU + COMMON_ACTION_TYPES.REQUEST,
    payload: payload,
  }
}

const getSbuHierarchy = () => {
  return {
    type: SBU_ACTION_TYPES.GET_SBU_HIERARCHY + COMMON_ACTION_TYPES.REQUEST,
  }
}
export const sbuActions = {
  postSbu,
  getAllSbuList,
  updateSbu,
  getSbuHierarchy,
}
