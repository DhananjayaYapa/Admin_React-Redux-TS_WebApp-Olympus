import { axiosPrivateInstance } from '.'
import type {
  CreateClientDto,
  ClientListQueryParamsDto,
  UpdateClientDto,
} from '../utilities/models'

const postClient = (payload: CreateClientDto) => {
  return axiosPrivateInstance.post('core/api/v1/clients', payload)
}

const getClientList = (params: ClientListQueryParamsDto) => {
  return axiosPrivateInstance.get('core/api/v1/clients', { params: params })
}

const updateClient = (payload: UpdateClientDto) => {
  return axiosPrivateInstance.patch('core/api/v1/clients', payload)
}

export const clientService = {
  postClient,
  getClientList,
  updateClient,
}
