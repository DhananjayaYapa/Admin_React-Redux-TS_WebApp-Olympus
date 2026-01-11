import { CLIENT_ACTION_TYPES, COMMON_ACTION_TYPES } from '../../utilities/constants'
import type {
  CreateClientDto,
  ClientListQueryParamsDto,
  UpdateClientDto,
} from '../../utilities/models'

const postClient = (payload: CreateClientDto) => {
  return {
    type: CLIENT_ACTION_TYPES.POST_CLIENT + COMMON_ACTION_TYPES.REQUEST,
    payload: payload,
  }
}

const getClientList = (payload: ClientListQueryParamsDto) => {
  return {
    type: CLIENT_ACTION_TYPES.GET_CLIENT_LIST + COMMON_ACTION_TYPES.REQUEST,
    payload: payload,
  }
}

const updateClient = (payload: UpdateClientDto) => {
  return {
    type: CLIENT_ACTION_TYPES.UPDATE_CLIENT + COMMON_ACTION_TYPES.REQUEST,
    payload: payload,
  }
}

export const clientActions = {
  postClient,
  getClientList,
  updateClient,
}
