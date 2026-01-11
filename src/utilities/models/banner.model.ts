export interface CreateBannerDto {
  image: string
  startDate: string
  expiredAt: string
  bannerTitle?: string
  bannerURL?: string
  bannerDesc?: string
  isEnabled?: boolean
}

export interface BannerFilterFormDto {
  image: {
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  startDate: {
    value: Date | null
    validator: string
    isRequired: boolean
    error: string | null
  }
  expireAt: {
    value: Date | null
    validator: string
    isRequired: boolean
    error: string | null
  }
  bannerTitle: {
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  bannerURL: {
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  bannerDesc: {
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
}

export interface bannerUpdateFormDto {
  bannerId: {
    value: number
    isRequired: boolean
    error: string | null
  }
  image: {
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  startDate: {
    value: Date | null
    validator: string
    isRequired: boolean
    error: string | null
  }
  expireAt: {
    value: Date | null
    validator: string
    isRequired: boolean
    error: string | null
  }
  bannerTitle: {
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  bannerURL: {
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
  bannerDesc: {
    value: string
    validator: string
    isRequired: boolean
    error: string | null
  }
}

export interface ImageValidationState {
  isImageClicked: boolean
  isInvalidImageRatio: boolean
  isInvalidImageSize: boolean
  imageFile: File | null
  imageUrl: string | null
}

export interface BannerListQueryParamsDto {
  startDate?: string
  expiredAt?: string
  getDisabledBanners?: boolean
  bannerId?: number
}

export interface SetBannerAvailabilityDto {
  bannerId: number
  bannerTitle: string
  bannerDesc: string
  isEnabled: boolean
  startDate: Date
  expiredAt: Date
  bannerURL: string
  imageURL: string
}

export interface UpdateBannerDto {
  bannerId: number
  image: string | null
  bannerTitle: string
  bannerURL: string
  bannerDesc: string
  isEnabled?: boolean
  startDate: string
  expiredAt: string
}

export interface BannerEntryStatusDto {
  bannerId: number
  image: string
  bannerTitle: string
  bannerURL: string
  bannerDesc: string
  isEnabled: boolean
  startDate: Date
  expiredAt: Date
}

export interface DeleteBannerParamsDto {
  bannerId: number
}
