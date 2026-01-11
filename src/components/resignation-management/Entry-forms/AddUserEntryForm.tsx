import { Autocomplete, Grid, TextField } from '@mui/material'
import type { initialFilterFormDto, UserSelectDto } from '../../../utilities/models'

const AddUserEntryForm: React.FC<{
  userList: UserSelectDto[]
  resignationfilterFormData: initialFilterFormDto
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterFormHandleChange(field: keyof initialFilterFormDto, value: any): void
}> = (props) => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 12, md: 12 }}>
        <Autocomplete
          fullWidth
          size="small"
          options={
            props.userList
              ? props.userList.map((user) => {
                  return { name: user.username, id: user.userId }
                })
              : []
          }
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.name || ''}
          value={props.resignationfilterFormData.username.value}
          onChange={(_, newValue) => props.filterFormHandleChange('username', newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="User"
              placeholder="Search User"
              color="primary"
              required={props.resignationfilterFormData.username.isRequired}
              error={!!props.resignationfilterFormData.username.error}
              helperText={props.resignationfilterFormData.username.error}
            />
          )}
        />
      </Grid>
    </Grid>
  )
}

export default AddUserEntryForm
