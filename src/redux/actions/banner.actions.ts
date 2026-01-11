import { BANNER_ACTION_TYPES, COMMON_ACTION_TYPES } from '../../utilities/constants'
import type {
  BannerListQueryParamsDto,
  CreateBannerDto,
  DeleteBannerParamsDto,
  UpdateBannerDto,
} from '../../utilities/models/banner.model'

const postBanner = (payload: CreateBannerDto) => {
  return {
    type: BANNER_ACTION_TYPES.POST_BANNER + COMMON_ACTION_TYPES.REQUEST,
    payload: payload,
  }
}

const getBannerList = (params: BannerListQueryParamsDto) => {
  return {
    type: BANNER_ACTION_TYPES.GET_BANNER_LIST + COMMON_ACTION_TYPES.REQUEST,
    params: params,
  }
}

const updateBanner = (payload: UpdateBannerDto) => {
  return {
    type: BANNER_ACTION_TYPES.UPDATE_BANNER + COMMON_ACTION_TYPES.REQUEST,
    payload: payload,
  }
}

const deleteBanner = (params: DeleteBannerParamsDto) => {
  return {
    type: BANNER_ACTION_TYPES.DELETE_BANNER + COMMON_ACTION_TYPES.REQUEST,
    params: params,
  }
}

export const bannerActions = {
  postBanner,
  getBannerList,
  updateBanner,
  deleteBanner,
}
