import { axiosPrivateInstance } from '.'
import type {
  CreateCommentDto,
  postResignationDto,
  ResignationListQueryParamsDto,
  StatusListQueryParamsDto,
  UpdateResignationDto,
} from '../utilities/models'

const createResignation = (payload: postResignationDto) => {
  return axiosPrivateInstance.post('core/api/v1/resignations', payload)
}

const getResignationList = (params: ResignationListQueryParamsDto) => {
  return axiosPrivateInstance.get('core/api/v1/resignations', { params: params })
}

const createComment = (params: CreateCommentDto) => {
  return axiosPrivateInstance.post(
    `core/api/v1/resignations/${params.resignationId}/comments`,
    params
  )
}

const getStatusList = (params: StatusListQueryParamsDto) => {
  return axiosPrivateInstance.get('core/api/v1/resignations/status', { params: params })
}

const updateResignation = (payload: UpdateResignationDto) => {
  return axiosPrivateInstance.put('core/api/v1/resignations', payload)
}
export const resignationService = {
  createResignation,
  getResignationList,
  createComment,
  getStatusList,
  updateResignation,
}
