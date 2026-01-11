import axios from 'axios'
import { axiosPrivateInstance } from '.'
import { APP_CONFIGS } from '../utilities/constants'

axios.defaults.baseURL = APP_CONFIGS.API_BASE

let applicationListCache: any = null

export const getApplicationList = async (forceRefresh = false): Promise<any> => {
  if (!forceRefresh && applicationListCache) {
    return applicationListCache
  }
  const response = await axiosPrivateInstance.get('/core/api/v1/applications')
  applicationListCache = response?.data ?? response
  return applicationListCache
}

export const applicationService = {
  getApplicationList,
}
