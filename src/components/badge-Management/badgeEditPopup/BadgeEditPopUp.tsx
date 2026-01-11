import {
  Button,
  Grid,
  Box,
  Typography,
  DialogTitle,
  IconButton,
  Dialog,
  DialogContent,
  Alert,
} from '@mui/material'

import React from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import type { ImageValidationState } from '../../../utilities/models'
import CloseIcon from '@mui/icons-material/Close'
import type { BadgeUpdateFormDto } from '../../../utilities/models/badge.model'
import BadgeTextField from '../badgeField/BadgeTextField'

const BadgeEditPopUp: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEditBadgeHandleChange(property: string, value: any): void
  IsEdingBadge: BadgeUpdateFormDto
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
          <span>{'Edit Badge Details'}</span>
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
            <Grid container spacing={2} mt={4}>
              <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                <BadgeTextField
                  label="Badge Title"
                  placeHolder="Enter the badge title"
                  name="title"
                  value={props.IsEdingBadge.title.value ? props.IsEdingBadge.title.value : ''}
                  onChange={props.onEditBadgeHandleChange}
                  required={true}
                  multiline={false}
                  error={props.IsEdingBadge.title.error}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                <BadgeTextField
                  label="Badge Description"
                  placeHolder="Enter description"
                  name="description"
                  value={
                    props.IsEdingBadge.description.value ? props.IsEdingBadge.description.value : ''
                  }
                  onChange={props.onEditBadgeHandleChange}
                  required={false}
                  multiline={true}
                  rows={8}
                  error={props.IsEdingBadge.description.error}
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
                      borderColor: props.IsEdingBadge.badge.error ? 'error.main' : undefined,
                    }}
                    color={props.IsEdingBadge.badge.error ? 'error' : 'primary'}
                  >
                    Upload New Badge Image
                  </Button>

                  {/* Current or New Image Preview */}
                  {(props.editImageState.imageUrl ||
                    (props.IsEdingBadge.url.value &&
                      !props.editImageState.isInvalidImageRatio)) && (
                    <Box sx={{ mt: 2, mb: 2, position: 'relative' }}>
                      <img
                        alt="Badge Preview"
                        src={
                          props.editImageState.imageUrl ?? props.IsEdingBadge.url.value ?? undefined
                        }
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

                  {/* {props.editImageState.isInvalidImageRatio && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      Invalid image aspect ratio. Image resolution should be 500x500 or 250x250
                      pixels.
                    </Alert>
                  )} */}

                  {/* Error Message from Form Validation */}
                  {props.IsEdingBadge.badge.error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {props.IsEdingBadge.badge.error}
                    </Alert>
                  )}

                  {/* Info Message */}
                  {!props.editImageState.imageFile &&
                    !props.editImageState.isImageClicked &&
                    !props.IsEdingBadge.badge.error && (
                      <Typography variant="caption" color="text.secondary" display="block">
                        Supported formats: JPG, PNG, GIF. Resolution: 500x500 or 250x250. Max size:
                        1MB
                      </Typography>
                    )}
                </Box>
              </Grid>

              <Grid container spacing={2} size={{ xs: 12, sm: 12, md: 4 }}>
                <Button variant="contained" size="medium" onClick={props.onUpdateBanner}>
                  Update Badge
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  )
}

export default BadgeEditPopUp
