import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import React, { useState } from 'react'
import type { TeamFilterFormDto } from '../../../utilities/models/team.model'
import type { ClientDetailsDto } from '../../../utilities/models/client.model'
import type { IconDetailsDto } from '../../../utilities/models/icon.model'
import { getIconComponent } from '../../../utilities/helpers/iconMapper'

const TeamDropdownField: React.FC<{
  label: string
  name: keyof TeamFilterFormDto
  value: string
  onChange: (field: keyof TeamFilterFormDto, value: any) => void
  error: string | null
  list: ClientDetailsDto[] | IconDetailsDto[]
  onBlur?: (value?: any) => void
}> = (props) => {
  const [searchTerm, setSearchTerm] = useState('')

  const isClientItem = (item: ClientDetailsDto | IconDetailsDto): item is ClientDetailsDto => {
    return 'clientName' in item
  }



  const filteredList = (props.list || []).filter((item) => {
    if (isClientItem(item)) {
      return (
        item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.clientId.toString().includes(searchTerm)
      )
    } else {
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.displayName && item.displayName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      )
    }
  })

  return (
    <FormControl fullWidth size="small" required error={Boolean(props.error)}>
      <InputLabel id="team-icon-select-label">{props.label}</InputLabel>
      <Select
        labelId="team-icon-select-label"
        id="team-icon-select"
        value={props.value}
        label={props.label}
        onChange={(newValue) => props.onChange(props.name, newValue.target.value)}
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
          const item = props.list.find((item) => {
            if (isClientItem(item)) {
              return item.clientName === value
            } else {
              return item.name === value
            }
          })

          if (item && !isClientItem(item)) {
            const IconComponent = getIconComponent(item.name)
            return (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconComponent sx={{ fontSize: '1.25rem' }} />
                <span>{item.displayName || item.name}</span>
              </Box>
            )
          } else if (item && isClientItem(item)) {
            // Client item
            return <span>{item.clientName}</span>
          }
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
            placeholder={props.name === 'teamIcon' ? 'Search Icon' : 'Search Client'}
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
        {filteredList.length === 0 && (
          <MenuItem disabled>
            <em>{props.name === 'teamIcon' ? 'No Icon Found' : 'No Client Found'}</em>
          </MenuItem>
        )}

        {/* Options */}
        {filteredList.map((item) => {
          if (isClientItem(item)) {
            return (
              <MenuItem key={item.clientId} value={item.clientName}>
                <span>{item.clientName}</span>
              </MenuItem>
            )
          } else {
          
            const IconComponent = getIconComponent(item.name)
            return (
              <MenuItem key={item.name} value={item.name}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconComponent sx={{ fontSize: '1.25rem' ,color: 'blue'}} />
                  <span>{item.displayName || item.name}</span>
                </Box>
              </MenuItem>
            )
          }
        })}
      </Select>
      {props.error && <FormHelperText error>{props.error}</FormHelperText>}
    </FormControl>
  )
}

export default TeamDropdownField