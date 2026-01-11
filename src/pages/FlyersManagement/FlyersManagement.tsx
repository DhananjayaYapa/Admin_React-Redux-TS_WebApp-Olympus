import React, { useState, useRef, useEffect } from 'react'
import { AppLayout } from '../../templates'
import { BREAD_CRUMB } from '../../utilities/constants'
import { Alert, Box, Divider, Grid } from '@mui/material'
import {
  AppTablePagination,
  FlyersDeletePopUp,
  FlyersEntryForm,
  FlyersList,
} from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { alertActions, flyerActions } from '../../redux/actions'
import type {
  AppStateDto,
  CreateFlyerDto,
  FlyerBriefTypeDto,
  FlyerValidationState,
  TagsDto,
  FlyerFilterFormDto,
  TypeDto,
  FlyerListQueryParamsDto,
  GetFlyerListDto,
  FlyerDeleteDto,
} from '../../utilities/models'
import { BANNER_IMAGE_CONFIGS } from '../../utilities/constants/app.constants'
import { validateFormData } from '../../utilities/helpers'

const FlyersManagement: React.FC = () => {
  const INITIAL_FLYER_FORM_STATE: FlyerFilterFormDto = {
    flyerType: {
      value: 2,
      validator: 'number',
      isRequired: true,
      error: null,
    },
    tagId: {
      value: null,
      validator: 'object',
      isRequired: true,
      error: null,
    },
    greeting: {
      value: '',
      validator: 'text',
      isRequired: true,
      error: null,
    },
    image: {
      value: '',
      validator: 'image',
      isRequired: true,
      error: null,
      imageValidationState: null,
    },
  }

  const dispatch = useDispatch()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const flyerTagsData = useSelector((state: AppStateDto) => state.flyer.getFlyerTags.data)
  const flyerListData = useSelector((state: AppStateDto) => state.flyer.getFlyerList.data?.data)
  const flyerPostAlert = useSelector((state: AppStateDto) => state.alert.postFlyer)
  const flyerDeleteAlert = useSelector((state: AppStateDto) => state.alert.deleteFlyer)
  const flyerListItemsIsLoading = useSelector(
    (state: AppStateDto) => state.flyer.getFlyerList.isLoading
  )
  const isUploading = useSelector((state: AppStateDto) => state.flyer.postFlyer.isLoading)

  const [flyerFormData, setFlyerFormData] = useState<FlyerFilterFormDto>(INITIAL_FLYER_FORM_STATE)
  const [availableTags, setAvailableTags] = useState<TagsDto[]>([])
  const [imageState, setImageState] = useState<FlyerValidationState>({
    isImageClicked: false,
    isInvalidImageRatio: false,
    isInvalidImageSize: false,
    imageFile: null,
    imageUrl: null,
  })
  const [availableFilterTags, setAvailableFilterTags] = useState<TagsDto[]>([])
  const [selectedType, setSelectedType] = useState<TypeDto | null>(null)
  const [selectedTag, setSelectedTag] = useState<TagsDto | null>(null)
  const [flyerListItems, setFlyerListItems] = useState<GetFlyerListDto[]>([])
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(3)
  const [isOpen, setisOpen] = useState(false)
  const [isDeleteFlyer, setisDeleteFlyer] = useState<GetFlyerListDto | null>(null)

  useEffect(() => {
    dispatch(flyerActions.getFlyerTags())
    dispatch(flyerActions.getFlyerList({}))
  }, [dispatch])

  // Update available tags when flyerType changes or data loads
  useEffect(() => {
    if (flyerTagsData && flyerTagsData.data) {
      const typeData = flyerTagsData.data.find(
        (item: FlyerBriefTypeDto) => item.typeId === flyerFormData.flyerType.value
      )
      if (typeData && typeData.tags) {
        setAvailableTags(typeData.tags)
      } else {
        setAvailableTags([])
      }
    }
  }, [flyerFormData.flyerType.value, flyerTagsData])

  useEffect(() => {
    if (flyerPostAlert.severity === 'error' || flyerPostAlert.severity === 'success')
      clearFormFields()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flyerPostAlert])

  useEffect(() => {
    setFlyerListItems(flyerListData || [])
  }, [flyerListData])

  const availableFilterTypes =
    flyerTagsData?.data?.map((type: TypeDto) => {
      return { typeId: type.typeId, typeName: type.typeName }
    }) || []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const flyerFormFilterHandle = (field: keyof FlyerFilterFormDto, value: any) => {
    setFlyerFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value,
        error: null,
      },
    }))
  }

  const flyerInputFocusHandle = (field: keyof FlyerFilterFormDto) => {
    setFlyerFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        error: null,
      },
    }))
  }

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newType = Number(event.target.value)
    flyerFormFilterHandle('flyerType', newType)
    flyerFormFilterHandle('tagId', null)
  }

  const validateImageDimensions = (
    image: HTMLImageElement
  ): { isValid: boolean; message?: string } => {
    const { WIDTH: WIDTH1, HEIGHT: HEIGHT1 } = BANNER_IMAGE_CONFIGS.FLYER_IMAGE_TYPE

    const isValidRatio = image.width === WIDTH1 && image.height === HEIGHT1

    if (!isValidRatio) {
      return {
        isValid: false,
        message: `Invalid image aspect ratio, image resolution should be ${WIDTH1} x ${HEIGHT1} pixels`,
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
      flyerFormFilterHandle('image', '')
      setFlyerFormData((prev) => ({
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
          setFlyerFormData((prev) => ({
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
          flyerFormFilterHandle('image', '')
          setFlyerFormData((prev) => ({
            ...prev,
            image: {
              ...prev.image,
              value: '',
              error:
                validation.message ||
                'Invalid image aspect ratio. Image resolution should be 800 x 600 pixels.',
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
        flyerFormFilterHandle('image', '')
        setFlyerFormData((prev) => ({
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

  const onCreateFlyer = async () => {
    // Update image field with validation state before validating
    const formDataWithImageValidation = {
      ...flyerFormData,
      image: {
        ...flyerFormData.image,
        imageValidationState: imageState,
      },
    }

    const [validatedData, isValid] = await validateFormData(formDataWithImageValidation)
    setFlyerFormData(validatedData)

    if (isValid) {
      const payload: CreateFlyerDto = {
        typeId: validatedData.flyerType.value,
        tagId: validatedData.tagId.value,
        greeting: validatedData.greeting.value.trim(),
        flyer: validatedData.image.value,
      }
      dispatch(flyerActions.postFlyer(payload))
    }
  }

  const clearFormFields = () => {
    setFlyerFormData(INITIAL_FLYER_FORM_STATE)
    setImageState({
      isImageClicked: false,
      isInvalidImageRatio: false,
      isInvalidImageSize: false,
      imageFile: null,
      imageUrl: null,
    })
  }
  const onPostFlyerCloseAlert = () => {
    dispatch(alertActions.clearPostFlyerAlert())
  }
  const onFilterTypeChange = (type: TypeDto | null) => {
    setSelectedType(type)
    setSelectedTag(null)
    if (type && flyerTagsData && flyerTagsData.data) {
      const typeData = flyerTagsData.data.find(
        (item: FlyerBriefTypeDto) => item.typeId === type.typeId
      )
      if (typeData && typeData.tags) {
        setAvailableFilterTags(typeData.tags)
      } else {
        setAvailableFilterTags([])
      }
    } else {
      setAvailableFilterTags([])
    }
  }
  const onFilterTagChange = (tag: TagsDto | null) => {
    setSelectedTag(tag)
  }
  const onFilter = () => {
    const params: FlyerListQueryParamsDto = {
      typeId: selectedType?.typeId,
      tagId: selectedTag?.tagId,
    }
    dispatch(flyerActions.getFlyerList(params))
  }
  const onClearFilter = () => {
    setSelectedType(null)
    setSelectedTag(null)
    dispatch(flyerActions.getFlyerList({}))
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
  const onDeleteFlyerHandle = (flyer: GetFlyerListDto) => {
    setisDeleteFlyer(flyer)
    setisOpen(true)
  }
  const flyerDeleteChangeClick = () => {
    setisOpen(false)
  }
  const flyerOnClose = () => {
    setisOpen(false)
    setisDeleteFlyer(null)
  }
  const flyerDeleteChange = () => {
    if (isDeleteFlyer) {
      const deletedFlyerParams: FlyerDeleteDto = {
        id: isDeleteFlyer.id,
      }
      dispatch(flyerActions.deleteFlyer(deletedFlyerParams))
      setisOpen(false)
    }
  }
  const onDeleteFlyerCloseAlert = () => {
    dispatch(alertActions.clearDeleteFlyerAlert())
  }
  return (
    <React.Fragment>
      <AppLayout breadcrumb={BREAD_CRUMB.FLYER_MANAGEMENT}>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <p
            style={{
              paddingBottom: 7,
              margin: 0,
              fontWeight: 400,
              fontSize: '24px',
            }}
          >
            Flyer Management
          </p>
        </Box>
        <Divider className="dividerStyle" />
        <Grid container spacing={2} mt={2} mb={2}>
          <Grid size={{ xs: 12, sm: 12, md: 3 }} className="sectionTitleHolder">
            <h3>Upload Flyer Template</h3>
            <p>Upload selected flyer template using this section.</p>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 9 }}>
            {flyerPostAlert.message && (
              <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
                <Alert onClose={onPostFlyerCloseAlert} severity={flyerPostAlert.severity}>
                  {flyerPostAlert.message}
                </Alert>
              </div>
            )}
            <FlyersEntryForm
              flyerFormData={flyerFormData}
              flyerFormFilterHandle={flyerFormFilterHandle}
              flyerInputFocusHandle={flyerInputFocusHandle}
              availableTags={availableTags}
              imageState={imageState}
              fileInputRef={fileInputRef}
              handleRadioChange={handleRadioChange}
              handleImageClick={handleImageClick}
              uploadFile={uploadFile}
              onCreateFlyer={onCreateFlyer}
              clearFormFields={clearFormFields}
              isUploading={isUploading}
            />
          </Grid>
        </Grid>
        <Divider className="dividerStyle" />
        <Grid container spacing={2} mt={2}>
          <Grid size={{ xs: 12, sm: 12, md: 3 }} className="sectionTitleHolder">
            <h3>Manage Templates</h3>
            <p>View/Remove flyer template using this section.</p>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 9 }}>
            {flyerDeleteAlert.message && (
              <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
                <Alert onClose={onDeleteFlyerCloseAlert} severity={flyerDeleteAlert.severity}>
                  {flyerDeleteAlert.message}
                </Alert>
              </div>
            )}
            <FlyersList
              availableTypes={availableFilterTypes}
              availableTags={availableFilterTags}
              onFilterTypeChange={onFilterTypeChange}
              onFilterTagChange={onFilterTagChange}
              selectedType={selectedType}
              selectedTag={selectedTag}
              onFilter={onFilter}
              onClear={onClearFilter}
              flyerListItems={flyerListItems}
              page={page}
              rowsPerPage={rowsPerPage}
              onDeleteFlyerHandle={onDeleteFlyerHandle}
              flyerListItemsIsLoading={flyerListItemsIsLoading}
            >
              <AppTablePagination
                data={flyerListItems?.length > 0 ? flyerListItems : []}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                rowsPerPageOptions={[3, 6]}
              />
            </FlyersList>
          </Grid>
        </Grid>
        <FlyersDeletePopUp
          flyerDeleteChangeClick={flyerDeleteChangeClick}
          onClose={flyerOnClose}
          isOpen={isOpen}
          isDeleteFlyer={isDeleteFlyer}
          flyerDeleteChange={flyerDeleteChange}
        />
      </AppLayout>
    </React.Fragment>
  )
}

export default FlyersManagement
