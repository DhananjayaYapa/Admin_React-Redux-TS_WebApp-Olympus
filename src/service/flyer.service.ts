import { axiosPrivateInstance } from '.'
import type { CreateFlyerDto, FlyerDeleteDto, FlyerListQueryParamsDto } from '../utilities/models'

const getFlyerTags = () => {
  return axiosPrivateInstance.get('core/api/v1/brief/flyer-tags')
}

const postFlyer = (payload: CreateFlyerDto) => {
  return axiosPrivateInstance.post('core/api/v1/flyers', payload)
}

const getFlyerList = (params: FlyerListQueryParamsDto) => {
  return axiosPrivateInstance.get('core/api/v1/flyers', { params: params })
}

const deleteFlyer = (params: FlyerDeleteDto) => {
  return axiosPrivateInstance.delete(`core/api/v1/flyers/${params.id}`)
}

export const flyerService = {
  getFlyerTags,
  postFlyer,
  getFlyerList,
  deleteFlyer,
}
