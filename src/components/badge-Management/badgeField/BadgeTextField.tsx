import { TextField } from '@mui/material'
import React from 'react'
import type { BadgeFilterFormDto } from '../../../utilities/models/badge.model'

const BadgeTextField: React.FC<{
  label: string
  placeHolder :string
  name: keyof BadgeFilterFormDto
  value: string
  onChange: (field: keyof BadgeFilterFormDto, value: any) => void
  required: boolean
  multiline: boolean
  error: string | null
  rows?: number
  onBlur?: () => void
}> = (props) => {
  return (
    <TextField
      label={props.label}
      placeholder={props.placeHolder}
      variant="outlined"
      size="small"
      fullWidth
      value={props.value ? props.value : ''}
      onChange={(newValue) => props.onChange(props.name,newValue.target.value)}
      error={Boolean(props.error)}
      helperText={props.error}
      required={props.required}
      multiline={props.multiline == true ? true : false}
      rows={props.rows}
      onBlur={props.onBlur}
    />
  )
}

export default BadgeTextField
