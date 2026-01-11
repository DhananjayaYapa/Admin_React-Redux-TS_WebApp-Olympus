import { TextField } from '@mui/material'
import type { TeamFilterFormDto } from '../../../utilities/models/team.model'

const TeamTextField: React.FC<{
  label: string
  name: keyof TeamFilterFormDto
  value: string
  onChange: (field: keyof TeamFilterFormDto, value: any) => void
  required: boolean
  multiline: boolean
  error: string | null
  rows?: number
  onBlur?: () => void 
}> = (props) => {
  
  return (
    <TextField
      label={props.label}
      placeholder={props.label}
      variant="outlined"
      size="small"
      fullWidth
      value={props.value ? props.value : ''}
      onChange={(newValue) => props.onChange(props.name, newValue.target.value)}
      error={Boolean(props.error)}
      helperText={props.error}
      required={props.required}
      multiline={props.multiline == true ? true : false}
      rows={props.rows}
      onBlur={props.onBlur}
    />
  )
}

export default TeamTextField
