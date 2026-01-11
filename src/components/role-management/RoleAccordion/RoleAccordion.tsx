import {
  Button,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Grid,
  InputAdornment,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import type { GetApplicationFeaturesDto, FeatureDto } from '../../../utilities/models'

const RoleAccordion: React.FC<{
  features: GetApplicationFeaturesDto | null
  roleFeatures: FeatureDto[] | []
  selectedFeatures: Set<number>
  onUpdatePermission(): void
  onHandleToggle(featureId: number): () => void
  onRestoreDefault(): void
  filteredFeatures: FeatureDto[]
  searchTerm: string
  onSearchHandle(event: React.ChangeEvent<HTMLInputElement>): void
  isSaving: boolean
}> = (props) => {
  const hasChanges =
    props.features?.features?.some((feature) => {
      const isCurrentlySelected = props.selectedFeatures.has(feature.featureId)
      const wasOriginallySelected = props.roleFeatures.some(
        (rf) => rf.featureId === feature.featureId
      )
      return isCurrentlySelected !== wasOriginallySelected
    }) ?? false

  return (
    <Grid container spacing={2} mt={2}>
      <Grid size={{ xs: 12, sm: 12, md: 6 }}>
        <TextField
          size="small"
          fullWidth
          variant="outlined"
          color="primary"
          placeholder="Search Feature"
          value={props.searchTerm}
          onChange={props.onSearchHandle}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 12, md: 6 }} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          size="small"
          sx={{ backgroundColor: '#8b8b8b' }}
          onClick={props.onRestoreDefault}
          disabled={!hasChanges}
        >
          Restore Default
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          sx={{ ml: 2 }}
          onClick={props.onUpdatePermission}
          disabled={!hasChanges}
          startIcon={props.isSaving ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {props.isSaving ? 'Saving...' : 'Save'}
        </Button>
      </Grid>
      <Grid
        container
        spacing={1}
        mt={1}
        sx={{
          maxHeight: '220px',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {props.filteredFeatures.length === 0 && props.searchTerm && (
          <Grid size={{ xs: 12 }} sx={{ textAlign: 'center', py: 2 }}>
            <Typography color="textSecondary">No features found</Typography>
          </Grid>
        )}
        {props.filteredFeatures
          .slice()
          .sort((a, b) => a.featureName.localeCompare(b.featureName))
          .map((feature) => (
            <Grid size={{ xs: 12, sm: 12, md: 6 }} key={feature.featureId} sx={{ py: 0 }}>
              <FormGroup row sx={{ margin: 0 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={props.selectedFeatures.has(feature.featureId)}
                      onChange={props.onHandleToggle(feature.featureId)}
                    />
                  }
                  label={feature.featureName}
                  sx={{
                    margin: 0,
                    '& .MuiFormControlLabel-label': {
                      fontSize: '16px',
                    },
                  }}
                />
              </FormGroup>
            </Grid>
          ))}
      </Grid>
    </Grid>
  )
}

export default RoleAccordion
