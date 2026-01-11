export interface BadgeFilterFormDto {
  badge: {
    name: string
    value: string
    validator: string
    isRequired: boolean
    error: string | null
    imageValidationState: null
  }
  title: {
    name: string
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  description: {
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  isEnable: {
    value: boolean
    validator: string
    isRequired: boolean
    error: string | null
  }
  url: {
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
}

export interface BadgeUpdateFormDto {
  id: {
    value: number
    isRequired: boolean
    error: string | null
  }
  badge: {
    name: string
    value: string | null
    validator: string
    isRequired: boolean
    error: string | null
    imageValidationState: null
  }

  title: {
    name: string
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  url: {
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  description: {
    value: string | null
    validator: string
    isRequired: boolean
    error: string | null
  }
  isEnable: {
    value: boolean
    validator: string
    isRequired: boolean
    error: string | null
  }
}

export interface BadgeAssignDto {
  badgeId: {
    value: number
    validator: string
    isRequired: boolean
    error: string | null
  }
  title: {
    name: string
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  url: {
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  username: {
    name: string
    value: string[]
    validator: string
    isRequired: boolean
    error: string | null
  }
}

export interface CreateBadgeDto {
  badge: string
  title: string
  url: string
  description: string
  isEnable: boolean
}

export interface ImageValidationState {
  isImageClicked: boolean
  isInvalidImageRatio: boolean
  isInvalidImageSize: boolean
  imageFile: File | null
  imageUrl: string | null
}

export interface SetBadgeAvailabilityDto {
  id: number
  url: string
  badge?: string | null
  title: string
  isEnable: number
  description: string | null
  createdBy: string | null
  createdAt: string | null
  modifiedBy: string | null
  modifiedAt: string | null
}

export interface BadgeEntryStatusDto {
  id: number
  badge: string
  url: string
  title: string
  isEnable: boolean
  description: string | null
  createdBy: string | null
  createdAt: string | null
  modifiedBy: string | null
  modifiedAt: string | null
}

export interface UpdateBadgeDto {
  id: number
  badge: string | null
  url: string
  title: string
  isEnable: boolean
  description: string | null
}
export interface EntryStatusBadgeDto {
  id: number
  url: string
  title: string
  isEnable: boolean
  description: string | null
}

export interface BadgeListQueryParamsDto {
  getDisabled?: boolean
  id?: number
}

export interface AllocationListQueryParamsDto {
  getDisabled?: boolean
  badgeId?: number
  username?: string
}

export interface BriefUserListQueryParamsDto {
  getDisabled?: boolean
  getAll?: boolean
  ignoreApplication?: boolean
}

export interface EmployeeListDto {
  userId: number
  username: string
  firstName: string
  lastName: string
  employeeNumber: string
  designationId: number
  designation: string
  designationShortForm: string
}

export interface BadgeTableDetailsDto {
  id: number
  isEnable: number
  createdBy: null | string
  createdAt: null | string
  modifiedBy: null | string
  modifiedAt: null | string
  userId: number
  employeeNumber: string
  name: string
  username: string
  badgeId: number
  title: string
  description: string
  url: string
}

export interface AssignBadgeDto {
  badgeId: number
  username: string[]
}

export interface UpdateAssignBadgeDto {
  id: number
  badgeId: number
}

interface BadgeAssignment {
  badgeId: number
  username: string
}

export interface AssignBadgePayload {
  badges: BadgeAssignment[]
}

export interface RemoveBadgeAllocationDto {
  id: number
}
