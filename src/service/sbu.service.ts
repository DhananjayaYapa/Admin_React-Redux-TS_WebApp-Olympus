import { axiosPrivateInstance } from '.'
import type { CreateSbuDto, SubListQueryParamsDto, UpdateSbuDto } from '../utilities/models'

const postSbu = (payload: CreateSbuDto) => {
  return axiosPrivateInstance.post('core/api/v1/sbu', payload)
}

const getAllSbuList = (params: SubListQueryParamsDto) => {
  return axiosPrivateInstance.get('core/api/v1/sbu', { params: params })
}

const updateSbu = (payload: UpdateSbuDto) => {
  return axiosPrivateInstance.put('core/api/v1/sbu', payload)
}

const getSbuHierarchy = () => {
  return axiosPrivateInstance.get('core/api/v1/sbu/sbuHierarchy')
}

export const sbuService = {
  postSbu,
  getAllSbuList,
  updateSbu,
  getSbuHierarchy,
}
