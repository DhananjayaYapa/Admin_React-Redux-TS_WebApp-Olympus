import { Alert, Box, Divider, Grid, InputAdornment, TextField } from '@mui/material'
import { BREAD_CRUMB } from '../../utilities/constants'
import { AppLayout } from '../../templates'
import {
  BannerCreateForm,
  BannerTableView,
  BannerPreview,
  BannerEditPopUp,
  BannerStatusChangePopUp,
  BannerDeletePopUp,
} from '../../components'
import React, { useState, useRef, useEffect } from 'react'
import type {
  BannerEntryStatusDto,
  BannerFilterFormDto,
  BannerListQueryParamsDto,
  bannerUpdateFormDto,
  CreateBannerDto,
  DeleteBannerParamsDto,
  ImageValidationState,
  SetBannerAvailabilityDto,
  UpdateBannerDto,
} from '../../utilities/models/banner.model'
import {
  APP_TABLE_CONFIGS,
  BANNER_IMAGE_CONFIGS,
  DATE_FORMAT,
} from '../../utilities/constants/app.constants'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { alertActions, bannerActions } from '../../redux/actions'
import { validateFormData } from '../../utilities/helpers'
import type { AppStateDto } from '../../utilities/models'
import { AppTablePagination } from '../../components'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

function BannerManagement() {
  const dispatch = useDispatch()

  const bannerCreateAlert = useSelector((state: AppStateDto) => state.alert.postBannerAlert)
  const bannerUpdateAlert = useSelector((state: AppStateDto) => state.alert.updateBannerAlert)
  const bannerDeleteAlert = useSelector((state: AppStateDto) => state.alert.deleteBannerAlert)
  const allBannerList = useSelector((state: AppStateDto) => state.banner.getBannerList.data)
  const bannerListIsLoading = useSelector(
    (state: AppStateDto) => state.banner.getBannerList.isLoading
  )
  const isCreatingBanner = useSelector((state: AppStateDto) => state.banner.postBanner.isLoading)
  const INITIAL_FILTER_STATE = {
    image: {
      value: '',
      validator: 'image',
      isRequired: true,
      error: null,
      imageValidationState: null,
    },
    startDate: {
      value: null,
      validator: 'date',
      isRequired: true,
      error: null,
    },
    expireAt: {
      value: null,
      validator: 'date',
      isRequired: true,
      error: null,
    },
    bannerTitle: {
      value: '',
      validator: 'string',
      isRequired: false,
      error: null,
    },
    bannerURL: {
      value: '',
      validator: 'string',
      isRequired: false,
      error: null,
    },
    bannerDesc: {
      value: '',
      validator: 'string',
      isRequired: false,
      error: null,
    },
  }

  const INITIAL_UPDATE_BANNER_STATE = {
    bannerId: {
      value: -1,
      isRequired: true,
      error: null,
    },
    image: {
      value: '',
      validator: 'image',
      isRequired: false,
      error: null,
      imageValidationState: null,
    },
    startDate: {
      value: null,
      validator: 'date',
      isRequired: false,
      error: null,
    },
    expireAt: {
      value: null,
      validator: 'date',
      isRequired: false,
      error: null,
    },
    bannerTitle: {
      value: '',
      validator: 'string',
      isRequired: false,
      error: null,
    },
    bannerURL: {
      value: '',
      validator: 'string',
      isRequired: false,
      error: null,
    },
    bannerDesc: {
      value: '',
      validator: 'string',
      isRequired: false,
      error: null,
    },
  }

  const INITIAL_BANNER_STATUS_STATE = {
    bannerStatus: {
      value: {} as BannerEntryStatusDto,
    },
  }

  const fileInputRef = useRef<HTMLInputElement>(null)
  const editFileInputRef = useRef<HTMLInputElement>(null)
  const [bannerFilterFormData, setBannerFilterFormData] =
    useState<BannerFilterFormDto>(INITIAL_FILTER_STATE)
  const [imageState, setImageState] = useState<ImageValidationState>({
    isImageClicked: false,
    isInvalidImageRatio: false,
    isInvalidImageSize: false,
    imageFile: null,
    imageUrl: null,
  })
  const [editImageState, setEditImageState] = useState<ImageValidationState>({
    isImageClicked: false,
    isInvalidImageRatio: false,
    isInvalidImageSize: false,
    imageFile: null,
    imageUrl: null,
  })
  const [filterBannerRow, setFilterBannerRow] = useState<SetBannerAvailabilityDto[]>([])
  const [previewState, setPreviewState] = useState<{
    open: boolean
    imageUrl: string | null
  }>({
    open: false,
    imageUrl: null,
  })
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(APP_TABLE_CONFIGS.DEFAULT_ROWS_PER_PAGE)
  const [isOpenPopUp, setIsOpenPopUp] = useState(false)
  const [isEditingBanner, setIsEditingBanner] = useState<bannerUpdateFormDto>(
    INITIAL_UPDATE_BANNER_STATE
  )
  const [isStatusPopUpOpen, setIsStatePopUpOpen] = useState(false)
  const [isStateBannerChangeRow, setIsStateBannerChangeRow] = useState(INITIAL_BANNER_STATUS_STATE)
  const [isDeleteBannerPopUpOpen, setIsDeleteBannerPopUpOpen] = useState(false)
  const [isDeleteBannerRow, setIsDeleteBannerRow] = useState<SetBannerAvailabilityDto | null>(null)
  const [filteredBannerList, setFilteredBannerList] = useState<SetBannerAvailabilityDto[]>([])
  const [searchFilter, setSearchFilter] = useState<string>('')
  const [originalBannerImageUrl, setOriginalBannerImageUrl] = useState<string>('')

  useEffect(() => {
    const trimmedFilter = searchFilter.trim().toLowerCase()

    if (!trimmedFilter) {
      setFilteredBannerList([])
      return
    }

    const filtered =
      filterBannerRow?.filter((banner: SetBannerAvailabilityDto) => {
        const statusText = banner.isEnabled ? 'enabled' : 'disabled'
        return (
          banner.bannerTitle?.toLowerCase().includes(trimmedFilter) ||
          banner.bannerDesc?.toLowerCase().includes(trimmedFilter) ||
          statusText.includes(trimmedFilter) ||
          banner.startDate?.toString().toLowerCase().includes(trimmedFilter) ||
          banner.expiredAt?.toString().toLowerCase().includes(trimmedFilter)
        )
      }) || []

    setFilteredBannerList(filtered)
    setPage(0)
  }, [searchFilter, filterBannerRow])

  useEffect(() => {
    if (bannerCreateAlert.serverity === 'success' || bannerCreateAlert.serverity === 'error')
      clearFormFields()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bannerCreateAlert])

  React.useEffect(() => {
    getAllBannerList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    setFilterBannerRow(allBannerList?.data)
  }, [allBannerList])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFilterHandleChange = (field: keyof BannerFilterFormDto, value: any) => {
    setBannerFilterFormData((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value,
        error: null,
      },
    }))
  }

  const validateImageDimensions = (
    image: HTMLImageElement
  ): { isValid: boolean; message?: string } => {
    const { WIDTH: WIDTH1, HEIGHT: HEIGHT1 } = BANNER_IMAGE_CONFIGS.IMAGE_RATIO_TYPE1
    const { WIDTH: WIDTH2, HEIGHT: HEIGHT2 } = BANNER_IMAGE_CONFIGS.IMAGE_RATIO_TYPE2

    const isValidRatio =
      (image.width === WIDTH1 && image.height === HEIGHT1) ||
      (image.width === WIDTH2 && image.height === HEIGHT2)

    if (!isValidRatio) {
      return {
        isValid: false,
        message: `Invalid image aspect ratio, image resolution should be ${WIDTH1} x ${HEIGHT1} pixels or ${WIDTH2} x ${HEIGHT2} pixels`,
      }
    }

    return { isValid: true }
  }

  const handleImageClick = () => {
    setImageState((prev) => ({ ...prev, isImageClicked: true }))
    fileInputRef.current?.click()
  }

  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    // Validate file size
    if (file.size > BANNER_IMAGE_CONFIGS.MAX_IMAGE_SIZE) {
      setImageState({
        isImageClicked: true,
        isInvalidImageSize: true,
        isInvalidImageRatio: false,
        imageFile: file,
        imageUrl: null,
      })
      onFilterHandleChange('image', '')
      setBannerFilterFormData((prev) => ({
        ...prev,
        image: {
          ...prev.image,
          value: '',
          error: 'Image size should be less than 1MB.',
        },
      }))

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      return
    }

    // Create image object for dimension validation
    const image = new Image()
    const reader = new FileReader()

    reader.onload = (fileLoadedEvent: ProgressEvent<FileReader>) => {
      const result = fileLoadedEvent.target?.result as string
      image.src = result

      image.onload = () => {
        const validation = validateImageDimensions(image)

        if (validation.isValid) {
          setImageState({
            isImageClicked: true,
            isInvalidImageSize: false,
            isInvalidImageRatio: false,
            imageFile: file,
            imageUrl: result,
          })
          // Update form data and clear any previous errors
          setBannerFilterFormData((prev) => ({
            ...prev,
            image: {
              ...prev.image,
              value: result,
              error: null,
            },
          }))
        } else {
          setImageState({
            isImageClicked: true,
            isInvalidImageSize: false,
            isInvalidImageRatio: true,
            imageFile: file,
            imageUrl: null,
          })
          onFilterHandleChange('image', '')
          setBannerFilterFormData((prev) => ({
            ...prev,
            image: {
              ...prev.image,
              value: '',
              error:
                validation.message ||
                'Invalid image aspect ratio. Image resolution should be 1920 x 1080 pixels or 1280 x 720 pixels.',
            },
          }))
        }
        // Reset file input to allow re-uploading the same file
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }

      image.onerror = () => {
        setImageState({
          isImageClicked: true,
          isInvalidImageSize: false,
          isInvalidImageRatio: true,
          imageFile: file,
          imageUrl: null,
        })
        onFilterHandleChange('image', '')
        setBannerFilterFormData((prev) => ({
          ...prev,
          image: {
            ...prev.image,
            value: '',
            error: 'Failed to load image. Please ensure the file is a valid image.',
          },
        }))
        // Reset file input to allow re-uploading the same file
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }
    }

    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setImageState({
      isImageClicked: false,
      isInvalidImageSize: false,
      isInvalidImageRatio: false,
      imageFile: null,
      imageUrl: null,
    })
    setBannerFilterFormData((prev) => ({
      ...prev,
      image: {
        ...prev.image,
        value: '',
        error: null,
      },
    }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleEditImageClick = () => {
    setEditImageState((prev) => ({ ...prev, isImageClicked: true }))
    editFileInputRef.current?.click()
  }

  const uploadEditFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    // Validate file size
    if (file.size > BANNER_IMAGE_CONFIGS.MAX_IMAGE_SIZE) {
      setEditImageState({
        isImageClicked: true,
        isInvalidImageSize: true,
        isInvalidImageRatio: false,
        imageFile: file,
        imageUrl: null,
      })
      setIsEditingBanner((prev) => ({
        ...prev,
        image: {
          ...prev.image,
          value: originalBannerImageUrl,
          error: 'Image size should be less than 1MB.',
        },
      }))

      if (editFileInputRef.current) {
        editFileInputRef.current.value = ''
      }
      return
    }

    // Create image object for dimension validation
    const image = new Image()
    const reader = new FileReader()

    reader.onload = (fileLoadedEvent: ProgressEvent<FileReader>) => {
      const result = fileLoadedEvent.target?.result as string
      image.src = result

      image.onload = () => {
        const validation = validateImageDimensions(image)

        if (validation.isValid) {
          setEditImageState({
            isImageClicked: true,
            isInvalidImageSize: false,
            isInvalidImageRatio: false,
            imageFile: file,
            imageUrl: result,
          })
          // Update form data and clear any previous errors
          setIsEditingBanner((prev) => ({
            ...prev,
            image: {
              ...prev.image,
              value: result,
              error: null,
            },
          }))
        } else {
          setEditImageState({
            isImageClicked: true,
            isInvalidImageSize: false,
            isInvalidImageRatio: true,
            imageFile: file,
            imageUrl: null,
          })
          // Restore original image and set error
          setIsEditingBanner((prev) => ({
            ...prev,
            image: {
              ...prev.image,
              value: originalBannerImageUrl,
              error:
                validation.message ||
                'Invalid image aspect ratio. Image resolution should be 1920 x 1080 pixels or 1280 x 720 pixels.',
            },
          }))
        }
        // Reset file input to allow re-uploading the same file
        if (editFileInputRef.current) {
          editFileInputRef.current.value = ''
        }
      }

      image.onerror = () => {
        setEditImageState({
          isImageClicked: true,
          isInvalidImageSize: false,
          isInvalidImageRatio: true,
          imageFile: file,
          imageUrl: null,
        })
        // Restore original image and set error
        setIsEditingBanner((prev) => ({
          ...prev,
          image: {
            ...prev.image,
            value: originalBannerImageUrl,
            error: 'Failed to load image. Please ensure the file is a valid image.',
          },
        }))
        // Reset file input to allow re-uploading the same file
        if (editFileInputRef.current) {
          editFileInputRef.current.value = ''
        }
      }
    }

    reader.readAsDataURL(file)
  }

  const handleRemoveEditImage = () => {
    setEditImageState({
      isImageClicked: false,
      isInvalidImageSize: false,
      isInvalidImageRatio: false,
      imageFile: null,
      imageUrl: null,
    })
    // Restore the original banner image URL
    setIsEditingBanner((prev) => ({
      ...prev,
      image: {
        ...prev.image,
        value: originalBannerImageUrl,
        error: null,
      },
    }))
    if (editFileInputRef.current) {
      editFileInputRef.current.value = ''
    }
  }

  const onCreateBanner = async () => {
    // Update image field with validation state before validating
    const formDataWithImageValidation = {
      ...bannerFilterFormData,
      image: {
        ...bannerFilterFormData.image,
        imageValidationState: imageState,
      },
    }
    if (
      bannerFilterFormData.startDate.value &&
      bannerFilterFormData.expireAt.value &&
      moment(bannerFilterFormData.expireAt.value).isBefore(
        moment(bannerFilterFormData.startDate.value),
        'day'
      )
    ) {
      setBannerFilterFormData({
        ...bannerFilterFormData,
        expireAt: {
          ...bannerFilterFormData.expireAt,
          error: 'End date cannot be earlier than start date',
        },
      })
      return
    }

    const [validateData, isValid] = await validateFormData(formDataWithImageValidation)
    setBannerFilterFormData(validateData)

    if (isValid) {
      const filterFormParamsDto: CreateBannerDto = {
        bannerTitle: bannerFilterFormData.bannerTitle.value,
        bannerURL: bannerFilterFormData.bannerURL.value,
        bannerDesc: bannerFilterFormData.bannerDesc.value,
        image: bannerFilterFormData.image.value,
        startDate: moment(bannerFilterFormData.startDate.value).format(DATE_FORMAT),
        expiredAt: moment(bannerFilterFormData.expireAt.value).format(DATE_FORMAT),
      }

      dispatch(bannerActions.postBanner(filterFormParamsDto))
    }
  }

  const clearFormFields = () => {
    setBannerFilterFormData(INITIAL_FILTER_STATE)
    setImageState({
      isImageClicked: false,
      isInvalidImageSize: false,
      isInvalidImageRatio: false,
      imageFile: null,
      imageUrl: null,
    })
  }

  const closeBannerCreateAlert = () => {
    dispatch(alertActions.clearPostBannerAlert())
  }

  const closeBannerUpdateAlert = () => {
    dispatch(alertActions.clearUpdateBannerAlert())
  }

  const closeBannerDeleteAlert = () => {
    dispatch(alertActions.clearDeleteBannerAlert())
  }

  const getAllBannerList = () => {
    const params: BannerListQueryParamsDto = {
      getDisabledBanners: true,
    }
    dispatch(bannerActions.getBannerList(params))
  }

  const onImgClick = (imageUrl: string) => {
    setPreviewState({
      open: true,
      imageUrl,
    })
  }

  const handleClosePreview = () => {
    setPreviewState({
      open: false,
      imageUrl: null,
    })
  }

  // pagination
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }
  // pagination
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const onEditBannner = (selectedRowData: SetBannerAvailabilityDto) => {
    setIsOpenPopUp(true)
    // Store the original image URL for restoration if needed
    setOriginalBannerImageUrl(selectedRowData.imageURL || '')
    // Reset edit image state
    setEditImageState({
      isImageClicked: false,
      isInvalidImageSize: false,
      isInvalidImageRatio: false,
      imageFile: null,
      imageUrl: null,
    })
    setIsEditingBanner({
      ...isEditingBanner,
      bannerId: {
        ...isEditingBanner.bannerId,
        value: selectedRowData.bannerId,
      },
      bannerTitle: {
        ...isEditingBanner.bannerTitle,
        value: selectedRowData.bannerTitle,
      },
      bannerDesc: {
        ...isEditingBanner.bannerDesc,
        value: selectedRowData.bannerDesc,
      },
      bannerURL: {
        ...isEditingBanner.bannerURL,
        value: selectedRowData.bannerURL,
      },
      image: {
        ...isEditingBanner.image,
        value: selectedRowData.imageURL,
      },
      startDate: {
        ...isEditingBanner.startDate,
        value: selectedRowData.startDate,
      },
      expireAt: {
        ...isEditingBanner.expireAt,
        // @ts-expect-error-ignore
        value: moment.utc(selectedRowData.expiredAt).format('YYYY-MM-DD'),
      },
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onEditBannerHandleChange = (property: keyof typeof isEditingBanner, value: any) => {
    setIsEditingBanner({
      ...isEditingBanner,
      [property]: {
        ...isEditingBanner[property],
        value: value,
      },
    })
  }

  const onUpdateBanner = async () => {
    if (
      isEditingBanner.startDate.value &&
      isEditingBanner.expireAt.value &&
      moment(isEditingBanner.expireAt.value).isBefore(
        moment(isEditingBanner.startDate.value),
        'day'
      )
    ) {
      setIsEditingBanner({
        ...isEditingBanner,
        expireAt: {
          ...isEditingBanner.expireAt,
          error: 'End date cannot be earlier than start date',
        },
      })
      return
    }

    const formEditDataWithImageValidation = {
      ...isEditingBanner,
      image: {
        ...isEditingBanner.image,
        imageValidationState: editImageState,
      },
    }
    const [validateData, isValid] = await validateFormData(formEditDataWithImageValidation)
    setIsEditingBanner(validateData)
    if (isValid) {
      const editBannerParams: UpdateBannerDto = {
        startDate: moment(isEditingBanner.startDate.value).format(DATE_FORMAT),
        expiredAt: moment(isEditingBanner.expireAt.value).format(DATE_FORMAT),
        bannerId: isEditingBanner.bannerId.value,
        bannerTitle: isEditingBanner.bannerTitle.value,
        bannerDesc: isEditingBanner.bannerDesc.value,
        bannerURL: isEditingBanner.bannerURL.value,
        image: editImageState.imageFile ? editImageState.imageUrl : null,
      }
      dispatch(bannerActions.updateBanner(editBannerParams))
      setIsOpenPopUp(false)
      // Reset edit image state after successful update
      setEditImageState({
        isImageClicked: false,
        isInvalidImageSize: false,
        isInvalidImageRatio: false,
        imageFile: null,
        imageUrl: null,
      })
      // Clear any previous update alerts
      dispatch(alertActions.clearUpdateBannerAlert())
    }
  }

  const onClose = () => {
    setIsOpenPopUp(false)
    // Reset edit image state when closing without saving
    setEditImageState({
      isImageClicked: false,
      isInvalidImageSize: false,
      isInvalidImageRatio: false,
      imageFile: null,
      imageUrl: null,
    })
    // Reset editing banner to initial state
    setIsEditingBanner(INITIAL_UPDATE_BANNER_STATE)
    // Clear original image URL
    setOriginalBannerImageUrl('')
  }

  const handleEnableDisable = (row: SetBannerAvailabilityDto) => {
    setIsStatePopUpOpen(true)
    setIsStateBannerChangeRow({
      ...isStateBannerChangeRow,
      bannerStatus: {
        value: {
          bannerId: row.bannerId,
          bannerTitle: row.bannerTitle,
          bannerDesc: row.bannerDesc,
          isEnabled: row.isEnabled,
          image: row.imageURL,
          startDate: row.startDate,
          expiredAt: row.expiredAt,
          bannerURL: row.bannerURL,
        },
      },
    })
  }

  const handleStatusOnClose = () => {
    setIsStatePopUpOpen(false)
  }

  const bannerStatusChange = () => {
    const bannerStatusChangeParams: UpdateBannerDto = {
      bannerId: isStateBannerChangeRow.bannerStatus.value.bannerId,
      bannerTitle: isStateBannerChangeRow.bannerStatus.value.bannerTitle,
      bannerDesc: isStateBannerChangeRow.bannerStatus.value.bannerDesc,
      isEnabled: !isStateBannerChangeRow.bannerStatus.value.isEnabled,
      image: null, // No image update when changing status
      startDate: moment
        .utc(isStateBannerChangeRow.bannerStatus.value.startDate)
        .format(DATE_FORMAT),
      expiredAt: moment
        .utc(isStateBannerChangeRow.bannerStatus.value.expiredAt)
        .format(DATE_FORMAT),
      bannerURL: isStateBannerChangeRow.bannerStatus.value.bannerURL,
    }
    dispatch(bannerActions.updateBanner(bannerStatusChangeParams))
    setIsStatePopUpOpen(false)
    // Clear any previous update alerts
    dispatch(alertActions.clearUpdateBannerAlert())
  }

  const bannerStatusChangeClick = () => {
    setIsStatePopUpOpen(false)
  }

  const onCloseDeleteBanner = () => {
    setIsDeleteBannerPopUpOpen(false)
    setIsDeleteBannerRow(null)
  }

  const handleDeleteBanner = (row: SetBannerAvailabilityDto) => {
    setIsDeleteBannerPopUpOpen(true)
    setIsDeleteBannerRow(row)
  }

  const bannerDeleteChange = () => {
    if (isDeleteBannerRow) {
      const deleteBannerParams: DeleteBannerParamsDto = {
        bannerId: isDeleteBannerRow.bannerId,
      }
      dispatch(bannerActions.deleteBanner(deleteBannerParams))
      setIsDeleteBannerPopUpOpen(false)
      setIsDeleteBannerRow(null)
      // Clear any previous delete alerts
      dispatch(alertActions.clearDeleteBannerAlert())
    }
  }

  const bannerDeleteChangeClick = () => {
    setIsDeleteBannerPopUpOpen(false)
    setIsDeleteBannerRow(null)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchFilter(event.target.value)
  }
  return (
    <React.Fragment>
      <AppLayout breadcrumb={BREAD_CRUMB.BANNER_MANAGEMENT}>
        <Grid>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', mb: 1 }}>
            <p
              style={{
                paddingBottom: 7,
                margin: 0,
                fontWeight: 400,
                fontSize: '24px',
              }}
            >
              Banner Management
            </p>
          </Box>
          <Divider className="dividerStyle" />
          <Grid container spacing={2} mt={2}>
            <Grid size={{ xs: 12, sm: 12, md: 3 }} className="sectionTitleHolder">
              <h3>Manage Badges</h3>
              <p>Add new banners to the application can be done by using this section.</p>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 9 }}>
              {bannerCreateAlert.message && (
                <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
                  <Alert onClose={closeBannerCreateAlert} severity={bannerCreateAlert.severity}>
                    {bannerCreateAlert.message}
                  </Alert>
                </div>
              )}
              <BannerCreateForm
                bannerFilterFormData={bannerFilterFormData}
                onFilterHandleChange={onFilterHandleChange}
                fileInputRef={fileInputRef}
                imageState={imageState}
                handleImageClick={handleImageClick}
                uploadFile={uploadFile}
                handleRemoveImage={handleRemoveImage}
                onCreateBanner={onCreateBanner}
                clearFormFields={clearFormFields}
                isCreating={isCreatingBanner}
              />
            </Grid>
          </Grid>
          <Divider style={{ margin: '20px 0px 30px 0px', width: '100%' }} />
          <Grid container spacing={2} mt={2}>
            <Grid size={{ md: 3 }} className="sectionTitleHolder">
              <h3>Manage Banners</h3>
              <p>Edit & Deactivate existing banners can be done using this section.</p> <br />
              <br />
              <TextField
                size="small"
                fullWidth
                variant="outlined"
                color="primary"
                placeholder="Search Banner"
                value={searchFilter}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlinedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 9 }}>
              {bannerUpdateAlert.message && (
                <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
                  <Alert onClose={closeBannerUpdateAlert} severity={bannerUpdateAlert.severity}>
                    {bannerUpdateAlert.message}
                  </Alert>
                </div>
              )}
              {bannerDeleteAlert.message && (
                <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
                  <Alert onClose={closeBannerDeleteAlert} severity={bannerDeleteAlert.severity}>
                    {bannerDeleteAlert.message}
                  </Alert>
                </div>
              )}
              <BannerTableView
                bannerList={
                  filteredBannerList.length > 0 || searchFilter
                    ? filteredBannerList
                    : filterBannerRow || []
                }
                onImgClick={onImgClick}
                onEditBannner={onEditBannner}
                page={page}
                rowsPerPage={rowsPerPage}
                handleEnableDisable={handleEnableDisable}
                handleDeleteBanner={handleDeleteBanner}
                bannerListIsLoading={bannerListIsLoading}
              >
                <AppTablePagination
                  data={
                    filteredBannerList.length > 0 || searchFilter
                      ? filteredBannerList
                      : filterBannerRow || []
                  }
                  page={page}
                  rowsPerPage={rowsPerPage}
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </BannerTableView>
            </Grid>
          </Grid>
        </Grid>
        <BannerEditPopUp
          onEditBannerHandleChange={onEditBannerHandleChange}
          IsEdingBanner={isEditingBanner}
          onUpdateBanner={onUpdateBanner}
          onClose={onClose}
          isOpen={isOpenPopUp}
          editFileInputRef={editFileInputRef}
          editImageState={editImageState}
          handleEditImageClick={handleEditImageClick}
          uploadEditFile={uploadEditFile}
          handleRemoveEditImage={handleRemoveEditImage}
        />
        <BannerPreview
          open={previewState.open}
          imageUrl={previewState.imageUrl}
          onClose={handleClosePreview}
        />
        <BannerStatusChangePopUp
          isOpen={isStatusPopUpOpen}
          onClose={handleStatusOnClose}
          isStatusChangeRow={isStateBannerChangeRow}
          bannerStatusChange={bannerStatusChange}
          bannerStatusChangeClick={bannerStatusChangeClick}
        />
        <BannerDeletePopUp
          onClose={onCloseDeleteBanner}
          isOpen={isDeleteBannerPopUpOpen}
          isDeleteRow={isDeleteBannerRow || ({} as SetBannerAvailabilityDto)}
          bannerDeleteChange={bannerDeleteChange}
          bannerDeleteChangeClick={bannerDeleteChangeClick}
        />
      </AppLayout>
    </React.Fragment>
  )
}

export default BannerManagement
