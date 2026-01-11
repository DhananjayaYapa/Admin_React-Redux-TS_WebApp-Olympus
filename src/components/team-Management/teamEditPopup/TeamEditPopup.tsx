import { Button, Dialog, DialogContent, DialogTitle, Grid, IconButton } from '@mui/material'

import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import type { TeamUpdateFormDto } from '../../../utilities/models/team.model'
import TeamTextField from '../teamFields/TeamTextField'
import TeamDropdownField from '../teamFields/TeamDropdownField'
import TeamMultiDropdown from '../teamFields/TeamMultiDropdown'
import type { ClientDetailsDto } from '../../../utilities/models/client.model'
import type { ApplicationDetailsDto } from '../../../utilities/models'
import type { IconDetailsDto } from '../../../utilities/models/icon.model'

const TeamEditPopup: React.FC<{
  clientList: ClientDetailsDto[]
  onEditTeamHandleChange(property: string, value: any): void
  IsEdingTeam: TeamUpdateFormDto
  onUpdateTeam(): void
  onClose: () => void
  isOpen: boolean
  appList: ApplicationDetailsDto[]
  iconList: IconDetailsDto[]
  
}> = (props) => {
  return (
    <Grid container spacing={2} m={1}>
      <Dialog
        open={props.isOpen}
        onClose={props.onClose}
        maxWidth="sm"
        fullWidth
        aria-labelledby="banner-preview-dialog"
      >
        <DialogTitle
          id="banner-preview-dialog"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'right',

            fontSize: '1.5rem',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <span>{'Edit Team Details'}</span>
          <IconButton
            aria-label="close"
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
            onClick={props.onClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid size={{ xs: 12, sm: 12, md: 9 }} mt={3}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                <TeamTextField
                  label="Team Name"
                  name="teamName"
                  value={props.IsEdingTeam.teamName.value ? props.IsEdingTeam.teamName.value : ''}
                  onChange={props.onEditTeamHandleChange}
                  required={props.IsEdingTeam.teamName.isRequired}
                  multiline={false}
                  error={props.IsEdingTeam.teamName.error}

                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                <TeamDropdownField
                  label="Team Icon"
                  name="teamIcon"
                  value={props.IsEdingTeam.teamIcon.value ? props.IsEdingTeam.teamIcon.value : ''}
                  onChange={props.onEditTeamHandleChange}
                  error={props.IsEdingTeam.teamIcon.error}
                  list={props.iconList}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                <TeamMultiDropdown
                  name="application"
                  value={props.IsEdingTeam.application.value}
                  onChange={props.onEditTeamHandleChange}
                  error={props.IsEdingTeam.application.error}
                  list={props.appList}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                <TeamDropdownField
                  label="Client"
                  name="client"
                  value={props.IsEdingTeam.client.value ? props.IsEdingTeam.client.value : ''}
                  onChange={props.onEditTeamHandleChange}
                  error={props.IsEdingTeam.client.error}
                  list={props.clientList}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                <TeamTextField
                  label="Team Description"
                  name="teamDesc"
                  value={props.IsEdingTeam.teamDesc.value ? props.IsEdingTeam.teamDesc.value : ''}
                  onChange={props.onEditTeamHandleChange}
                  required={props.IsEdingTeam.teamDesc.isRequired}
                  multiline={true}
                  rows={5}
                  error={props.IsEdingTeam.teamDesc.error}
                />
              </Grid>

              <Grid container spacing={2} size={{ xs: 12, sm: 12, md: 4 }}>
                <Button
                  variant="contained"
                  size="medium"
                  sx={{ textTransform: 'none' }}
                  onClick={props.onUpdateTeam}
                >
                  Update Team
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  )
}

export default TeamEditPopup
