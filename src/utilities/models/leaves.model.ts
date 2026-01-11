export interface LeaveCountPayloadDto {
  username: string
  joinDate: string
  confirmDate: string
}

export interface LeaveCountResponseDto {
  username: string
  leaveCountData: leaveCountDataDto[]
}

export interface leaveCountDataDto {
  leaveCountId: number
  leaveTypeId: number
  leaveType: string
  entitledLeaveCount: number
}

export interface setCountedLeaveDto {
  username: string
  annualLeaveCount: number
  casualLeaveCount: number
}

export interface LeavesCountUpdateDto {
  leaveCountData: LeavesTypesDto[]
  username: string
}
export interface LeavesTypesDto {
  leaveCountId?: number
  leaveTypeId?: number
  leaveCount: number
}

export interface LeavesCountUpdateBriefDto {
  username: {
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  leaveCountData: LeavesTypesDto[]
}

export interface EditLeaveCountFormDto {
  annualLeaveCount: {
    value: number
    validator: string
    isRequired: boolean
    error: string | null
    min?: number
    max?: number
    minError?: string
    maxError?: string
  }
  casualLeaveCount: {
    value: number
    validator: string
    isRequired: boolean
    error: string | null
    min?: number
    minError?: string
  }
}
