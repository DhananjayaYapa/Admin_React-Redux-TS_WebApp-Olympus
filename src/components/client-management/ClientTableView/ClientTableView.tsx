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
import type { ClientDto } from '../../../utilities/models'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined'
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined'
import type { ReactNode } from 'react'

const ClientTableView: React.FC<{
  clientTableData: ClientDto[]
  children: ReactNode
  page: number
  rowsPerPage: number
  clientEditTrigger(row: ClientDto): void
  clientStatusChangeTrigger(row: ClientDto): void
  clientTableDataIsLoading: boolean
}> = (props) => {
  return (
    <Grid>
      <TableContainer>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="left">Client Name</StyledTableCell>
              <StyledTableCell align="left">Strategic Business Unit</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left" width={70}>
                Action
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {!props.clientTableDataIsLoading &&
              props.clientTableData.length > 0 &&
              (props.rowsPerPage > 0
                ? props.clientTableData.slice(
                    props.page * props.rowsPerPage,
                    props.page * props.rowsPerPage + props.rowsPerPage
                  )
                : props.clientTableData
              ).map((row: ClientDto, index: number) => (
                <TableRow key={index} className="pointer">
                  <StyledTableCell align="left">{row.clientName}</StyledTableCell>
                  <StyledTableCell align="left">{row.sbuName}</StyledTableCell>
                  <StyledTableCell align="left">{row.clientDesc}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.isEnabled ? (
                      <span className="enabled">Enabled</span>
                    ) : (
                      <span className="disabled">Disabled</span>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <div className="layout-row">
                      <Tooltip title="Edit Client">
                        <EditOutlinedIcon
                          className="editIconStyle"
                          fontSize="small"
                          style={{
                            cursor: 'pointer',
                            opacity: row.isEnabled ? 1 : 0.3,
                            pointerEvents: row.isEnabled ? 'auto' : 'none',
                          }}
                          onClick={() => props.clientEditTrigger(row)}
                        ></EditOutlinedIcon>
                      </Tooltip>
                      <Tooltip title={row.isEnabled ? 'Disable Client' : 'Enable Client'}>
                        {row.isEnabled ? (
                          <NotInterestedOutlinedIcon
                            fontSize="small"
                            style={{
                              color: 'red',
                              cursor: 'pointer',
                            }}
                            onClick={() => props.clientStatusChangeTrigger(row)}
                          />
                        ) : (
                          <CheckCircleOutlineIcon
                            fontSize="small"
                            style={{
                              color: '#4CAF50',
                              cursor: 'pointer',
                            }}
                            onClick={() => props.clientStatusChangeTrigger(row)}
                          />
                        )}
                      </Tooltip>
                    </div>
                  </StyledTableCell>
                </TableRow>
              ))}
            {props.clientTableDataIsLoading && (
              <StyledTableRow>
                <StyledTableCell colSpan={5} align="center">
                  <CircularProgress color="primary" size={20} /> Loading...
                </StyledTableCell>
              </StyledTableRow>
            )}

            {!props.clientTableDataIsLoading && props.clientTableData.length === 0 && (
              <StyledTableRow>
                <StyledTableCell colSpan={5} align="center">
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

export default ClientTableView
