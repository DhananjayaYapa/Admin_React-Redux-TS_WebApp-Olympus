export interface TeamFilterFormDto {
  teamName: {
    name: string
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  teamIcon: {
    name: string
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  application: {
    name: string
    value: string[]
    validator: string
    isRequired: boolean
    error: string | null
  }
  client: {
    name: string
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  teamDesc: {
    name: string
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
}

export interface TeamUpdateFormDto {
  teamId: {
    name: string
    value: number
    isRequired: boolean
    error: string | null
  }
  teamName: {
    name: string
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }

  teamDesc: {
    name: string
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  teamIcon: {
    name: string
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  client: {
    name: string
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  isEnabled: {
    name: string
    value: boolean
    validator: string
    isRequired: boolean
    error: string | null
  }
  application: {
    name: string
    value: string[]
    validator: string
    isRequired: boolean
    error: string | null
  }
}

export interface CreateTeamDto {
  teamName: string
  teamDesc?: string
  teamIcon: string
  clientId: number
  isEnabled: boolean
  applications: {
    applicationKey: string
  }[]
}

interface ApplicationField {
  applicationId: number
  applicationName: string
  applicationKey: string
}

export interface SetTeamAvailabilityDto {
  teamId: number
  teamName: string
  teamDesc: string
  teamIcon: string
  isEnabled: boolean
  clientId: number
  clientName: string
  clientTeamRelId: number
  applications: ApplicationField[]
}

export interface UpdateTeamDto {
  teamId: number
  teamName: string
  teamDesc: string
  teamIcon: string
  clientId: number
  isEnabled: boolean
  applications: {
    applicationKey: string
  }[]
}

export interface TeamEnableDto {
  teamId: number
  teamName: string
  isEnabled: boolean
  applications: {
    applicationKey: string
  }[]
}

export interface TeamTextFieldProps<T> {
  label: string
  name: keyof T
  value: string
  onChange: (field: keyof T, value: any) => void
  required: boolean
  multiline: boolean
  error: string | null
  rows?: number
}

export interface TeamListQueryParamsDto {
  getAllAppTeams?: boolean
  getDisabledTeams?: boolean
}
