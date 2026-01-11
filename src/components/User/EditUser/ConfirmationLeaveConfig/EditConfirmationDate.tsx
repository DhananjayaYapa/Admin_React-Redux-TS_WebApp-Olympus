import { Grid, InputAdornment, TextField, Typography } from '@mui/material'
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import DatePickerToolbarStyles from '../../../../assets/theme/mobileDatePicker'
import type { UpdateUserFormDto, UserDto } from '../../../../utilities/models'

const EditConfirmationDate: React.FC<{
  userLeavesDetails: UserDto[]
  confirmationLeaveDate: UpdateUserFormDto
  handleConfirmationDateChange: (date: string | null) => void
  minDate: moment.Moment
  maxDate: moment.Moment
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}> = (props) => {
  return (
    <Grid container spacing={2} mb={2}>
      <Grid size={{ xs: 12, sm: 12, md: 12 }}>
        <Typography fontSize={25} fontWeight="bold" flexBasis={1} mt={2}>
          Confirmation & Leave Config
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 12 }}>
        <Typography fontSize={20} flexBasis={1}>
          Edit Confirmation Date
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 6 }}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <MobileDatePicker
            format="MM/DD/YYYY"
            value={
              props.confirmationLeaveDate.confirmationDate.value
                ? moment(props.confirmationLeaveDate.confirmationDate.value)
                : moment()
            }
            onChange={(newValue) => {
              props.handleConfirmationDateChange(newValue ? newValue.format('YYYY-MM-DD') : null)
            }}
            maxDate={props.maxDate}
            minDate={props.minDate}
            closeOnSelect
            slotProps={{
              textField: {
                margin: 'dense',
                variant: 'outlined',
                size: 'small',
                label: 'Confirmation Date',
                fullWidth: true,
                InputProps: { readOnly: true },
              },
              toolbar: DatePickerToolbarStyles,
              actionBar: {
                actions: ['cancel', 'accept'],
              },
            }}
          />
        </LocalizationProvider>
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 6 }}>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          margin="dense"
          value="Join Date"
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">{props.userLeavesDetails[0]?.joinDate}</InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#f5f5f5',
              '&:hover fieldset': {
                borderColor: 'rgba(0, 0, 0, 0.23)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'rgba(0, 0, 0, 0.23)',
                borderWidth: '1px',
              },
            },
          }}
        />
      </Grid>
    </Grid>
  )
}

export default EditConfirmationDate
