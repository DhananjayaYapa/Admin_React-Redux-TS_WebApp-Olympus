import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchIcon from '@mui/icons-material/Search'
import type {
  ClientListItem,
  ProjectListItem,
  SbuDto,
  SetApplicationRoleFeatureDto,
  clientsDto,
  ProjectDto,
} from '../../../../utilities/models'

const AthenaEntitlements: React.FC<{
  userFeatureRoles: SetApplicationRoleFeatureDto | null
  checkedRoleItem?: (userRoleId: number) => boolean
  checkedSBUItem?: (roleId: number, sbuId: number) => boolean
  checkedClientItem?: (roleId: number, sbuId: number, clientId: number) => boolean
  checkedProjectItem?: (
    roleId: number,
    sbuId: number,
    clientId: number,
    projectId: number
  ) => boolean
  disableSBU?: (roleId: number) => boolean
  sbuList?: SbuDto[]
  clientList?: ClientListItem[]
  projectList?: ProjectListItem[]
  onRoleChange?: (userRoleId: number, userRoleName: string, isChecked: boolean) => void
  onSbuChange?: (
    userRoleId: number,
    sbu: SbuDto,
    isChecked: boolean
  ) => void
  onClientChange?: (
    userRoleId: number,
    sbuId: number,
    sbuName: string,
    client: clientsDto,
    isChecked: boolean
  ) => void
  onProjectChange?: (
    userRoleId: number,
    sbuId: number,
    sbuName: string,
    clientId: number,
    clientName: string,
    project: ProjectDto,
    isChecked: boolean
  ) => void
  // Filter callbacks
  onFilterSbu?: (event: React.ChangeEvent<HTMLInputElement>, roleId: number) => void
  onFilterClient?: (event: React.ChangeEvent<HTMLInputElement>, roleId: number) => void
  onFilterProject?: (event: React.ChangeEvent<HTMLInputElement>, roleId: number) => void
  // Filtered list getters
  getFilteredSbuList?: (roleId: number) => SbuDto[]
  getFilteredClientList?: (roleId: number) => ClientListItem[]
  getFilteredProjectList?: (roleId: number) => ProjectListItem[]
}> = (props) => {
  const userApplicationRoles = [...(props.userFeatureRoles?.userRoles ?? [])].sort((a, b) =>
    a.userRoleName.localeCompare(b.userRoleName)
  )

  return (
    <Grid size={{ xs: 12, md: 12 }}>
      {userApplicationRoles?.map((userRole) => (
        <Accordion
          key={userRole.userRoleId}
          sx={{
            mb: 0,
            boxShadow: 'none',
            border: 'none',
            '&:before': { display: 'none' },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ flexDirection: 'row-reverse', gap: 1 }}
          >
            <FormControlLabel
              onClick={(e) => e.stopPropagation()}
              control={
                <Checkbox
                  color="primary"
                  checked={props.checkedRoleItem?.(userRole.userRoleId) ?? false}
                  onChange={(e) =>
                    props.onRoleChange?.(
                      userRole.userRoleId,
                      userRole.userRoleName,
                      e.target.checked
                    )
                  }
                />
              }
              label={<Typography fontWeight={500}>{userRole.userRoleName}</Typography>}
            />
          </AccordionSummary>
          {!userRole.isSetEntitlements && (
            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
              <Alert severity="warning" variant="outlined" sx={{ backgroundColor: '#ffdab0', mx: 2, mt: 1 }}>
                User cannot update or remove {userRole.userRoleName} role entitlements
              </Alert>
            </Grid>
          )}
          {userRole.entitlementLevel === 1 && (
            <AccordionDetails>
              <Accordion
                sx={{
                  mb: 0,
                  '&:before': { display: 'none' },
                  boxShadow: 'none',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight={500}>SBU</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Divider sx={{ mb: 2 }} />
                  <TextField
                    size="small"
                    label="Search SBU's"
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onFilterSbu?.(e, userRole.userRoleId)}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                  <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                    <Grid container spacing={1}>
                      {(props.getFilteredSbuList?.(userRole.userRoleId) ?? props.sbuList)?.map((sbu) => (
                        <Grid key={sbu.sbuId} size={{ xs: 12, sm: 6, md: 4 }}>
                          <FormControlLabel
                            sx={{ alignItems: 'center', width: '100%' }}
                            disabled={(props.disableSBU?.(userRole.userRoleId) ?? true) || !userRole.isSetEntitlements}
                            control={
                              <Checkbox
                                color="primary"
                                size="small"
                                checked={
                                  props.checkedSBUItem?.(userRole.userRoleId, sbu.sbuId) ?? false
                                }
                                onChange={(e) =>
                                  props.onSbuChange?.(
                                    userRole.userRoleId,
                                    { sbuId: sbu.sbuId, sbuName: sbu.sbuName },
                                    e.target.checked
                                  )
                                }
                              />
                            }
                            label={
                              <Typography
                                fontSize="0.875rem"
                                color={
                                  (props.disableSBU?.(userRole.userRoleId) || !userRole.isSetEntitlements)
                                    ? 'text.disabled'
                                    : 'inherit'
                                }
                              >
                                {sbu.sbuName}
                              </Typography>
                            }
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </AccordionDetails>
          )}
          {/* CLIENT: Show for entitlement levels 1 or 2 */}
          {userRole.entitlementLevel <= 2 && (
            <AccordionDetails>
              <Accordion
                sx={{
                  mb: 0,
                  '&:before': { display: 'none' },
                  boxShadow: 'none',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight={500}>CLIENT</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Divider sx={{ mb: 2 }} />
                  <TextField
                    size="small"
                    label="Search Client's"
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onFilterClient?.(e, userRole.userRoleId)}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                  <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                    {(props.getFilteredClientList?.(userRole.userRoleId) ?? props.clientList)?.filter((sbuGroup) => sbuGroup.clients.length > 0).map((sbuGroup) => (
                      <Box key={sbuGroup.sbuId} sx={{ mb: 2 }}>
                        <Typography
                          fontWeight={600}
                          fontSize="0.875rem"
                          sx={{ mb: 1, color: 'text.secondary' }}
                        >
                          {sbuGroup.sbuName}
                        </Typography>
                        <Grid container spacing={1}>
                          {sbuGroup.clients.map((client) => (
                            <Grid key={client.clientId} size={{ xs: 12, sm: 6, md: 4 }}>
                              <FormControlLabel
                                sx={{ alignItems: 'center', width: '100%' }}
                                control={
                                  <Checkbox
                                    color="primary"
                                    size="small"
                                    checked={
                                      props.checkedClientItem?.(
                                        userRole.userRoleId,
                                        sbuGroup.sbuId,
                                        client.clientId
                                      ) ?? false
                                    }
                                    disabled={!props.checkedRoleItem?.(userRole.userRoleId) || !userRole.isSetEntitlements}
                                    onChange={(e) =>
                                      props.onClientChange?.(
                                        userRole.userRoleId,
                                        sbuGroup.sbuId,
                                        sbuGroup.sbuName,
                                        { clientId: client.clientId, clientName: client.clientName },
                                        e.target.checked
                                      )
                                    }
                                  />
                                }
                                label={
                                  <Typography
                                    fontSize="0.875rem"
                                    color={!userRole.isSetEntitlements ? 'text.disabled' : 'inherit'}
                                  >
                                    {client.clientName}
                                  </Typography>
                                }
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            </AccordionDetails>
          )}
          {/* PROJECT: Show for entitlement levels 1, 2, or 3 */}
          {userRole.entitlementLevel >= 1 && userRole.entitlementLevel <= 3 && (
            <AccordionDetails>
              <Accordion
                sx={{
                  mb: 0,
                  boxShadow: 'none',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight={500}>PROJECT</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Divider sx={{ mb: 2 }} />
                  <TextField
                    size="small"
                    label="Search Project's"
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onFilterProject?.(e, userRole.userRoleId)}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                  <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                    {(props.getFilteredProjectList?.(userRole.userRoleId) ?? props.projectList)?.filter((clientGroup) => clientGroup.projects.length > 0).map((clientGroup) => (
                      <Box key={`${clientGroup.sbuId}-${clientGroup.clientId}`} sx={{ mb: 2 }}>
                        <Typography
                          fontWeight={600}
                          fontSize="0.875rem"
                          sx={{ mb: 1, color: 'text.secondary' }}
                        >
                          {clientGroup.clientName} ({clientGroup.sbuName})
                        </Typography>
                        <Grid container spacing={1}>
                          {clientGroup.projects.map((project) => (
                            <Grid key={project.projectId} size={{ xs: 12, sm: 6, md: 4 }}>
                              <FormControlLabel
                                sx={{ alignItems: 'center', width: '100%' }}
                                control={
                                  <Checkbox
                                    color="primary"
                                    size="small"
                                    checked={
                                      props.checkedProjectItem?.(
                                        userRole.userRoleId,
                                        clientGroup.sbuId,
                                        clientGroup.clientId,
                                        project.projectId
                                      ) ?? false
                                    }
                                    disabled={!props.checkedRoleItem?.(userRole.userRoleId) || !userRole.isSetEntitlements}
                                    onChange={(e) =>
                                      props.onProjectChange?.(
                                        userRole.userRoleId,
                                        clientGroup.sbuId,
                                        clientGroup.sbuName,
                                        clientGroup.clientId,
                                        clientGroup.clientName,
                                        { projectId: project.projectId, projectName: project.projectName },
                                        e.target.checked
                                      )
                                    }
                                  />
                                }
                                label={
                                  <Typography
                                    fontSize="0.875rem"
                                    color={!userRole.isSetEntitlements ? 'text.disabled' : 'inherit'}
                                  >
                                    {project.projectName}
                                  </Typography>
                                }
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            </AccordionDetails>
          )}
        </Accordion>
      ))}
    </Grid>
  )
}
export default AthenaEntitlements
