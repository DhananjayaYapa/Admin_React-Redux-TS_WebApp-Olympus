import type { initUserDto } from './users.model'

export interface postResignationDto {
  comment: string
  resignationGivenDate: string
  resignationDate: string
  username: string
  isEnabled?: boolean
}

export interface initialFilterFormDto {
  resignationGivenDate: {
    value: Date | null
    error: string | null
    validator: string
    isRequired: boolean
  }
  resignationDate: {
    value: Date | null
    error: string | null
    validator: string
    isRequired: boolean
  }
  username: {
    value: initUserDto
    error: string | null
    isRequired: boolean
    validator: string
  }
  comment: {
    value: string
    error: string | null
    isRequired: boolean
    validator: string
  }
}

export interface ResignationListQueryParamsDto {
  comments?: string
  resignationGivenDate?: string
  resignationDate?: string
  userId?: number
  username?: string
}

export interface initResignationDto {
  userId: number
  resignationId: number
  username: string
  firstName: string
  lastName: string
  employeeNumber: string
  statusId: number
  statusName: string
  resignationGivenDate: Date | string
  resignationDate: Date | string
  comments: CommentDto[]
}

export interface CommentDto {
  comment?: string
  createdBy?: string
  createdAt?: string
}

export interface StatusListQueryParamsDto {
  id?: number
  status?: string
}
export interface UpdateResignationDto {
  resignationId: number
  statusId?: number
}

export interface CreateCommentDto {
  resignationId: number
  comment?: string
  createdAt?: string
  createdBy?: string
}

export interface initBriefStatusDto {
  id: number
  name: string
}

export interface initialUpdateDto {
  resignationId: {
    value: number
    isRequired: boolean
    error: string | null
  }
  statusId?: {
    value: number
    isRequired: boolean
    error: string | null
  }
}
