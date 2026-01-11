import { axiosPrivateInstance } from '.'
import type { LeaveCountPayloadDto, LeavesCountUpdateDto } from '../utilities/models'

const getAllLeaveCounts = () => {
  return axiosPrivateInstance.get('athena/api/v1/leaves/leaveCount')
}
const userLeaveCounts = (payload: LeaveCountPayloadDto) => {
  return axiosPrivateInstance.get('athena/api/v1/leaves/leaveCountCalculate', { params: payload })
}
const updateLeaveCounts = (payload: LeavesCountUpdateDto) => {
  return axiosPrivateInstance.put('athena/api/v1/leaves/leaveCount', payload)
}

const addLeaveCount = (payload: LeavesCountUpdateDto) => {
  return axiosPrivateInstance.post('athena/api/v1/leaves/leaveCount', payload)
}

export const leavesService = {
  getAllLeaveCounts,
  userLeaveCounts,
  updateLeaveCounts,
  addLeaveCount,
}
