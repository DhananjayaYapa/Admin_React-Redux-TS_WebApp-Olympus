import React, { type ReactNode } from 'react'
import { Grid, Table, TableBody, TableContainer, TableHead, TableRow, Tooltip, TableCell, Typography, Box } from '@mui/material'
import { StyledTableCell, StyledTableRow } from '../../../assets/theme/theme'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined'
import type { SetBadgeAvailabilityDto } from '../../../utilities/models/badge.model'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'

const BadgeTableView: React.FC<{
  bannerList: Array<SetBadgeAvailabilityDto>
  onImgClick(imageUrl: string, title: string): void
  page: number
  rowsPerPage: number
  onEditBannner(row: SetBadgeAvailabilityDto): void
  children: ReactNode
  handleEnableDisable: (row: SetBadgeAvailabilityDto) => void
  handleAssignBadge: (row: SetBadgeAvailabilityDto) => void
}> = (props) => {
  return (
    <Grid>
      <TableContainer>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="left">Badge</StyledTableCell>
              <StyledTableCell align="left">Title</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left" width={70}>
                Action
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {props.bannerList.length > 0 ? (
              (props.rowsPerPage > 0
                ? props.bannerList.slice(
                    props.page * props.rowsPerPage,
                    props.page * props.rowsPerPage + props.rowsPerPage
                  )
                : props.bannerList
              ).map((row: SetBadgeAvailabilityDto, index) => (
                <TableRow key={index} className="pointer">
                  <StyledTableCell align="left">
                    <img
                      width="100px"
                      src={row.url}
                      alt={row.title}
                      onClick={() => props.onImgClick(row.url, row.title)}
                      style={{ cursor: 'pointer' }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.title}</StyledTableCell>
                  <StyledTableCell align="left">{row.description}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.isEnable ? (
                      <span className="enabled">Enabled</span>
                    ) : (
                      <span className="disabled">Disabled</span>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left" width={70}>
                    <div className="layout-column">
                      <Tooltip title="Edit Badge">
                        <EditOutlinedIcon
                          className="editIconStyle"
                          fontSize="small"
                          onClick={(e) => {
                            e.stopPropagation()
                            props.onEditBannner(row)
                          }}
                          style={{
                            cursor: 'pointer',
                            opacity: row.isEnable ? 1 : 0.3,
                            pointerEvents: row.isEnable ? 'auto' : 'none',
                          }}
                        />
                      </Tooltip>
                      <Tooltip title={row.isEnable ? 'Disable Badge' : 'Enable Badge'}>
                        {row.isEnable ? (
                          <NotInterestedOutlinedIcon
                            fontSize="small"
                            style={{
                              color: '#e90c10',
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

                      <Tooltip title="Assign Badge">
                        <PersonAddAltIcon
                          fontSize="small"
                          style={{
                            cursor: 'pointer',
                            opacity: row.isEnable ? 1 : 0.3,
                            pointerEvents: row.isEnable ? 'auto' : 'none',
                          }}
                          onClick={() => props.handleAssignBadge(row)}
                        />
                      </Tooltip>
                    </div>
                  </StyledTableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Box py={4}>
                    <Typography variant="body1" color="textSecondary">
                      No Records Available
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {props.children}
    </Grid>
  )
}

export default BadgeTableView