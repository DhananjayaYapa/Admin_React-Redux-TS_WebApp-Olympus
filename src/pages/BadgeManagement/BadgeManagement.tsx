import React, { useEffect, useRef, useState } from 'react'
import { AppLayout } from '../../templates'
import {
  APP_ROUTES,
  APP_TABLE_CONFIGS,
  BADGE_IMAGE_CONFIGS,
  BREAD_CRUMB,
} from '../../utilities/constants'
import { Alert, Box, Divider, Grid, InputAdornment, TextField } from '@mui/material'
import BadeCreateForm from '../../components/badge-Management/badgeCreateForm/BadgeCreateForm'
import type { AppStateDto, ImageValidationState } from '../../utilities/models'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { AppTablePagination } from '../../components'
import BadgeTableView from '../../components/badge-Management/badgeTableView/BadgeTableView'
import type {
  BadgeFilterFormDto,
  BadgeListQueryParamsDto,
  BadgeUpdateFormDto,
  CreateBadgeDto,
  SetBadgeAvailabilityDto,
  UpdateBadgeDto,
} from '../../utilities/models/badge.model'
import { validateFormData } from '../../utilities/helpers'
import BadgeEditPopUp from '../../components/badge-Management/badgeEditPopup/BadgeEditPopUp'
import BadgePreview from '../../components/badge-Management/badgePreview/BadgePreview'
import BadgeStausChangePopUp from '../../components/badge-Management/badgeStatusPopup/BadgeStatusChangePopup'
import { useDispatch, useSelector } from 'react-redux'
import { alertActions, badgeActions } from '../../redux/actions'
import { useNavigate } from 'react-router-dom'

const BadgeManagement: React.FC = () => {
  const dispatch = useDispatch()
  const badgeCreateAlert = useSelector((state: AppStateDto) => state.alert.postBadgeAlert)
  const badgeUpdateAlert = useSelector((state: AppStateDto) => state.alert.updateBadgeAlert)
  const allBadgeList = useSelector((state: AppStateDto) => state.badge.getBadgeList.data)

  const INITIAL_FILTER_STATE = {
    badge: {
      name: 'badge_image',
      value: '',
      validator: 'image',
      isRequired: true,
      error: null,
      imageValidationState: null,
    },
    title: {
      name: 'Badge Title',
      value: '',
      validator: 'string',
      isRequired: true,
      error: null,
    },
    description: {
      value: '',
      validator: 'string',
      isRequired: false,
      error: null,
    },
    isEnable: {
      value: true,
      validator: 'boolean',
      isRequired: true,
      error: null,
    },
    url: {
      value: '',
      validator: 'string',
      isRequired: false,
      error: null,
    },
  }

  const INITIAL_UPDATE_BADGE_STATE = {
    id: {
      value: -1,
      isRequired: true,
      error: null,
    },
    badge: {
      name: 'badge_image',
      value: '',
      validator: 'image',
      isRequired: false,
      error: null,
      imageValidationState: null,
    },

    title: {
      name: 'Badge Title',
      value: '',
      validator: 'string',
      isRequired: true,
      error: null,
    },
    url: {
      value: '',
      validator: 'string',
      isRequired: true,
      error: null,
    },
    description: {
      value: '',
      validator: 'string',
      isRequired: false,
      error: null,
    },
    isEnable: {
      value: true,
      validator: 'boolean',
      isRequired: true,
      error: null,
    },
  }
  const INITIAL_BADGE_STATUS_STATE = {
    badgeStatus: {
      value: {} as UpdateBadgeDto,
    },
  }

  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const editFileInputRef = useRef<HTMLInputElement>(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(APP_TABLE_CONFIGS.DEFAULT_ROWS_PER_PAGE)
  const [isEditingBadge, setIsEditingBadge] = useState<BadgeUpdateFormDto>(
    INITIAL_UPDATE_BADGE_STATE
  )
  const [badgeFilterFormData, setBadgeFilterFormData] =
    useState<BadgeFilterFormDto>(INITIAL_FILTER_STATE)
  const [isStateBadgeChangeRow, setIsStateBadgeChangeRow] = useState(INITIAL_BADGE_STATUS_STATE)
  const [isOpenPopUp, setIsOpenPopUp] = useState(false)
  const [searchFilter, setSearchFilter] = useState<string>('')
  const [filterBadgeRow, setFilteredBadgeRow] = useState<SetBadgeAvailabilityDto[]>([])
  const [filteredBadgeList, setFilteredBadgeList] = useState<SetBadgeAvailabilityDto[]>([])
  const [isStatusPopUpOpen, setIsStatePopUpOpen] = useState(false)
  const [originalBannerImageUrl, setOriginalBannerImageUrl] = useState<string>('')

  const [imageState, setImageState] = useState<ImageValidationState>({
    isImageClicked: false,
    isInvalidImageRatio: false,
    isInvalidImageSize: false,
    imageFile: null,
    imageUrl: null,
  })
  const [previewState, setPreviewState] = useState<{
    open: boolean
    imageUrl: string | null
    title: string | null
  }>({
    open: false,
    imageUrl: null,
    title: null,
  })

  const [editImageState, setEditImageState] = useState<ImageValidationState>({
    isImageClicked: false,
    isInvalidImageRatio: false,
    isInvalidImageSize: false,
    imageFile: null,
    imageUrl: null,
  })

  {
    /*.............................................................................Get all badges.......................................................................................*/
  }

  const getAllBadgeList = () => {
    const params: BadgeListQueryParamsDto = {
      getDisabled: true,
    }
    dispatch(badgeActions.getBadgeList(params))
  }

  React.useEffect(() => {
    getAllBadgeList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    setFilteredBadgeRow(allBadgeList?.data)
  }, [allBadgeList])

  {
    /*.............................................................................Alerts.......................................................................................*/
  }

  useEffect(() => {
    if (badgeCreateAlert.serverity === 'success' || badgeCreateAlert.serverity === 'error')
      clearFormFields()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [badgeCreateAlert])

  const closeBadgeCreateAlert = () => {
    dispatch(alertActions.clearPostBadgeAlert())
  }

  const closeBannerUpdateAlert = () => {
    dispatch(alertActions.clearUpdateBadgeAlert())
  }

  {
    /*.............................................................................Search Field.......................................................................................*/
  }

  useEffect(() => {
    const trimmedFilter = searchFilter.trim().toLowerCase()

    if (!trimmedFilter) {
      setFilteredBadgeList([])
      return
    }

    // Normalize both hyphens AND underscores: remove spaces around them
    const normalizedFilter = trimmedFilter.replace(/\s*-\s*/g, '-').replace(/\s*_\s*/g, '_')

    const filtered =
      filterBadgeRow?.filter((badge: SetBadgeAvailabilityDto) => {
        const statusText = badge.isEnable ? 'enabled' : 'disabled'

        const title = (badge.title?.toLowerCase() || '')
          .replace(/\s*-\s*/g, '-')
          .replace(/\s*_\s*/g, '_')

        const description = (badge.description?.toLowerCase() || '')
          .replace(/\s*-\s*/g, '-')
          .replace(/\s*_\s*/g, '_')

        return (
          title.includes(normalizedFilter) ||
          description.includes(normalizedFilter) ||
          statusText.includes(trimmedFilter)
        )
      }) || []

    setFilteredBadgeList(filtered)
    setPage(0)
  }, [searchFilter, filterBadgeRow])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchFilter(event.target.value)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFilterHandleChange = (field: keyof BadgeFilterFormDto, value: any) => {
    setBadgeFilterFormData((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value,
        error: null,
      },
    }))
  }

  {
    /*.............................................................................Pagination.......................................................................................*/
  }

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  {
    /*.............................................................................Clear Data.......................................................................................*/
  }

  const clearFormFields = () => {
    setBadgeFilterFormData(INITIAL_FILTER_STATE)
    setImageState({
      isImageClicked: false,
      isInvalidImageSize: false,
      isInvalidImageRatio: false,
      imageFile: null,
      imageUrl: null,
    })
  }

  {
    /*.............................................................................Upload Image on Create.......................................................................................*/
  }

  const handleImageClick = () => {
    setImageState((prev) => ({ ...prev, isImageClicked: true }))
    fileInputRef.current?.click()
  }

  const validateImageDimensions = (
    image: HTMLImageElement
  ): { isValid: boolean; message?: string } => {
    const { WIDTH: WIDTH1, HEIGHT: HEIGHT1 } = BADGE_IMAGE_CONFIGS.IMAGE_RATIO_TYPE1
    const { WIDTH: WIDTH2, HEIGHT: HEIGHT2 } = BADGE_IMAGE_CONFIGS.IMAGE_RATIO_TYPE2

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

  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    // Validate file size
    if (file.size > BADGE_IMAGE_CONFIGS.MAX_IMAGE_SIZE) {
      setImageState({
        isImageClicked: true,
        isInvalidImageSize: true,
        isInvalidImageRatio: false,
        imageFile: file,
        imageUrl: null,
      })
      onFilterHandleChange('badge', '')
      setBadgeFilterFormData((prev) => ({
        ...prev,
        image: {
          ...prev.badge,
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
          setBadgeFilterFormData((prev) => ({
            ...prev,
            badge: {
              ...prev.badge,
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
          onFilterHandleChange('badge', '')
          setBadgeFilterFormData((prev) => ({
            ...prev,
            badge: {
              ...prev.badge,
              value: '',
              error:
                validation.message ||
                'Invalid image aspect ratio. Image resolution should be 500 x 500 pixels or 250 x 250 pixels.',
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
        onFilterHandleChange('badge', '')
        setBadgeFilterFormData((prev) => ({
          ...prev,
          image: {
            ...prev.badge,
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
    setBadgeFilterFormData((prev) => ({
      ...prev,
      image: {
        ...prev.badge,
        value: '',
        error: null,
      },
    }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const onImgClick = (imageUrl: string, title: string) => {
    setPreviewState({
      open: true,
      imageUrl,
      title,
    })
  }

  const handleClosePreview = () => {
    setPreviewState({
      open: false,
      imageUrl: null,
      title: null,
    })
  }

  const handleEditImageClick = () => {
    setEditImageState((prev) => ({ ...prev, isImageClicked: true }))
    editFileInputRef.current?.click()
  }

  {
    /*.............................................................................Upload Image on Edit.......................................................................................*/
  }

  const uploadEditFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    // Validate file size
    if (file.size > BADGE_IMAGE_CONFIGS.MAX_IMAGE_SIZE) {
      setEditImageState({
        isImageClicked: true,
        isInvalidImageSize: true,
        isInvalidImageRatio: false,
        imageFile: file,
        imageUrl: null,
      })
      setIsEditingBadge((prev) => ({
        ...prev,
        badge: {
          ...prev.badge,
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
          setIsEditingBadge((prev) => ({
            ...prev,
            badge: {
              ...prev.badge,
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
          setIsEditingBadge((prev) => ({
            ...prev,
            badge: {
              ...prev.badge,
              value: originalBannerImageUrl,
              error:
                validation.message ||
                'Invalid image aspect ratio. Image resolution should be 500 x 500 pixels or 250 x 250 pixels.',
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
        setIsEditingBadge((prev) => ({
          ...prev,
          badge: {
            ...prev.badge,
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
    setIsEditingBadge((prev) => ({
      ...prev,
      badge: {
        ...prev.badge,
        value: originalBannerImageUrl,
        error: null,
      },
    }))
    if (editFileInputRef.current) {
      editFileInputRef.current.value = ''
    }
  }

  {
    /*.............................................................................Create Badge.......................................................................................*/
  }

  const onCreateBadge = async () => {
    // Update image field with validation state before validating
    const formDataWithImageValidation = {
      ...badgeFilterFormData,
      badge: {
        ...badgeFilterFormData.badge,
        imageValidationState: imageState,
      },
    }

    const [validateData, isValid] = await validateFormData(formDataWithImageValidation)
    setBadgeFilterFormData(validateData)
    if (isValid) {
      const filterFormParamsDto: CreateBadgeDto = {
        badge: badgeFilterFormData.badge.value,
        title: badgeFilterFormData.title.value,
        url: badgeFilterFormData.url.value,
        description: badgeFilterFormData.description.value,
        isEnable: badgeFilterFormData.isEnable.value,
      }

      dispatch(badgeActions.postBadge(filterFormParamsDto))
    }
  }

  {
    /*.............................................................................Update Badge.......................................................................................*/
  }

  const onEditBadge = (selectedRowData: SetBadgeAvailabilityDto) => {
    setIsOpenPopUp(true)
    // Store the original image URL for restoration if needed
    setOriginalBannerImageUrl(selectedRowData.url || '')
    // Reset edit image state
    setEditImageState({
      isImageClicked: false,
      isInvalidImageSize: false,
      isInvalidImageRatio: false,
      imageFile: null,
      imageUrl: null,
    })
    setIsEditingBadge({
      ...isEditingBadge,
      id: {
        ...isEditingBadge.id,
        value: selectedRowData.id,
      },
      url: {
        ...isEditingBadge.url,
        value: selectedRowData.url,
      },
      title: {
        ...isEditingBadge.title,
        value: selectedRowData.title,
      },
      isEnable: {
        ...isEditingBadge.isEnable,
        value: Boolean(selectedRowData.isEnable),
      },

      description: {
        ...isEditingBadge.description,
        value: selectedRowData.description,
      },
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onEditBadgeHandleChange = (property: keyof typeof isEditingBadge, value: any) => {
    setIsEditingBadge({
      ...isEditingBadge,
      [property]: {
        ...isEditingBadge[property],
        value: value,
      },
    })
  }

  const onUpdateBadge = async () => {
    const formEditDataWithImageValidation = {
      ...isEditingBadge,
      badge: {
        ...isEditingBadge.badge,
        imageValidationState: editImageState,
      },
    }
    const [validateData, isValid] = await validateFormData(formEditDataWithImageValidation)
    setIsEditingBadge(validateData)
    if (isValid) {
      const editBadgeParams: UpdateBadgeDto = {
        id: isEditingBadge.id.value,
        badge: editImageState.imageFile ? editImageState.imageUrl : null,
        title: isEditingBadge.title.value,
        description: isEditingBadge.description.value,
        url: isEditingBadge.url.value,
        isEnable: isEditingBadge.isEnable.value,
      }

      dispatch(badgeActions.updateBadge(editBadgeParams))
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
      dispatch(alertActions.clearUpdateBadgeAlert())
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
    setIsEditingBadge(INITIAL_UPDATE_BADGE_STATE)
    // Clear original image URL
    setOriginalBannerImageUrl('')
  }

  {
    /*.............................................................................Status Change.......................................................................................*/
  }

  const handleEnableDisable = (row: SetBadgeAvailabilityDto) => {
    setIsStatePopUpOpen(true)
    setIsStateBadgeChangeRow({
      ...isStateBadgeChangeRow,
      badgeStatus: {
        value: {
          id: row.id,
          badge: row.badge ?? null,
          title: row.title,
          description: row.description,
          isEnable: Boolean(row.isEnable),
          url: row.url,
        },
      },
    })
  }

  const handleStatusOnClose = () => {
    setIsStatePopUpOpen(false)
  }

  const badgeStatusChange = () => {
    const badgeStatusChangeParams: UpdateBadgeDto = {
      id: isStateBadgeChangeRow.badgeStatus.value.id,
      badge: isStateBadgeChangeRow.badgeStatus.value.badge,
      title: isStateBadgeChangeRow.badgeStatus.value.title,
      description: isStateBadgeChangeRow.badgeStatus.value.description,
      isEnable: !isStateBadgeChangeRow.badgeStatus.value.isEnable,
      url: isStateBadgeChangeRow.badgeStatus.value.url,
    }

    dispatch(badgeActions.updateBadge(badgeStatusChangeParams))
    setIsStatePopUpOpen(false)
    // Clear any previous update alerts
    dispatch(alertActions.clearUpdateBadgeAlert())
  }

  const badgeStatusChangeClick = () => {
    setIsStatePopUpOpen(false)
  }

  const handleAssignBadge = (row: SetBadgeAvailabilityDto) => {
    // Navigate and pass data via state
    navigate(APP_ROUTES.BADGE_ASSIGNMENT, {
      state: {
        badgeDetails: row,
      },
    })
  }

  return (
    <React.Fragment>
      <AppLayout breadcrumb={BREAD_CRUMB.BADGE_ASSIGNMENT}>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <p
            style={{
              paddingBottom: 7,
              margin: 0,
              fontWeight: 400,
              fontSize: '24px',
            }}
          >
            Badge Management
          </p>
        </Box>
        <Divider className="dividerStyle" />

        <Grid container spacing={2} mt={2}>
          <Grid size={{ xs: 12, sm: 12, md: 3 }} className="sectionTitleHolder">
            <h3>Add Badges</h3>
            <p>Add new badges to the application can be done by using this section.</p>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 9 }} mb={2}>
            {badgeCreateAlert.message && (
              <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
                <Alert onClose={closeBadgeCreateAlert} severity={badgeCreateAlert.severity}>
                  {badgeCreateAlert.message}
                </Alert>
              </div>
            )}

            <BadeCreateForm
              badgeFilterFormData={badgeFilterFormData}
              onFilterHandleChange={onFilterHandleChange}
              fileInputRef={fileInputRef}
              imageState={imageState}
              handleImageClick={handleImageClick}
              uploadFile={uploadFile}
              handleRemoveImage={handleRemoveImage}
              onCreateBadge={onCreateBadge}
              clearFormFields={clearFormFields}
            />
          </Grid>
        </Grid>
        <Divider className="dividerStyle" />

        <Grid container spacing={2} mt={2} mb={3}>
          <Grid size={{ md: 3 }} className="sectionTitleHolder">
            <h3>Manage Badges</h3>
            <p>Edit, Deactivate & Assign badges can be done using this section.</p> <br />
            <TextField
              label="Search Badges"
              id="outlined-basic"
              size="small"
              fullWidth
              variant="outlined"
              color="primary"
              placeholder="Search"
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
            {badgeUpdateAlert.message && (
              <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
                <Alert onClose={closeBannerUpdateAlert} severity={badgeUpdateAlert.severity}>
                  {badgeUpdateAlert.message}
                </Alert>
              </div>
            )}
            <BadgeTableView
              bannerList={
                filteredBadgeList.length > 0 || searchFilter
                  ? filteredBadgeList
                  : filterBadgeRow || []
              }
              onImgClick={onImgClick}
              onEditBannner={onEditBadge}
              page={page}
              rowsPerPage={rowsPerPage}
              handleEnableDisable={handleEnableDisable}
              handleAssignBadge={handleAssignBadge}
            >
              <AppTablePagination
                data={
                  filteredBadgeList.length > 0 || searchFilter
                    ? filteredBadgeList
                    : filterBadgeRow || []
                }
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </BadgeTableView>
          </Grid>
        </Grid>
        <BadgeEditPopUp
          onEditBadgeHandleChange={onEditBadgeHandleChange}
          IsEdingBadge={isEditingBadge}
          onUpdateBanner={onUpdateBadge}
          onClose={onClose}
          isOpen={isOpenPopUp}
          editFileInputRef={editFileInputRef}
          editImageState={editImageState}
          handleEditImageClick={handleEditImageClick}
          uploadEditFile={uploadEditFile}
          handleRemoveEditImage={handleRemoveEditImage}
        />
        <BadgePreview
          name={previewState.title}
          open={previewState.open}
          imageUrl={previewState.imageUrl}
          onClose={handleClosePreview}
        />
        <BadgeStausChangePopUp
          isOpen={isStatusPopUpOpen}
          onClose={handleStatusOnClose}
          isStatusChangeRow={isStateBadgeChangeRow}
          badgeStatusChange={badgeStatusChange}
          badgeStatusChangeClick={badgeStatusChangeClick}
        />
      </AppLayout>
    </React.Fragment>
  )
}

export default BadgeManagement
