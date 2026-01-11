import {
  Button,
  Grid,
  TextField,
  Box,
  Typography,
  DialogTitle,
  IconButton,
  Dialog,
  DialogContent,
  Alert,
} from '@mui/material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import DatePickerToolbarStyles from '../../../assets/theme/mobileDatePicker'
import React from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import type { bannerUpdateFormDto, ImageValidationState } from '../../../utilities/models'
import CloseIcon from '@mui/icons-material/Close'

const BannerEditPopUp: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEditBannerHandleChange(property: string, value: any): void
  IsEdingBanner: bannerUpdateFormDto
  onUpdateBanner(): void
  onClose: () => void
  isOpen: boolean
  editFileInputRef: React.RefObject<HTMLInputElement | null>
  editImageState: ImageValidationState
  handleEditImageClick: () => void
  uploadEditFile: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleRemoveEditImage: () => void
}> = (props) => {
  return (
    <Grid container spacing={2} m={1}>
      <Dialog
        open={props.isOpen}
        onClose={props.onClose}
        maxWidth="sm"
        fullWidth
        aria-labelledby="banner-preview-dialog"
      >
        <DialogTitle
          id="banner-preview-dialog"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'right',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <span>{'Edit Banner Details'}</span>
          <IconButton
            aria-label="close"
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
            onClick={props.onClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid size={{ xs: 12, sm: 12, md: 9 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 12, md: 6 }} mt={2}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <MobileDatePicker
                    closeOnSelect
                    format="DD/MM/YYYY"
                    minDate={moment()}
                    value={
                      props.IsEdingBanner.startDate.value
                        ? moment(props.IsEdingBanner.startDate.value, 'YYYY-MM-DD', true).isValid()
                          ? moment(props.IsEdingBanner.startDate.value, 'YYYY-MM-DD')
                          : moment(props.IsEdingBanner.startDate.value).startOf('day')
                        : null
                    }
                    onChange={(newValue) => props.onEditBannerHandleChange('startDate', newValue)}
                    slotProps={{
                      textField: {
                        variant: 'outlined',
                        label: 'Start Date',
                        size: 'small',
                        fullWidth: true,
                        error: Boolean(props.IsEdingBanner.startDate.error),
                        helperText: props.IsEdingBanner.startDate.error,
                        required: props.IsEdingBanner.startDate.isRequired,
                      },
                      inputAdornment: { position: 'end' },
                      actionBar: {
                        actions: ['cancel', 'accept'],
                      },
                      toolbar: DatePickerToolbarStyles,
                    }}
                    localeText={{
                      toolbarTitle: props.IsEdingBanner.startDate.value
                        ? moment(props.IsEdingBanner.startDate.value).year().toString()
                        : moment().year().toString(),
                    }}
                    onOpen={() => {
                      if (!props.IsEdingBanner.startDate.value) {
                        props.onEditBannerHandleChange('startDate', new Date())
                      }
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 6 }} mt={2}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <MobileDatePicker
                    closeOnSelect
                    format="DD/MM/YYYY"
                    minDate={
                      props.IsEdingBanner.startDate.value
                        ? moment(props.IsEdingBanner.startDate.value).startOf('day')
                        : undefined
                    }
                    value={
                      props.IsEdingBanner.expireAt.value
                        ? moment(props.IsEdingBanner.expireAt.value, 'YYYY-MM-DD', true).isValid()
                          ? moment(props.IsEdingBanner.expireAt.value, 'YYYY-MM-DD')
                          : moment(props.IsEdingBanner.expireAt.value).startOf('day')
                        : null
                    }
                    onChange={(newValue) => props.onEditBannerHandleChange('expireAt', newValue)}
                    slotProps={{
                      textField: {
                        variant: 'outlined',
                        label: 'End Date',
                        size: 'small',
                        fullWidth: true,
                        error: Boolean(props.IsEdingBanner.expireAt.error),
                        helperText: props.IsEdingBanner.expireAt.error,
                        required: props.IsEdingBanner.expireAt.isRequired,
                        disabled: !props.IsEdingBanner.startDate.value,
                      },
                      inputAdornment: { position: 'end' },
                      actionBar: {
                        actions: ['cancel', 'accept'],
                      },
                      toolbar: DatePickerToolbarStyles,
                    }}
                    localeText={{
                      toolbarTitle: props.IsEdingBanner.expireAt.value
                        ? moment(props.IsEdingBanner.expireAt.value).year().toString()
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
                    props.IsEdingBanner.bannerTitle.value
                      ? props.IsEdingBanner.bannerTitle.value
                      : ''
                  }
                  onChange={(newValue) =>
                    props.onEditBannerHandleChange('bannerTitle', newValue.target.value)
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
                    props.IsEdingBanner.bannerURL.value ? props.IsEdingBanner.bannerURL.value : ''
                  }
                  onChange={(newValue) =>
                    props.onEditBannerHandleChange('bannerURL', newValue.target.value)
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
                  label="Banner Description"
                  placeholder="Enter Description"
                  value={props.IsEdingBanner.bannerDesc.value ?? ''}
                  error={!!props.IsEdingBanner.bannerDesc.error}
                  helperText={props.IsEdingBanner.bannerDesc.error}
                  onChange={(e) => props.onEditBannerHandleChange('bannerDesc', e.target.value)}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                <Box sx={{ mt: 1, mb: 2 }}>
                  <input
                    type="file"
                    ref={props.editFileInputRef}
                    accept="image/*"
                    onChange={props.uploadEditFile}
                    style={{ display: 'none' }}
                    id="banner-edit-image-upload"
                  />
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    startIcon={<CloudUploadIcon />}
                    onClick={props.handleEditImageClick}
                    sx={{
                      mb: 2,
                      py: 1,
                      borderColor: props.IsEdingBanner.image.error ? 'error.main' : undefined,
                    }}
                    color={props.IsEdingBanner.image.error ? 'error' : 'primary'}
                  >
                    Upload New Banner Image
                  </Button>

                  {/* Current or New Image Preview */}
                  {(props.editImageState.imageUrl ||
                    (props.IsEdingBanner.image.value &&
                      !props.editImageState.isInvalidImageRatio)) && (
                    <Box sx={{ mt: 2, mb: 2, position: 'relative' }}>
                      <img
                        alt="Banner preview"
                        src={props.editImageState.imageUrl || props.IsEdingBanner.image.value}
                        style={{
                          width: '100%',
                          maxHeight: '300px',
                          objectFit: 'contain',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                        }}
                      />
                      {props.editImageState.imageUrl && (
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={props.handleRemoveEditImage}
                          sx={{ mt: 1 }}
                        >
                          Remove New Image
                        </Button>
                      )}
                    </Box>
                  )}

                  {/* Error Messages */}
                  {props.editImageState.isInvalidImageSize && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      Image size exceeds 1MB. Please upload a smaller image.
                    </Alert>
                  )}

                  {props.editImageState.isInvalidImageRatio && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      Invalid image aspect ratio. Image resolution should be 1920x1080 or 1280x720
                      pixels.
                    </Alert>
                  )}

                  {/* Error Message from Form Validation */}
                  {props.IsEdingBanner.image.error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {props.IsEdingBanner.image.error}
                    </Alert>
                  )}

                  {/* Info Message */}
                  {!props.editImageState.imageFile &&
                    !props.editImageState.isImageClicked &&
                    !props.IsEdingBanner.image.error && (
                      <Typography variant="caption" color="text.secondary" display="block">
                        Supported formats: JPG, PNG, GIF. Resolution: 1920x1080 or 1280x720. Max
                        size: 1MB
                      </Typography>
                    )}
                </Box>
              </Grid>

              <Grid container spacing={2} size={{ xs: 12, sm: 12, md: 4 }}>
                <Button variant="contained" size="medium" onClick={props.onUpdateBanner}>
                  Update Banner
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  )
}

export default BannerEditPopUp
