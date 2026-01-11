import { COMMON_ACTION_TYPES, FLYER_ACTION_TYPES } from '../../utilities/constants'
import type {
  CreateFlyerDto,
  FlyerDeleteDto,
  FlyerListQueryParamsDto,
} from '../../utilities/models'

const getFlyerTags = () => {
  return {
    type: FLYER_ACTION_TYPES.GET_FLYER_TAGS + COMMON_ACTION_TYPES.REQUEST,
  }
}

const postFlyer = (payload: CreateFlyerDto) => {
  return {
    type: FLYER_ACTION_TYPES.POST_FLYER + COMMON_ACTION_TYPES.REQUEST,
    payload,
  }
}

const getFlyerList = (params: FlyerListQueryParamsDto) => {
  return {
    type: FLYER_ACTION_TYPES.GET_FLYER_LIST + COMMON_ACTION_TYPES.REQUEST,
    params,
  }
}

const deleteFlyer = (params: FlyerDeleteDto) => {
  return {
    type: FLYER_ACTION_TYPES.DELETE_FLYER + COMMON_ACTION_TYPES.REQUEST,
    params,
  }
}

export const flyerActions = {
  getFlyerTags,
  postFlyer,
  getFlyerList,
  deleteFlyer,
}
