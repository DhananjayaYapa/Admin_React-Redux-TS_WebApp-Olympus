import {
  Alert,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import React from 'react'
import type { TagsDto, FlyerFilterFormDto, FlyerValidationState } from '../../../utilities/models'

const FlyersEntryeForm: React.FC<{
  flyerFormData: FlyerFilterFormDto
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  flyerFormFilterHandle: (field: keyof FlyerFilterFormDto, value: any) => void
  flyerInputFocusHandle: (field: keyof FlyerFilterFormDto) => void
  availableTags: TagsDto[]
  imageState: FlyerValidationState
  fileInputRef: React.RefObject<HTMLInputElement | null>
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleImageClick: () => void
  uploadFile: (event: React.ChangeEvent<HTMLInputElement>) => void
  onCreateFlyer: () => void
  clearFormFields: () => void
  isUploading: boolean
}> = (props) => {
  // Get selected tag object from tagId
  const selectedTag =
    props.availableTags.find((tag) => tag.tagId === props.flyerFormData.tagId.value) || null

  return (
    <Grid container spacing={2} m={1}>
      <Grid size={{ sm: 12, xs: 12, md: 9 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 12, md: 12 }}>
            <FormControl component="fieldset">
              <RadioGroup
                row
                value={props.flyerFormData.flyerType.value.toString()}
                onChange={props.handleRadioChange}
              >
                <FormControlLabel
                  value="2"
                  control={<Radio sx={{ '& .MuiSvgIcon-root': { borderRadius: '50%' } }} />}
                  label="Birthday Flyer Template"
                />
                <FormControlLabel
                  value="1"
                  control={<Radio sx={{ '& .MuiSvgIcon-root': { borderRadius: '50%' } }} />}
                  label="Anniversary Flyer Template"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <Autocomplete
              fullWidth
              size="small"
              value={selectedTag}
              onChange={(_event, newValue) => {
                props.flyerFormFilterHandle('tagId', newValue?.tagId || null)
              }}
              options={props.availableTags}
              getOptionLabel={(option) => option.tagName}
              isOptionEqualToValue={(option, value) => option.tagId === value.tagId}
              onFocus={() => props.flyerInputFocusHandle('tagId')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Tag"
                  color="primary"
                  required={props.flyerFormData.tagId.isRequired}
                  error={Boolean(props.flyerFormData.tagId.error)}
                  helperText={props.flyerFormData.tagId.error}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #8b8b8b',
                  borderRadius: 1,
                  width: '100%',
                  height: 40,
                }}
              >
                <Button
                  variant="contained"
                  onClick={props.handleImageClick}
                  sx={{
                    height: '100%',
                    px: 2,
                    backgroundColor: '#8b8b8b',
                    borderRadius: 0,
                    borderTopLeftRadius: 4,
                    borderBottomLeftRadius: 4,
                    borderColor: props.flyerFormData.image.error ? 'error.main' : undefined,
                    '&:hover': {
                      backgroundColor: '#757575',
                    },
                  }}
                  color={props.flyerFormData.image.error ? 'error' : 'primary'}
                >
                  Choose file{props.flyerFormData.image.isRequired && ' *'}
                </Button>
                <input
                  type="file"
                  hidden
                  ref={props.fileInputRef}
                  accept="image/jpeg,image/jpg,image/png,image/gif"
                  onChange={props.uploadFile}
                />
                <Typography
                  variant="body2"
                  sx={{
                    flex: 1,
                    px: 2,
                    color: props.imageState.imageFile ? 'text.primary' : 'text.secondary',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {props.imageState.imageFile ? props.imageState.imageFile.name : 'No file chosen'}
                </Typography>
              </Box>

              {/* Error Message for Invalid Image Ratio or Size */}
              {(props.imageState.isInvalidImageRatio || props.imageState.isInvalidImageSize) && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {props.flyerFormData.image.error}
                </Alert>
              )}

              {/* Error Message from Form Validation (when user clicks Create without image) */}
              {props.flyerFormData.image.error &&
                !props.imageState.isInvalidImageRatio &&
                !props.imageState.isInvalidImageSize && (
                  <Typography
                    variant="caption"
                    color="error"
                    display="block"
                    sx={{ mt: 0.5, ml: 1.75 }}
                  >
                    {props.flyerFormData.image.error}
                  </Typography>
                )}

              {/* Info Message */}
              {!props.imageState.imageFile &&
                !props.imageState.isImageClicked &&
                !props.flyerFormData.image.error && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    sx={{ mt: 0.5 }}
                  >
                    Supported formats: JPG, PNG, GIF. Resolution: 800x600. Max size: 1MB
                  </Typography>
                )}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 12 }}>
            <TextField
              label="Flyer Wish"
              placeholder="Enter Wish For Flyer"
              size="medium"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={props.flyerFormData.greeting.value}
              onChange={(e) => props.flyerFormFilterHandle('greeting', e.target.value)}
              onFocus={() => props.flyerInputFocusHandle('greeting')}
              required={props.flyerFormData.greeting.isRequired}
              error={Boolean(props.flyerFormData.greeting.error)}
              helperText={
                props.flyerFormData.greeting.error ||
                (props.flyerFormData.greeting.value.length > 255
                  ? 'Wish must be 255 characters or less'
                  : '')
              }
            />
          </Grid>

          <Grid container spacing={2} size={{ xs: 12, sm: 12, md: 12 }} mt={1}>
            <Button
              variant="contained"
              size="medium"
              onClick={props.onCreateFlyer}
              startIcon={props.isUploading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {props.isUploading ? 'Uploading...' : 'Upload Template'}
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

export default FlyersEntryeForm
