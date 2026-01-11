import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  type SelectChangeEvent,
  TextField,
  ListSubheader,
  InputAdornment,
  FormHelperText,
} from '@mui/material'
import React from 'react'
import type { TeamFilterFormDto } from '../../../utilities/models/team.model'
import type { ApplicationDetailsDto } from '../../../utilities/models'

const TeamMultiDropdown: React.FC<{
  name: keyof TeamFilterFormDto
  value: string[]
  onChange: (field: keyof TeamFilterFormDto, value: any) => void
  error: string | null
  list: ApplicationDetailsDto[]
  onBlur?: () => void
}> = (props) => {
  const [searchTerm, setSearchTerm] = React.useState('')

  const selectedValues = props.value || []

  const filteredNames =
    props.list?.filter((app) =>
      app.applicationName.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event
    const newValue = typeof value === 'string' ? value.split(',') : value
    props.onChange(props.name, newValue)
  }

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()

    const filteredAppNames = filteredNames.map((app) => app.applicationName)

    const allSelected = filteredAppNames.every((name) => selectedValues.includes(name))

    if (allSelected) {
      const newValue = selectedValues.filter((name) => !filteredAppNames.includes(name))
      props.onChange(props.name, newValue)
    } else {
      const newSelections = [...new Set([...selectedValues, ...filteredAppNames])]
      props.onChange(props.name, newSelections)
    }
  }

  const isAllSelected =
    filteredNames.length > 0 &&
    filteredNames.every((app) => selectedValues.includes(app.applicationName))

  return (
    <FormControl fullWidth size="small" required error={Boolean(props.error)}>
      <InputLabel id="demo-multiple-checkbox-label">Application</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={props.value}
        error={Boolean(props.error)}
        name={props.name}
        onChange={handleChange}
        onClose={() => {
          setSearchTerm('')
          if (props.onBlur) props.onBlur() 
        }}
        input={<OutlinedInput label="Application" />}
        size="small"
        renderValue={(selected) => selected.join(', ')}
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
      >
        {/* Search Field with Select All Checkbox */}
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
            placeholder="Search Application"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Checkbox
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    size="small"
                    onClick={(e) => e.stopPropagation()}
                  />
                </InputAdornment>
              ),
            }}
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
        {filteredNames.length === 0 && (
          <MenuItem disabled>
            <em>No applications found</em>
          </MenuItem>
        )}

        {/* Application Options */}
        {filteredNames.map((name) => (
          <MenuItem
            key={name.applicationKey}
            value={name.applicationName}
            sx={{
              minHeight: 'auto',
            }}
          >
            <Checkbox
              checked={selectedValues.includes(name.applicationName)}
              size="small"
              sx={{ py: 0 }}
            />
            <ListItemText primary={name.applicationName} />
          </MenuItem>
        ))}
      </Select>
      {props.error && <FormHelperText error>{props.error}</FormHelperText>}
    </FormControl>
  )
}

export default TeamMultiDropdown
