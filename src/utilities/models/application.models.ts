import type { EntitlementDto, FeatureDto } from '.'

export interface ApplicationUserRelDto {
  applicationId: number
  applicationKey: string
  applicationName: string
  isSuperAdmin: boolean
  relId: number
  userAppIsEnabled: number
  userRole?: string
  userRoleId?: number
}
export interface BreadCrumbDto {
  id: number
  title: string
  path: string
}

export interface ApplicationDetailsDto {
  applicationName: string
  applicationKey: string
}

export interface ApplicationKeyDto {
  applicationKey: string
}
export interface ApplicationDto {
  applicationKey: string
  applicationName: string
  applicationId: number
  userRoles?: UserRoleDto[]
}
export interface UserRoleDto {
  userRoleId: number
  userRoleName: string
  userRoleKey: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  features: any[]
  entitlements: EntitlementDto[]
}
export interface GetApplicationFeaturesDto {
  applicationId: number
  applicationName: string
  applicationKey: string
  features: Feature[]
}
export interface Feature {
  featureId: number
  featureKey: string
  featureName: string
}

export interface SetApplicationRoleFeatureDto {
  applicationId: number
  applicationKey: string
  applicationName: string
  userRoles: SetApplicationRolesDto[]
}
export interface SetApplicationRolesDto {
  [x: string]: any
  userRoleId: number
  userRoleName: string
  isSetEntitlements: boolean
  entitlementLevel: number
  features: FeatureDto[]
}
