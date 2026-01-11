import { axiosPrivateInstance } from '.'
import type {
  BannerListQueryParamsDto,
  CreateBannerDto,
  DeleteBannerParamsDto,
  UpdateBannerDto,
} from '../utilities/models/banner.model'

const postBanner = (payload: CreateBannerDto) => {
  return axiosPrivateInstance.post('dashboard/api/v1/banners', payload)
}

const getBannerList = (params: BannerListQueryParamsDto) => {
  return axiosPrivateInstance.get('dashboard/api/v1/banners', { params: params })
}

const updateBanner = (payload: UpdateBannerDto) => {
  return axiosPrivateInstance.put('dashboard/api/v1/banners', payload)
}

const deleteBanner = (params: DeleteBannerParamsDto) => {
  return axiosPrivateInstance.delete('dashboard/api/v1/banners', { params: params })
}

export const bannerService = {
  postBanner,
  getBannerList,
  updateBanner,
  deleteBanner,
}
