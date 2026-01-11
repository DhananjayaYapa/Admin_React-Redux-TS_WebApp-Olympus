import { Alert, Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import BadgeTextField from '../badgeField/BadgeTextField'
import type {ImageValidationState } from '../../../utilities/models'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import type { BadgeFilterFormDto } from '../../../utilities/models/badge.model'

const BadeCreateForm: React.FC<{
  badgeFilterFormData: BadgeFilterFormDto
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFilterHandleChange: (field: keyof BadgeFilterFormDto, value: any) => void
  fileInputRef: React.RefObject<HTMLInputElement | null>
  imageState: ImageValidationState
  handleImageClick: () => void
  uploadFile: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleRemoveImage: () => void
  onCreateBadge(): void
  clearFormFields(): void
}> = (props) => {
  return (
    <Grid container spacing={2} m={1}>
      <Grid size={{ xs: 12, sm: 12, md: 9 }}>
        <Grid size={{ xs: 12, sm: 12, md: 12 }} mb={3}>
          <BadgeTextField
            label="Badge Title"
            placeHolder="Enter the badge title"
            name="title"
            value={props.badgeFilterFormData.title.value ? props.badgeFilterFormData.title.value : ''}
            onChange={props.onFilterHandleChange}
            required={true}
            multiline={false}
            error={props.badgeFilterFormData.title.error}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12 }} mb={3}>
          <BadgeTextField
            label="Badge Description"
            placeHolder="Enter description"
            name="description"
            value={props.badgeFilterFormData.description.value ? props.badgeFilterFormData.description.value : ''}
            onChange={props.onFilterHandleChange}
            required={false}
            multiline={true}
            rows={8}
            error={props.badgeFilterFormData.description.error}
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
                borderColor: props.badgeFilterFormData.badge.error ? 'error.main' : undefined,
              }}
              color={props.badgeFilterFormData.badge.error ? 'error' : 'primary'}
            >
              Upload Badge Image {props.badgeFilterFormData.badge.isRequired && '*'}
            </Button>

            {/* Image Preview */}
            {props.imageState.imageUrl &&
              !props.imageState.isInvalidImageRatio &&
              !props.imageState.isInvalidImageSize && (
                <Box sx={{ mt: 2, mb: 2, position: 'relative' }}>
                  <img
                    src={props.imageState.imageUrl}
                    alt="Badge preview"
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
                {props.badgeFilterFormData.badge.error}
              </Alert>
            )}

            {/* Error Message from Form Validation (when user clicks Create without image) */}
            {props.badgeFilterFormData.badge.error &&
              !props.imageState.isInvalidImageRatio &&
              !props.imageState.isInvalidImageSize && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {props.badgeFilterFormData.badge.error}
                </Alert>
              )}

            {/* Info Message */}
            {!props.imageState.imageFile &&
              !props.imageState.isImageClicked &&
              !props.badgeFilterFormData.badge.error && (
                <Typography variant="caption" color="text.secondary" display="block">
                  Supported formats: JPG, PNG, GIF. Resolution: 500x500 or 250x250. Max size: 1MB
                </Typography>
              )}
          </Box>
        </Grid>

        <Button variant="contained" size="medium" onClick={props.onCreateBadge} sx={{ textTransform: 'none' }}>
          Create Badge
        </Button>
      </Grid>
    </Grid>
  )
}

export default BadeCreateForm
