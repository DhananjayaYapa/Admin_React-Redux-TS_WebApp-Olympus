export interface ClientDetailsDto{
    clientId:number
    clientName:string
    clientDesc:string
    isEnabled:boolean
    createdBy:string
    sbuId:number
    sbuName:string
}
export interface ClientDto {
  clientDesc: string
  clientId: number
  clientName: string
  createdBy: string
  isEnabled: boolean
  sbuName?: string
  sbuId?: number
}

export interface sbuIdDto {
  sbuId: number
}

export interface CreateClientDto {
  clientName: string
  clientDesc?: string
  sbuId: number
}

export interface UpdateClientDto {
  clientId: number
  clientName: string
  isEnabled?: boolean
  clientDesc?: string
  sbuId: number
}

export interface ClientListQueryParamsDto {
  getTeams?: boolean
  getDisabledClients?: boolean
  clientId?: number
}

export interface ClientFilterFormDto {
  clientName: {
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  clientDesc: {
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  sbuId: {
    value: number | null
    validator: string
    isRequired: boolean
    error: string | null
  }
}

export interface ClientUpdateFormDto {
  clientId: {
    value: number
    isRequired: boolean
    error: string | null
  }
  clientName: {
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  clientDesc: {
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  sbuId: {
    value: number | null
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
