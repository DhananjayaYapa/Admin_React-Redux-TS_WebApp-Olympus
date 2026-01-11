import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import BadgeDropdownField from '../../badgeField/BadgeDropdownField'
import BadgeMultiDropdown from '../../badgeField/BadgeMultiDropdown'
import type {
  BadgeAssignDto,
  EmployeeListDto,
  SetBadgeAvailabilityDto,
} from '../../../../utilities/models/badge.model'

const AssignmentForm: React.FC<{
  badgeDetails: BadgeAssignDto
  badgeList: SetBadgeAvailabilityDto[]
  onChange: (field: keyof BadgeAssignDto, value: any) => void
  employeeList: EmployeeListDto[]
  onAssignBadge(): void
}> = (props) => {
  {
    /*.............................................................................Change Image.......................................................................................*/
  }
  const [selectedBadgeurl, setSelectedUrl] = useState<string>(props.badgeDetails.url.value)

  const handleTitleChange = (selectedTitle: string) => {
    const selectedBadge = props.badgeList.find((badge) => badge.title === selectedTitle)

    if (selectedBadge) {
      setSelectedUrl(selectedBadge.url)
    }
  }

  return (
    <Grid container spacing={2} mt={2} mb={3}>
      {/* Left side - Dropdowns */}
      <Grid size={{ xs: 12, sm: 12, md: 6 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <BadgeDropdownField
              label="Badge"
              name="title"
              value={props.badgeDetails.title.value}
              onChange={props.onChange}
              handleChange={handleTitleChange}
              error={props.badgeDetails.title.error}
              list={props.badgeList}
              onBlur={() => {}}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <BadgeMultiDropdown
              name="username"
              value={props.badgeDetails.username.value}
              onChange={props.onChange}
              error={props.badgeDetails.username.error}
              list={props.employeeList}
              onBlur={() => {}}
            />
          </Grid>

          <Button
            variant="contained"
            size="medium"
            onClick={props.onAssignBadge}
            sx={{ textTransform: 'none' }}
          >
            Assign
          </Button>
        </Grid>
      </Grid>

      {/* Right side - Image in Compact Card */}
      <Grid size={{ xs: 12, sm: 12, md: 6 }}>
        <Box display="flex" justifyContent="center" alignItems="flex-start">
          <Box
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#fff',
              maxWidth: '250px',
              width: '100%',
            }}
          >
            <Typography variant="body1" sx={{ mb: 1.5, fontWeight: 500 }}>
              {props.badgeDetails.title.value }
            </Typography>
            <img
              src={selectedBadgeurl}
              alt="Badge Preview"
              style={{
                width: '100%',
                maxWidth: '180px',
                height: 'auto',
              }}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default AssignmentForm
