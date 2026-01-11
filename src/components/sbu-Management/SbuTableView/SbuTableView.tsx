import {
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material'
import { StyledTableCell, StyledTableRow } from '../../../assets/theme/theme'
import type { SetSbuDto } from '../../../utilities/models'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined'
import type { ReactNode } from 'react'

const SbuTableView: React.FC<{
  sbuTableData: SetSbuDto[]
  children: ReactNode
  page: number
  rowsPerPage: number
  sbuEditTrigger(row: SetSbuDto): void
  sbuStatusChangeTrigger(row: SetSbuDto): void
  sbuTableDataIsloding: boolean
}> = (props) => {
  return (
    <Grid>
      <TableContainer>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="left">SBU Name</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left" width={70}>
                Action
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {!props.sbuTableDataIsloding &&
              props.sbuTableData.length > 0 &&
              (props.rowsPerPage > 0
                ? props.sbuTableData.slice(
                    props.page * props.rowsPerPage,
                    props.page * props.rowsPerPage + props.rowsPerPage
                  )
                : props.sbuTableData
              ).map((row: SetSbuDto, index: number) => (
                <TableRow key={index} className="pointer">
                  <StyledTableCell align="left">{row.sbuName}</StyledTableCell>
                  <StyledTableCell align="left">{row.sbuDesc}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.isEnabled ? (
                      <span className="enabled">Enabled</span>
                    ) : (
                      <span className="disabled">Disabled</span>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <div className="layout-row">
                      <Tooltip title="Edit Banner">
                        <EditOutlinedIcon
                          className="editIconStyle"
                          fontSize="small"
                          style={{
                            cursor: 'pointer',
                            opacity: row.isEnabled ? 1 : 0.3,
                            pointerEvents: row.isEnabled ? 'auto' : 'none',
                          }}
                          onClick={() => props.sbuEditTrigger(row)}
                        ></EditOutlinedIcon>
                      </Tooltip>
                      <Tooltip title={row.isEnabled ? 'Disable Banner' : 'Enable Banner'}>
                        {row.isEnabled ? (
                          <NotInterestedOutlinedIcon
                            fontSize="small"
                            style={{
                              color: 'red',
                              cursor: 'pointer',
                            }}
                            onClick={() => props.sbuStatusChangeTrigger(row)}
                          />
                        ) : (
                          <CheckCircleOutlineIcon
                            fontSize="small"
                            style={{
                              color: '#4CAF50',
                              cursor: 'pointer',
                            }}
                            onClick={() => props.sbuStatusChangeTrigger(row)}
                          />
                        )}
                      </Tooltip>
                    </div>
                  </StyledTableCell>
                </TableRow>
              ))}
            {props.sbuTableDataIsloding && (
              <StyledTableRow>
                <StyledTableCell colSpan={4} align="center">
                  <CircularProgress color="primary" size={20} /> Loading...
                </StyledTableCell>
              </StyledTableRow>
            )}

            {!props.sbuTableDataIsloding && props.sbuTableData.length === 0 && (
              <StyledTableRow>
                <StyledTableCell colSpan={4} align="center">
                  No Records Available.
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {props.children}
    </Grid>
  )
}

export default SbuTableView
