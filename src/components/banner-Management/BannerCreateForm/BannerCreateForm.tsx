import { Button, Grid, TextField, Box, Typography, Alert, CircularProgress } from '@mui/material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import type {
  BannerFilterFormDto,
  ImageValidationState,
} from '../../../utilities/models/banner.model'
import moment from 'moment'
import DatePickerToolbarStyles from '../../../assets/theme/mobileDatePicker'
import React from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const BannerCreateForm: React.FC<{
  bannerFilterFormData: BannerFilterFormDto
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFilterHandleChange: (field: keyof BannerFilterFormDto, value: any) => void
  fileInputRef: React.RefObject<HTMLInputElement | null>
  imageState: ImageValidationState
  handleImageClick: () => void
  uploadFile: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleRemoveImage: () => void
  onCreateBanner(): void
  clearFormFields(): void
  isCreating: boolean
}> = (props) => {
  return (
    <Grid container spacing={2} m={1}>
      <Grid size={{ xs: 12, sm: 12, md: 9 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <MobileDatePicker
                closeOnSelect
                format="DD/MM/YYYY"
                minDate={moment()}
                value={
                  props.bannerFilterFormData.startDate.value
                    ? moment(props.bannerFilterFormData.startDate.value)
                    : null
                }
                onChange={(newValue) => props.onFilterHandleChange('startDate', newValue)}
                slotProps={{
                  textField: {
                    variant: 'outlined',
                    label: 'Start Date',
                    size: 'small',
                    fullWidth: true,
                    error: Boolean(props.bannerFilterFormData.startDate.error),
                    helperText: props.bannerFilterFormData.startDate.error,
                    required: props.bannerFilterFormData.startDate.isRequired,
                  },
                  inputAdornment: { position: 'end' },
                  actionBar: {
                    actions: ['cancel', 'accept'],
                  },
                  toolbar: DatePickerToolbarStyles,
                }}
                localeText={{
                  toolbarTitle: props.bannerFilterFormData.startDate.value
                    ? moment(props.bannerFilterFormData.startDate.value).year().toString()
                    : moment().year().toString(),
                }}
                onOpen={() => {
                  if (!props.bannerFilterFormData.startDate.value) {
                    props.onFilterHandleChange('startDate', new Date())
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <MobileDatePicker
                closeOnSelect
                format="DD/MM/YYYY"
                minDate={
                  props.bannerFilterFormData.startDate.value
                    ? moment(props.bannerFilterFormData.startDate.value)
                    : undefined
                }
                value={
                  props.bannerFilterFormData.expireAt.value
                    ? moment(props.bannerFilterFormData.expireAt.value)
                    : null
                }
                onChange={(newValue) => props.onFilterHandleChange('expireAt', newValue)}
                slotProps={{
                  textField: {
                    variant: 'outlined',
                    label: 'End Date',
                    size: 'small',
                    fullWidth: true,
                    error: Boolean(props.bannerFilterFormData.expireAt.error),
                    helperText: props.bannerFilterFormData.expireAt.error,
                    required: props.bannerFilterFormData.expireAt.isRequired,
                    disabled: !props.bannerFilterFormData.startDate.value,
                  },
                  inputAdornment: { position: 'end' },
                  actionBar: {
                    actions: ['cancel', 'accept'],
                  },
                  toolbar: DatePickerToolbarStyles,
                }}
                localeText={{
                  toolbarTitle: props.bannerFilterFormData.expireAt.value
                    ? moment(props.bannerFilterFormData.expireAt.value).year().toString()
                    : moment().year().toString(),
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 12 }}>
            <TextField
              label="Banner Title"
              placeholder="Enter Banner Title"
              variant="outlined"
              size="small"
              fullWidth
              value={
                props.bannerFilterFormData.bannerTitle.value
                  ? props.bannerFilterFormData.bannerTitle.value
                  : ''
              }
              onChange={(newValue) =>
                props.onFilterHandleChange('bannerTitle', newValue.target.value)
              }
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12 }}>
            <TextField
              label="Banner URL"
              placeholder="Enter Banner URL"
              variant="outlined"
              size="small"
              fullWidth
              value={
                props.bannerFilterFormData.bannerURL.value
                  ? props.bannerFilterFormData.bannerURL.value
                  : ''
              }
              onChange={(newValue) =>
                props.onFilterHandleChange('bannerURL', newValue.target.value)
              }
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12 }}>
            <TextField
              variant="outlined"
              size="medium"
              multiline
              rows={3}
              fullWidth
              value={props.bannerFilterFormData.bannerDesc.value ?? ''}
              error={!!props.bannerFilterFormData.bannerDesc.error}
              helperText={props.bannerFilterFormData.bannerDesc.error}
              label="Banner Description"
              placeholder="Enter Description"
              onChange={(e) => props.onFilterHandleChange('bannerDesc', e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 12 }}>
            <Box sx={{ mt: 1, mb: 2 }}>
              <input
                type="file"
                ref={props.fileInputRef}
                accept="image/*"
                onChange={props.uploadFile}
                style={{ display: 'none' }}
                id="banner-image-upload"
              />
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<CloudUploadIcon />}
                onClick={props.handleImageClick}
                sx={{
                  mb: 2,
                  py: 1,
                  borderColor: props.bannerFilterFormData.image.error ? 'error.main' : undefined,
                }}
                color={props.bannerFilterFormData.image.error ? 'error' : 'primary'}
              >
                Upload Banner Image {props.bannerFilterFormData.image.isRequired && '*'}
              </Button>

              {/* Image Preview */}
              {props.imageState.imageUrl &&
                !props.imageState.isInvalidImageRatio &&
                !props.imageState.isInvalidImageSize && (
                  <Box sx={{ mt: 2, mb: 2, position: 'relative' }}>
                    <img
                      src={props.imageState.imageUrl}
                      alt="Banner preview"
                      style={{
                        width: '100%',
                        maxHeight: '300px',
                        objectFit: 'contain',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                      }}
                    />
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={props.handleRemoveImage}
                      sx={{ mt: 1 }}
                    >
                      Remove Image
                    </Button>
                  </Box>
                )}

              {/* Error Messages - Show immediately when invalid image is uploaded */}
              {(props.imageState.isInvalidImageRatio || props.imageState.isInvalidImageSize) && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {props.bannerFilterFormData.image.error}
                </Alert>
              )}

              {/* Error Message from Form Validation (when user clicks Create without image) */}
              {props.bannerFilterFormData.image.error &&
                !props.imageState.isInvalidImageRatio &&
                !props.imageState.isInvalidImageSize && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {props.bannerFilterFormData.image.error}
                  </Alert>
                )}

              {/* Info Message */}
              {!props.imageState.imageFile &&
                !props.imageState.isImageClicked &&
                !props.bannerFilterFormData.image.error && (
                  <Typography variant="caption" color="text.secondary" display="block">
                    Supported formats: JPG, PNG, GIF. Resolution: 1920x1080 or 1280x720. Max size:
                    1MB
                  </Typography>
                )}
            </Box>
          </Grid>

          <Grid container spacing={2} size={{ xs: 12, sm: 12, md: 12 }}>
            <Button
              variant="contained"
              size="medium"
              onClick={props.onCreateBanner}
              startIcon={props.isCreating ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {props.isCreating ? 'Creating...' : 'Create Banner'}
            </Button>
            <Button variant="contained" color="primary" onClick={props.clearFormFields}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default BannerCreateForm
