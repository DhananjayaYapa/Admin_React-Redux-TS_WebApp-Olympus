export interface CreateFlyerDto {
  typeId: number
  tagId: number
  greeting: string
  flyer: string
}
export interface FlyerBriefTypeDto {
  typeName: string
  typeId: number
  tags: TagsDto[]
}
export interface TypeDto {
  typeId: number
  typeName: string
}
export interface TagsDto {
  tagId: number
  tagName: string
}
export interface GetFlyerListDto {
  id: number
  typeId: number
  type: string
  tagId: number
  tag: string
  filePath: string
  greeting: string
  createdBy: string
  createdAt: string
}

export interface FlyerListQueryParamsDto {
  id?: number
  typeId?: number
  tagId?: number
}

export interface FlyerValidationState {
  isImageClicked: boolean
  isInvalidImageRatio: boolean
  isInvalidImageSize: boolean
  imageFile: File | null
  imageUrl: string | null
}

export interface FlyerFilterFormDto {
  flyerType: {
    value: number
    validator: 'number'
    isRequired: boolean
    error: string | null
  }
  tagId: {
    value: number | null
    validator: 'object'
    isRequired: boolean
    error: string | null
  }
  greeting: {
    value: string
    validator: 'text'
    isRequired: boolean
    error: string | null
  }
  image: {
    value: string
    validator: 'image'
    isRequired: boolean
    error: string | null
    imageValidationState: FlyerValidationState | null
  }
}

export interface FlyerDeleteDto {
  id: number
}
