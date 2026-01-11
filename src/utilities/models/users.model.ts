/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  ApplicationDto,
  Application,
  ApplicationKeyDto,
  ApplicationUserRelDto,
  ApplicationDetailsDto,
} from '.'
export interface AuthorizedUser {
  designation: string
  designationId: number
  firstName: string
  lastName: string
  username: string
  isClient: boolean
  isAuthorized: boolean
  applications: ApplicationDto
  authorizedApps?: Application[]
}

export interface initUserDto {
  id: number
  name: string
}
export interface UserSelectDto {
  username: string
  userId: number
}

export interface UserDto {
  applications: ApplicationUserRelDto[]
  firstName: string
  isEnabled: boolean
  isSuperAdmin?: boolean
  joinDate: string
  lastName: string
  terminationDate?: string
  username: string
  createdBy?: string
  userRoleId?: number
  userId?: number
  birthday?: string
  employeeNumber?: string
  designationId?: number
  designationEffectiveFrom?: string
  confirmationDate?: string
  isExternal?: boolean
  designationShortForm?: string
  photoFilePath?: string
}
export interface GetUserListParamsDto {
  username?: string
  getDisabledUsers?: boolean
}
export interface GetUserListBriefParamsDto {
  userRoleKey?: string
  ignoreApplication?: boolean
  getAll?: boolean
  getDisabled?: boolean
}
export interface UserRolesDto {
  id: number
  role: string
}

export interface UserListQueryParamsDto {
  ignoreApplication?: boolean
  getAll?: boolean
  username?: string
  status?: any
  isExternal?: any
  designationId?: any
  employeeNumber?: string
  name?: string
  applicationId?: any
}
export interface CreateUserDto {
  username: string
  firstName: string
  lastName: string
  isEnabled: boolean
  joinDate: string
  birthday: string
  employeeNumber: string
  applications: ApplicationKeyDto[]
  designationId: number
  isExternal: boolean
}
export interface UserListBriefQueryParamsDto {
  ignoreApplication?: boolean
  getAll?: boolean
  username?: string
  getDisabled?: any
}
export interface CreateUserDto {
  username: string
  firstName: string
  lastName: string
  isEnabled: boolean
  joinDate: string
  birthday: string
  employeeNumber: string
  applications: ApplicationKeyDto[]
  designationId: number
  isExternal: boolean
}

export interface UpdateUserDto {
  username: string
  firstName?: string
  lastName?: string
  isEnabled?: boolean
  applications?: ApplicationKeyDto[]
  joinDate?: string
  birthday?: string
  employeeNumber?: string
  terminationDate?: string
  designationId?: number | null
  designationEffectiveFrom?: string
  confirmationDate?: string
  isExternal?: boolean
}

export interface UserEntitlementTeamRoleDto {
  roleId: number
}
export interface UserEntitlementTeamDto {
  teamId: number
  userRoles?: UserEntitlementTeamRoleDto[]
}
export interface UserEntitlementDto {
  username: string
  relId: number
  applicationKey: string
  roleId?: number
  teams: UserEntitlementTeamDto[]
}
export interface UserEntitlementRevokeDto {
  username: string
  relId: number
  applicationKey: string
}
export interface DesignationDto {
  projectRoleName: string
  projectRoleDisplayName: string
  projectRoleId: number
}

export interface UserIdDto {
  userId: string
}
export interface EmployeeDto {
  userId: string
  username: string
}
export interface EmployeeUsernameDto {
  username: string
}
export interface UploadPhotoDto {
  photo: string
}

export interface UpdateUserStatusDto {
  username: string
  isEnabled: boolean
  applications: ApplicationKeyDto[]
}

export interface CreateResignationDto {
  comment: string
  resignationGivenDate: string
  resignationDate: string
  userId: number
  isEnabled: boolean
}

export interface SetUserListBriefDto {
  userId: number
  username: string
  firstName: string
  lastName: string
  employeeNumber: string
  designationId: number
  designation: string
  designationShortForm: string
}

export interface UpdateUserFormDto {
  username: {
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  firstName: {
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  lastName: {
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  isEnabled: {
    value: boolean
    isRequired: boolean
    error: string | null
  }
  applications: {
    value: ApplicationDetailsDto[]
    isRequired: boolean
    error: string | null
    validator: 'array'
  }
  joinDate: {
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  birthday: {
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  employeeNumber: {
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  terminationDate: {
    value: string | null
    validator: string
    isRequired: boolean
    error: string | null
  }
  designationId: {
    value: number | null
    isRequired: boolean
    error: string | null
  }
  designationEffectiveFrom: {
    value: string | null
    validator: string
    isRequired: boolean
    error: string | null
  }
  confirmationDate: {
    value: string | null
    validator: string
    isRequired: boolean
    error: string | null
  }
  isExternal: {
    value: boolean
    isRequired: boolean
    error: string | null
  }
}
