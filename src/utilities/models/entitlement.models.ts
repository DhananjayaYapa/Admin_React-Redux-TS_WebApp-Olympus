export interface EntitlementDto {
  entitlementId: number
  entitlementName: string
  entitlementLevel: number
}

export interface setUserEntitlementsDto {
  applicationId: number
  userRoles: userRoleEntitlementDto[]
}

export interface userRoleEntitlementDto {
  userRoleId: number
  userRoleName: string
  sbus: sbuEntitlementDto[]
}

export interface sbuEntitlementDto {
  sbuId: number
  sbuName: string
  isSbuLevelEntitlement: string
  clients: clientEntitlementDto[]
}

export interface clientEntitlementDto {
  clientId: number
  clientName: string
  isClientLevelEntitlement: string
  projects: projectEntitlementDto[]
}

export interface projectEntitlementDto {
  projectId: number
  projectName: string
  isProjectLevelEntitlement: string
}

export interface saveEntitlementDto {
  applicationId: number
  userRoles: SaveUserRoleEntitlementDto[]
}
export interface SaveUserRoleEntitlementDto {
  userRoleId: number
  entitlements: SaveEntitlementDto[]
}
export interface SaveEntitlementDto {
  entitlementId: number
  entitlementLevel: number
}