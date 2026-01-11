import {
  FormControl,
  FormHelperText,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import React, { useState } from 'react'
import type { BadgeAssignDto, SetBadgeAvailabilityDto } from '../../../utilities/models/badge.model'

const BadgeDropdownField: React.FC<{
  label: string
  name: keyof BadgeAssignDto
  value: string
  onChange: (field: keyof BadgeAssignDto, value: any) => void
  handleChange: (field: string) => void
  error: string | null
  list: SetBadgeAvailabilityDto[]
  onBlur?: (value?: any) => void
}> = (props) => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <FormControl fullWidth size="small" required error={Boolean(props.error)}>
      <InputLabel id="team-icon-select-label">{props.label}</InputLabel>
      <Select
        labelId="team-icon-select-label"
        id="team-icon-select"
        value={props.value}
        label={props.label}
        onChange={(newValue) => {
          props.onChange(props.name, newValue.target.value)
          props.handleChange(newValue.target.value)
        }}
        onClose={() => {
          setSearchTerm('')
          if (props.onBlur) props.onBlur(props.value)
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: 290,
              marginTop: '8px',
            },
          },
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          autoFocus: false,
        }}
        renderValue={(value) => {
          return <span>{value}</span>
        }}
      >
        {/* Search Field */}
        <ListSubheader
          onKeyDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          sx={{
            padding: 0,
            lineHeight: 'normal',
          }}
        >
          <TextField
            size="small"
            fullWidth
            placeholder={'Search badge'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                },
              },
            }}
          />
        </ListSubheader>

        {/* Empty State */}
        {props.list?.length === 0 && (
          <MenuItem disabled>
            <em>{'No Badge Found'}</em>
          </MenuItem>
        )}

        {/* Options */}
        {props.list?.map((item) => (
          <MenuItem key={item.id} value={item.title}>
            <span>{item.title}</span>
          </MenuItem>
        ))}
      </Select>
      {props.error && <FormHelperText error>{props.error}</FormHelperText>}
    </FormControl>
  )
}

export default BadgeDropdownField
