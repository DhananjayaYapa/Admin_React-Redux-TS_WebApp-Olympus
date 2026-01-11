import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { PhotoCamera } from '@mui/icons-material'
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import type {
  ApplicationDetailsDto,
  DesignationDto,
  UpdateUserFormDto,
} from '../../../../utilities/models'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import DatePickerToolbarStyles from '../../../../assets/theme/mobileDatePicker'
import moment from 'moment'

const EditUserDetails: React.FC<{
  initialUpdateUserData: UpdateUserFormDto
  initLetters: string
  applications?: ApplicationDetailsDto[]
  designations: DesignationDto[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onHandleChangeUser: (field: keyof UpdateUserFormDto, value: any) => void
  onUpdateUserTrigger: () => void
  photo: string | null
}> = (props) => {
  return (
    <Box>
      <Grid container spacing={3} ml={2}>
        <Grid size={{ xs: 12 }}>
          <Typography fontSize={25} fontWeight="bold" flexBasis={1} mt={2} ml={1}>
            User Details
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center" mt={2}>
            <Box position="relative">
              <Avatar
                variant="square"
                src={props.photo || undefined}
                sx={{
                  width: 120,
                  height: 120,
                  fontSize: '3rem',
                  bgcolor: '#3d4991',
                }}
              >
                {!props.photo && props.initLetters}
              </Avatar>
              <IconButton
                component="label"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  bgcolor: 'background.paper',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <input type="file" hidden accept="image/*" />
                <PhotoCamera />
              </IconButton>
            </Box>
            <Box flex={1}>
              <Typography variant="h5" textTransform="capitalize">
                {props.initialUpdateUserData.firstName.value}{' '}
                {props.initialUpdateUserData.lastName.value}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight="bold" gutterBottom>
                {props.initialUpdateUserData.username.value +
                  ' | ' +
                  props.initialUpdateUserData.employeeNumber.value}
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12 }} ml={1}>
          <Typography fontSize={20} gutterBottom>
            Edit User Details
          </Typography>
          <Typography fontSize={15} gutterBottom mt={3}>
            Personal Information
          </Typography>
          <Grid container spacing={2} mt={1}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="First Name"
                fullWidth
                size="small"
                value={props.initialUpdateUserData.firstName.value}
                onChange={(event) => props.onHandleChangeUser('firstName', event.target.value)}
                error={!!props.initialUpdateUserData.firstName.error}
                helperText={props.initialUpdateUserData.firstName.error}
                required={props.initialUpdateUserData.firstName.isRequired}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="Last Name"
                fullWidth
                size="small"
                value={props.initialUpdateUserData.lastName.value}
                onChange={(event) => props.onHandleChangeUser('lastName', event.target.value)}
                error={!!props.initialUpdateUserData.lastName.error}
                helperText={props.initialUpdateUserData.lastName.error}
                required={props.initialUpdateUserData.lastName.isRequired}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <MobileDatePicker
                  value={
                    props.initialUpdateUserData.birthday.value
                      ? moment(props.initialUpdateUserData.birthday.value)
                      : null
                  }
                  onChange={(event) => props.onHandleChangeUser('birthday', event)}
                  maxDate={moment()}
                  closeOnSelect
                  format="DD/MM/YYYY"
                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      label: 'Date of Birth',
                      size: 'small',
                      fullWidth: true,
                      error: Boolean(props.initialUpdateUserData.birthday.error),
                      helperText: props.initialUpdateUserData.birthday.error,
                      required: props.initialUpdateUserData.birthday.isRequired,
                    },
                    inputAdornment: { position: 'end' },
                    actionBar: {
                      actions: ['cancel', 'accept'],
                    },
                    toolbar: DatePickerToolbarStyles,
                  }}
                  localeText={{
                    toolbarTitle: props.initialUpdateUserData.birthday.value
                      ? moment(props.initialUpdateUserData.birthday.value).year().toString()
                      : moment().year().toString(),
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid size={{ xs: 12, sm: 4, md: 12 }} mt={3}>
              <Typography fontSize={15} gutterBottom>
                Employee Information
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="Employee ID"
                fullWidth
                size="small"
                value={props.initialUpdateUserData.employeeNumber.value}
                onChange={(event) => props.onHandleChangeUser('employeeNumber', event.target.value)}
                error={!!props.initialUpdateUserData.employeeNumber.error}
                helperText={props.initialUpdateUserData.employeeNumber.error}
                required={props.initialUpdateUserData.employeeNumber.isRequired}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Autocomplete
                size="small"
                options={
                  props.designations
                    ? props.designations.map((designation) => ({
                        id: designation.projectRoleId,
                        name: designation.projectRoleName,
                      }))
                    : []
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name || ''}
                value={
                  props.initialUpdateUserData.designationId.value
                    ? {
                        id: props.initialUpdateUserData.designationId.value,
                        name:
                          props.designations?.find(
                            (designation) =>
                              designation.projectRoleId ===
                              props.initialUpdateUserData.designationId.value
                          )?.projectRoleName || '',
                      }
                    : null
                }
                onChange={(_event, newValue) =>
                  props.onHandleChangeUser('designationId', newValue ? newValue.id : null)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Designation"
                    helperText={props.initialUpdateUserData.designationId.error}
                    error={!!props.initialUpdateUserData.designationId.error}
                    required={props.initialUpdateUserData.designationId.isRequired}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <MobileDatePicker
                  value={
                    props.initialUpdateUserData.joinDate.value
                      ? moment(props.initialUpdateUserData.joinDate.value)
                      : null
                  }
                  onChange={(event) => props.onHandleChangeUser('joinDate', event)}
                  maxDate={moment()}
                  closeOnSelect
                  format="DD/MM/YYYY"
                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      label: 'Join Date',
                      size: 'small',
                      fullWidth: true,
                      error: Boolean(props.initialUpdateUserData.joinDate.error),
                      helperText: props.initialUpdateUserData.joinDate.error,
                      required: props.initialUpdateUserData.joinDate.isRequired,
                    },
                    inputAdornment: { position: 'end' },
                    actionBar: {
                      actions: ['cancel', 'accept'],
                    },
                    toolbar: DatePickerToolbarStyles,
                  }}
                  localeText={{
                    toolbarTitle: props.initialUpdateUserData.joinDate.value
                      ? moment(props.initialUpdateUserData.joinDate.value).year().toString()
                      : moment().year().toString(),
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <MobileDatePicker
                  value={
                    props.initialUpdateUserData.designationEffectiveFrom.value
                      ? moment(props.initialUpdateUserData.designationEffectiveFrom.value)
                      : null
                  }
                  onChange={(event) => props.onHandleChangeUser('designationEffectiveFrom', event)}
                  maxDate={moment()}
                  closeOnSelect
                  format="DD/MM/YYYY"
                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      label: 'Designation Effective Date',
                      size: 'small',
                      fullWidth: true,
                      error: Boolean(props.initialUpdateUserData.designationEffectiveFrom.error),
                      helperText: props.initialUpdateUserData.designationEffectiveFrom.error,
                      required: props.initialUpdateUserData.designationEffectiveFrom.isRequired,
                    },
                    inputAdornment: { position: 'end' },
                    actionBar: {
                      actions: ['cancel', 'accept'],
                    },
                    toolbar: DatePickerToolbarStyles,
                  }}
                  localeText={{
                    toolbarTitle: props.initialUpdateUserData.designationEffectiveFrom.value
                      ? moment(props.initialUpdateUserData.designationEffectiveFrom.value)
                          .year()
                          .toString()
                      : moment().year().toString(),
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <MobileDatePicker
                  value={
                    props.initialUpdateUserData.confirmationDate.value
                      ? moment(props.initialUpdateUserData.confirmationDate.value)
                      : null
                  }
                  onChange={(event) => props.onHandleChangeUser('confirmationDate', event)}
                  closeOnSelect
                  format="DD/MM/YYYY"
                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      label: 'Confirmation Date',
                      size: 'small',
                      fullWidth: true,
                      error: Boolean(props.initialUpdateUserData.confirmationDate.error),
                      helperText: props.initialUpdateUserData.confirmationDate.error,
                      required: props.initialUpdateUserData.confirmationDate.isRequired,
                    },
                    inputAdornment: { position: 'end' },
                    actionBar: {
                      actions: ['cancel', 'accept'],
                    },
                    toolbar: DatePickerToolbarStyles,
                  }}
                  localeText={{
                    toolbarTitle: props.initialUpdateUserData.confirmationDate.value
                      ? moment(props.initialUpdateUserData.confirmationDate.value).year().toString()
                      : moment().year().toString(),
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <MobileDatePicker
                  value={
                    props.initialUpdateUserData.terminationDate.value
                      ? moment(props.initialUpdateUserData.terminationDate.value)
                      : null
                  }
                  onChange={(event) => props.onHandleChangeUser('terminationDate', event)}
                  closeOnSelect
                  format="DD/MM/YYYY"
                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      label: 'Termination Date',
                      size: 'small',
                      fullWidth: true,
                      error: Boolean(props.initialUpdateUserData.terminationDate.error),
                      helperText: props.initialUpdateUserData.terminationDate.error,
                      required: props.initialUpdateUserData.terminationDate.isRequired,
                    },
                    inputAdornment: { position: 'end' },
                    actionBar: {
                      actions: ['cancel', 'accept'],
                    },
                    toolbar: DatePickerToolbarStyles,
                  }}
                  localeText={{
                    toolbarTitle: props.initialUpdateUserData.terminationDate.value
                      ? moment(props.initialUpdateUserData.terminationDate.value).year().toString()
                      : moment().year().toString(),
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl
                fullWidth
                size="small"
                error={!!props.initialUpdateUserData.applications.error}
              >
                <InputLabel id="applications-label">Applications *</InputLabel>
                <Select
                  labelId="applications-label"
                  multiple
                  error={!!props.initialUpdateUserData.applications.error}
                  required={props.initialUpdateUserData.applications.isRequired}
                  value={props.initialUpdateUserData.applications.value.map(
                    (app) => app.applicationKey
                  )}
                  onChange={(event) => {
                    const {
                      target: { value },
                    } = event
                    const selectedApplications = props.applications?.filter((app) =>
                      (typeof value === 'string' ? value.split(',') : value).includes(
                        app.applicationKey
                      )
                    )
                    props.onHandleChangeUser('applications', selectedApplications || [])
                  }}
                  input={<OutlinedInput label="Applications *" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => {
                        const app = props.applications?.find((a) => a.applicationKey === value)
                        return (
                          <Chip key={value} label={app?.applicationName || value} size="small" />
                        )
                      })}
                    </Box>
                  )}
                >
                  {props.applications?.map((app) => (
                    <MenuItem key={app.applicationKey} value={app.applicationKey}>
                      <Checkbox
                        checked={props.initialUpdateUserData.applications.value.some(
                          (selectedApp) => selectedApp.applicationKey === app.applicationKey
                        )}
                      />
                      <ListItemText primary={app.applicationName} />
                    </MenuItem>
                  ))}
                </Select>
                {props.initialUpdateUserData.applications.error && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ mt: 0.5, ml: 1.75, fontSize: '0.75rem' }}
                  >
                    {props.initialUpdateUserData.applications.error}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={props.initialUpdateUserData.isExternal.value}
                    onChange={(event) =>
                      props.onHandleChangeUser('isExternal', event.target.checked)
                    }
                    required={props.initialUpdateUserData.isExternal.isRequired}
                  />
                }
                label="External User"
              />
            </Grid>
            <Grid size={{ xs: 12 }} mt={3}>
              <Button variant="contained" color="primary" onClick={props.onUpdateUserTrigger}>
                Update User
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default EditUserDetails
