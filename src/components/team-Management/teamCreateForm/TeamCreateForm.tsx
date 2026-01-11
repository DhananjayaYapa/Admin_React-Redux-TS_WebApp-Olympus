import { Button, Grid } from '@mui/material'
import React from 'react'

import TeamDropdownField from '../teamFields/TeamDropdownField'
import TeamMultiDropdown from '../teamFields/TeamMultiDropdown'
import TeamTextField from '../teamFields/TeamTextField'
import type { TeamFilterFormDto } from '../../../utilities/models/team.model'
import type { ClientDetailsDto } from '../../../utilities/models/client.model'
import type { ApplicationDetailsDto } from '../../../utilities/models'
import type { IconDetailsDto } from '../../../utilities/models/icon.model'

const TeamCreateForm: React.FC<{
  appList : ApplicationDetailsDto[]
  clientList : ClientDetailsDto[]
  iconList : IconDetailsDto[]
  onFilterHandleChange: (field: keyof TeamFilterFormDto, value: any) => void
  teamFilterFormData: TeamFilterFormDto
  onCreateTeam(): void
  onFieldBlur: (field: keyof TeamFilterFormDto) => void
}> = (props) => {
  return (
    <Grid container spacing={2} m={1}>
      <Grid size={{ xs: 12, sm: 12, md: 9 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <TeamTextField
              label="Team Name"
              name="teamName"
              value={props.teamFilterFormData.teamName.value}
              onChange={props.onFilterHandleChange}
              required={props.teamFilterFormData.teamName.isRequired}
              multiline={false}
              error={props.teamFilterFormData.teamName.error}
              onBlur={() => props.onFieldBlur('teamName')}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <TeamDropdownField
              label="Team Icon"
              name="teamIcon"
              value={props.teamFilterFormData.teamIcon.value}
              onChange={props.onFilterHandleChange}
              error={props.teamFilterFormData.teamIcon.error}
              list={props.iconList}
              onBlur={() => props.onFieldBlur('teamIcon')}
           
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <TeamMultiDropdown
              name="application"
              value={props.teamFilterFormData.application.value}
              onChange={props.onFilterHandleChange}
              error={props.teamFilterFormData.application.error}
              list = {props.appList}
              onBlur={() => props.onFieldBlur('application')}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <TeamDropdownField
              label="Client"
              name="client"
              value={props.teamFilterFormData.client.value}
              onChange={props.onFilterHandleChange}
              error={props.teamFilterFormData.client.error}
              list = {props.clientList}
              onBlur={() => props.onFieldBlur('client')}
             
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12 }} mb={1}>
            <TeamTextField
              label="Team Description"
              name="teamDesc"
              value={props.teamFilterFormData.teamDesc.value}
              onChange={props.onFilterHandleChange}
              required={props.teamFilterFormData.teamDesc.isRequired}
              multiline={true}
              rows={8}
              error={props.teamFilterFormData.teamDesc.error}
            />
          </Grid>

          <Button variant="contained" size="medium" onClick={props.onCreateTeam} sx={{ textTransform: 'none' }}>
            Create Team
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TeamCreateForm
