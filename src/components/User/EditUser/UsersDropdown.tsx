import { Autocomplete, TextField } from '@mui/material'
import type { SetUserListBriefDto } from '../../../utilities/models'

interface UsersDropdownProps {
  briefUsers: SetUserListBriefDto[]
  selectedUser: { id: number; name: string } | null
  onUserChange: (event: React.SyntheticEvent, newValue: { id: number; name: string } | null) => void
}

const UsersDropdown: React.FC<UsersDropdownProps> = (props) => {
  return (
    <Autocomplete
      size="small"
      options={
        props.briefUsers
          ? props.briefUsers.map((user) => {
              return { id: user.userId, name: user.username }
            })
          : []
      }
      value={props.selectedUser}
      onChange={props.onUserChange}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name || ''}
      renderInput={(params) => (
        <TextField {...params} placeholder="Search User" color="primary" variant="standard" />
      )}
    />
  )
}

export default UsersDropdown
