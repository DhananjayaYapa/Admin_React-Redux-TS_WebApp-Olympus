import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Divider,
  Grid,
  Alert,
  Autocomplete,
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import type { ApplicationDto, DesignationDto } from '../../../utilities/models'

interface Props {
  open: boolean
  onClose: () => void
  form: {
    email: string
    firstName: string
    lastName: string
    empNo: string
    designation: number | null
    dateOfBirth: string | null
    joinDate: string | null
    application: string[]
    isExternalUser: boolean
  }
  applications: ApplicationDto[]
  designations: DesignationDto[]
  fieldErrors: Record<string, string>
  errorMessage: string
  updateField: (field: string, value: any) => void
  onSubmit: () => void
}

export default function CreateUserDialog({
  open,
  onClose,
  form,
  applications,
  designations,
  fieldErrors,
  errorMessage,
  updateField,
  onSubmit,
}: Props) {
  return (
    <Dialog open={open} onClose={() => onClose()} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        Create New User
        <Button onClick={onClose} color="inherit" sx={{ fontSize: 20, fontWeight: 'bold' }}>
          ✕
        </Button>
      </DialogTitle>

      <Divider />

      <DialogContent>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={2} mt={1}>
            {/* Email */}
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Email *"
                fullWidth
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                error={!!fieldErrors.email}
                helperText={fieldErrors.email}
              />
            </Grid>

            {/* First Name */}
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="First Name *"
                fullWidth
                value={form.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                error={!!fieldErrors.firstName}
                helperText={fieldErrors.firstName}
              />
            </Grid>

            {/* Last Name */}
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="Last Name *"
                fullWidth
                value={form.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                error={!!fieldErrors.lastName}
                helperText={fieldErrors.lastName}
              />
            </Grid>

            {/* Employee Number */}
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="Employee No *"
                fullWidth
                value={form.empNo}
                onChange={(e) => updateField('empNo', e.target.value)}
                error={!!fieldErrors.empNo}
                helperText={fieldErrors.empNo}
              />
            </Grid>

            {/* Designation */}
            <Grid size={{ xs: 12, sm: 4 }}>
              <Autocomplete
                options={designations}
                size="small"
                getOptionLabel={(d) =>
                  `${d.projectRoleName.trim()} (${d.projectRoleDisplayName.trim()})`
                }
                onChange={(_e, value) =>
                  updateField('designation', value ? value.projectRoleId : null)
                }
                renderInput={(params) => (
                  <TextField {...params} label="Designation" fullWidth size="medium" />
                )}
              />
            </Grid>

            {/* Date of Birth */}
            <Grid size={{ xs: 12, sm: 4 }}>
              <DatePicker
                label="Date of Birth *"
                value={form.dateOfBirth ? dayjs(form.dateOfBirth) : null}
                onChange={(val) =>
                  updateField('dateOfBirth', val ? val.format('YYYY-MM-DD') : null)
                }
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!fieldErrors.dateOfBirth,
                    helperText: fieldErrors.dateOfBirth,
                  },
                }}
              />
            </Grid>

            {/* Join Date */}
            <Grid size={{ xs: 12, sm: 4 }}>
              <DatePicker
                label="Join Date *"
                value={form.joinDate ? dayjs(form.joinDate) : null}
                onChange={(val) => updateField('joinDate', val ? val.format('YYYY-MM-DD') : null)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!fieldErrors.joinDate,
                    helperText: fieldErrors.joinDate,
                  },
                }}
              />
            </Grid>

            {/* Applications */}
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="Applications *"
                select
                fullWidth
                SelectProps={{
                  multiple: true,
                  renderValue: (selected) => {
                    const values = Array.isArray(selected) ? selected : []
                    return applications
                      .filter((app) => values.includes(app.applicationKey))
                      .map((app) => app.applicationName)
                      .join(', ')
                  },
                  MenuProps: {
                    PaperProps: {
                      elevation: 4,
                      sx: {
                        borderRadius: 2,
                        mt: 1,
                        maxHeight: 300,
                        minWidth: 260,
                        '& .MuiMenuItem-root': {
                          my: 0.5,
                          borderRadius: 1,
                          px: 2,
                        },
                      },
                    },
                  },
                }}
                value={form.application}
                onChange={(e) => updateField('application', e.target.value)}
                error={!!fieldErrors.application}
                helperText={fieldErrors.application}
              >
                {applications.map((app) => (
                  <MenuItem key={app.applicationKey} value={app.applicationKey}>
                    <Checkbox checked={form.application.includes(app.applicationKey)} />
                    {app.applicationName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* External User */}
            <Grid size={{ xs: 12, sm: 4 }} display="flex" alignItems="center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.isExternalUser}
                    onChange={(e) => updateField('isExternalUser', e.target.checked)}
                  />
                }
                label="Is External User"
              />
            </Grid>
          </Grid>
        </LocalizationProvider>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="contained" onClick={onSubmit}>
          Create User
        </Button>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Clear
        </Button>
      </DialogActions>
    </Dialog>
  )
}
