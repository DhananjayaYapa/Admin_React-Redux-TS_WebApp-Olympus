import React, { type ReactNode } from 'react'
import {
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import { StyledTableCell, StyledTableRow } from '../../../assets/theme/theme'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined'
import styles from './TeamTableView.module.scss'

import type { SetTeamAvailabilityDto } from '../../../utilities/models/team.model'
import { getIconComponent } from '../../../utilities/helpers/iconMapper'

const TeamTableView: React.FC<{
  teamList: Array<SetTeamAvailabilityDto>
  page: number
  rowsPerPage: number
  onEditTeam(row: SetTeamAvailabilityDto): void
  children: ReactNode
  handleEnableDisable: (row: SetTeamAvailabilityDto) => void
}> = (props) => {
  return (
    <Grid>
      <TableContainer>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="left" width={30}>
                Icon
              </StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Client</StyledTableCell>
              <StyledTableCell align="left">Authorized Apps</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {props.teamList.length > 0 ? (
              (props.rowsPerPage > 0
                ? props.teamList.slice(
                    props.page * props.rowsPerPage,
                    props.page * props.rowsPerPage + props.rowsPerPage
                  )
                : props.teamList
              ).map((row: SetTeamAvailabilityDto, index) => {
                const IconComponent = getIconComponent(row.teamIcon)

                return (
                  <TableRow
                    key={index}
                    className="team-row"
                    sx={{
                      height: '40px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      },
                      '&:focus': {
                        backgroundColor: 'rgba(33, 150, 243, 0.08)',
                        outline: '2px solid #2196F3',
                        outlineOffset: '-2px',
                      },
                    }}
                  >
                    <StyledTableCell align="left" width={30}>
                      {IconComponent && (
                        <IconComponent sx={{ fontSize: '1.25rem', color: 'blue' }} />
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.teamName}</StyledTableCell>
                    <StyledTableCell align="left">{row.clientName}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.applications.map((app) => app.applicationName).join(', ')}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.teamDesc}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.isEnabled ? (
                        <span className={styles.enabled}>Enabled</span>
                      ) : (
                        <span className={styles.disabled}>Disabled</span>
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <div className="layout-row">
                        <Tooltip title="Edit Banner">
                          <EditOutlinedIcon
                            className="editIconStyle"
                            fontSize="small"
                            onClick={(e) => {
                              e.stopPropagation()
                              props.onEditTeam(row)
                            }}
                            style={{
                              cursor: 'pointer',
                              opacity: row.isEnabled ? 1 : 0.3,
                              pointerEvents: row.isEnabled ? 'auto' : 'none',
                            }}
                          ></EditOutlinedIcon>
                        </Tooltip>
                        <Tooltip title={row.isEnabled ? 'Disable Team' : 'Enable Team'}>
                          {row.isEnabled ? (
                            <NotInterestedOutlinedIcon
                              fontSize="small"
                              style={{
                                color: '#f44336ff',
                                cursor: 'pointer',
                              }}
                              onClick={() => props.handleEnableDisable(row)}
                            />
                          ) : (
                            <CheckCircleOutlineIcon
                              fontSize="small"
                              style={{
                                color: '#4CAF50',
                                cursor: 'pointer',
                              }}
                              onClick={() => props.handleEnableDisable(row)}
                            />
                          )}
                        </Tooltip>
                      </div>
                    </StyledTableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <StyledTableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    No Records Available
                  </Typography>
                </StyledTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {props.children}
    </Grid>
  )
}

export default TeamTableView
