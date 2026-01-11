import React, { type ReactNode } from 'react'
import { Grid, Table, TableBody, TableContainer, TableHead, TableRow, Tooltip, TableCell, Typography, Box } from '@mui/material'
import PersonRemoveTwoToneIcon from '@mui/icons-material/PersonRemoveTwoTone'
import type { BadgeTableDetailsDto } from '../../../../utilities/models/badge.model'
import { StyledTableCell, StyledTableRow } from '../../../../assets/theme/theme'

const EmployeeViewTable: React.FC<{
  bannerList: Array<BadgeTableDetailsDto>
  page: number
  rowsPerPage: number
  children: ReactNode
  handleEnableDisable: (row: BadgeTableDetailsDto) => void
}> = (props) => {
  
  return (
    <Grid>
      <TableContainer>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="left">Emp.No</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
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
              ).map((row: BadgeTableDetailsDto, index) => (
                <TableRow key={index} className="pointer">
                  <StyledTableCell align="left">{row.employeeNumber}</StyledTableCell>
                  <StyledTableCell align="left">{row.name}</StyledTableCell>
                  <StyledTableCell align="left">{row.username}</StyledTableCell>
                  <StyledTableCell align="left" width={70}>
                    <div className="layout-row">
                      <Tooltip title="Unassign Badge">
                        <PersonRemoveTwoToneIcon
                          fontSize="small"
                          style={{ color: '#FFB300', cursor: 'pointer' }}
                          onClick={() => props.handleEnableDisable(row)}
                        />
                      </Tooltip>
                    </div>
                  </StyledTableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
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

export default EmployeeViewTable