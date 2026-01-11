// UserFeatureListDto use to create Loop Array
export interface UserFeatureListDto {
  userRoleId: number
  userRoleName: string
  isSetEntitlements: boolean
  entitlementLevel: number
  featuretList: FeatureListDto[]
}
export interface FeatureListDto {
  featureId: number
  featureKey: string
  featureName: string
  isChecked: boolean
}

// AvailableCurrentFeatureListDto is get roles array dto
export interface AvailableCurrentFeatureListDto {
  userRoleId: number
  userRoleName: string
  isSetEntitlements: boolean
  entitlementLevel: number
  features: FeatureDto[]
}

// Features Dto is dto that is get all features
export interface FeatureDto {
  featureId: number
  featureKey: string
  featureName: string
}

export interface permissionsDto {
  featureId: number
}

export interface CreatePermissionsDto {
  permissions: permissionsDto[]
  applicationId: number
  userRoleId: number
}

export interface getUserRoleQueryParams {
  applicationId: number
}

export interface setUserRoleDto {
  applicationId: number
  applicationKey: string
  applicationName: string
  userRoles: AvailableCurrentFeatureListDto[]
}
