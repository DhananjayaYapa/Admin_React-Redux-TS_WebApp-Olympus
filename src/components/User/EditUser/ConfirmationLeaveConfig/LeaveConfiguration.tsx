import { Alert, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import type {
  EditLeaveCountFormDto,
  leaveCountDataDto,
  setCountedLeaveDto,
  UserDto,
} from '../../../../utilities/models'

const LeaveConfiguration: React.FC<{
  annualLeaveCountData?: leaveCountDataDto
  casualLeaveCountData?: leaveCountDataDto
  countedLeaveDataState?: setCountedLeaveDto[]
  userLeavesDetails: UserDto[]
  isAthenaAuthorized: boolean
  hasConfirmationDate: boolean
  leaveDataIsLoading: boolean
  countedLeaveDataIsLoading: boolean
  leaveCountFormData: EditLeaveCountFormDto
  onLeaveCountChange: (field: 'annual' | 'casual', value: number) => void
  onUpdateLeaveUser: () => void
  getUserListLoading: boolean
}> = (props) => {
  const hasValidationErrors =
    !!props.leaveCountFormData.annualLeaveCount.error ||
    !!props.leaveCountFormData.casualLeaveCount.error

  return (
    <Grid container spacing={2} mb={2}>
      <Grid size={{ xs: 12, sm: 12, md: 12 }}>
        <Typography fontSize={20} flexBasis={1}>
          Leaves Configuration
        </Typography>
      </Grid>
      {props.leaveDataIsLoading || props.countedLeaveDataIsLoading || props.getUserListLoading ? (
        <Grid size={{ xs: 12, sm: 12, md: 12 }}>
          <Typography color="textSecondary" fontSize={14} mt={3} mb={3} textAlign="center">
            Loading leave data...
          </Typography>
        </Grid>
      ) : props.userLeavesDetails[0]?.isExternal ? (
        <Grid size={{ xs: 12, sm: 12, md: 12 }}>
          <Typography color="error" fontSize={14} mt={1}>
            <Alert severity="warning" variant="outlined" sx={{ backgroundColor: '#ffdab0' }}>
              {props.userLeavesDetails[0]?.username} is external user.
            </Alert>
          </Typography>
        </Grid>
      ) : !props.isAthenaAuthorized ? (
        <Grid size={{ xs: 12, sm: 12, md: 12 }}>
          <Typography color="error" fontSize={14} mt={1}>
            <Alert severity="warning" variant="outlined" sx={{ backgroundColor: '#ffdab0' }}>
              {props.userLeavesDetails[0]?.username} does not authorized for the Athena app.
            </Alert>
          </Typography>
        </Grid>
      ) : (
        <>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              value="Current Annual Leaves"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    {props.annualLeaveCountData?.entitledLeaveCount ?? 0}
                  </InputAdornment>
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
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            {' '}
            {props.countedLeaveDataState && !props.hasConfirmationDate && (
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                value="Calculated Annual Leaves"
                InputProps={{
                  readOnly: true,
                  sx: {
                    color: 'primary.main',
                  },

                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography
                        sx={{
                          color: 'primary.main',
                        }}
                      >
                        {props.countedLeaveDataState?.[0]?.annualLeaveCount ?? 0}
                      </Typography>
                    </InputAdornment>
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
            )}
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }} sx={{ mt: -2 }}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              value="Current Casual Leaves"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    {props.casualLeaveCountData?.entitledLeaveCount ?? 0}
                  </InputAdornment>
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
          <Grid size={{ xs: 12, sm: 12, md: 6 }} sx={{ mt: -2 }}>
            {' '}
            {props.countedLeaveDataState && !props.hasConfirmationDate && (
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                value="Calculated Casual Leaves"
                InputProps={{
                  readOnly: true,
                  sx: {
                    color: 'primary.main',
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography
                        sx={{
                          color: 'primary.main',
                        }}
                      >
                        {props.countedLeaveDataState?.[0]?.casualLeaveCount ?? 0}
                      </Typography>
                    </InputAdornment>
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
            )}
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12 }}>
            <Typography fontSize={20} flexBasis={1}>
              Edit Leave Count
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <TextField
              label="Annual Leave Count"
              size="small"
              variant="outlined"
              fullWidth
              type="number"
              inputProps={{
                min: 0,
                max: 14,
                step: 1,
              }}
              value={props.leaveCountFormData.annualLeaveCount.value}
              onChange={(e) => props.onLeaveCountChange('annual', Number(e.target.value))}
              error={!!props.leaveCountFormData.annualLeaveCount.error}
              helperText={props.leaveCountFormData.annualLeaveCount.error}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <TextField
              label="Casual Leave Count"
              size="small"
              variant="outlined"
              fullWidth
              type="number"
              inputProps={{
                min: 0,
                step: 1,
              }}
              value={props.leaveCountFormData.casualLeaveCount.value}
              onChange={(e) => props.onLeaveCountChange('casual', Number(e.target.value))}
              error={!!props.leaveCountFormData.casualLeaveCount.error}
              helperText={props.leaveCountFormData.casualLeaveCount.error}
            />
          </Grid>
        </>
      )}
      <Grid container spacing={2} size={{ xs: 12, sm: 12, md: 12 }}>
        <Button
          variant="contained"
          size="medium"
          onClick={props.onUpdateLeaveUser}
          disabled={hasValidationErrors}
        >
          Update User
        </Button>
      </Grid>
    </Grid>
  )
}
export default LeaveConfiguration



