import type { AuthStateDto } from '.'

export interface ApiResponseDto<T> {
  data: T
  message: string
}

export interface AppStateDto {
  auth: AuthStateDto
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
