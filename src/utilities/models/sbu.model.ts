export interface CreateSbuDto {
  sbuName: string
  sbuDesc?: string
}

export interface SbuFilterFormDto {
  sbuName: {
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  sbuDesc: {
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
}

export interface SubListQueryParamsDto {
  getAll?: boolean
  getDisabled: boolean
  isBrief?: boolean
}

export interface SetSbuDto {
  sbuId: number
  sbuName: string
  sbuDesc?: string
  isEnabled?: boolean
}

export interface UpdateSbuDto {
  sbuId: number
  sbuName?: string
  sbuDesc?: string
  isEnabled?: boolean
}

export interface SbuUpdateFormDto {
  sbuId: {
    value: number
    isRequired: boolean
    error: string | null
  }
  sbuName: {
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  sbuDesc: {
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
}

export interface setSbuHierarchyDto {
  applicationId: number
  sbus: setSbuEntitlementDto[]
}

export interface setSbuEntitlementDto {
  sbuId: number
  sbuName: string
  clients: setClientEntitlementDto[]
}
export interface setClientEntitlementDto {
  clientId: number
  clientName: string
  projects: setProjectEntitlementDto[]
}
export interface setProjectEntitlementDto {
  projectId: number
  projectName: string
}
export interface SbuDto {
  sbuId: number
  sbuName: string
}

export interface ClientListItem {
  sbuId: number
  sbuName: string
  clients: clientsDto[]
}
export interface clientsDto {
  clientId: number
  clientName: string
}

export interface ProjectListItem {
  sbuId: number
  sbuName: string
  clientId: number
  clientName: string
  projects: ProjectDto[]
}

export interface ProjectDto {
  projectId: number
  projectName: string
}
