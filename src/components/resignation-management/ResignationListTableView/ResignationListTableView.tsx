import {
  Autocomplete,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from '@mui/material'
import { StyledTableCell, StyledTableRow } from '../../../assets/theme/theme'
import type { initResignationDto, StatusListQueryParamsDto } from '../../../utilities/models'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import type { ReactNode } from 'react'
import moment from 'moment'
import { DATE_FORMAT } from '../../../utilities/constants'

const ResignationListTableView: React.FC<{
  resignationRowData: initResignationDto[]
  children: ReactNode
  page: number
  rowsPerPage: number
  onCommentHandle(row: initResignationDto): void
  onStatusChangeTrigger(row: initResignationDto): void
  editingResignationId: number | null
  statusList: StatusListQueryParamsDto[]
  onCloseSelection(): void
  onUpdateTrigger(): void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdateHandleChange(field: string, value: any): void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialUpdateData: any
  resignationRowDataIsLoading: boolean
}> = (props) => {
  return (
    <Grid>
      <TableContainer>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="left">Emp. ID</StyledTableCell>
              <StyledTableCell align="left">Full Name</StyledTableCell>
              <StyledTableCell align="left">Resignation given date</StyledTableCell>
              <StyledTableCell align="left"> Resignation date</StyledTableCell>
              <StyledTableCell align="left">Latest Comment</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left" width={100}>
                Action
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {!props.resignationRowDataIsLoading &&
              props.resignationRowData?.length > 0 &&
              (props.rowsPerPage > 0
                ? props.resignationRowData.slice(
                    props.page * props.rowsPerPage,
                    props.page * props.rowsPerPage + props.rowsPerPage
                  )
                : props.resignationRowData
              )?.map((row: initResignationDto, index) => (
                <TableRow key={index} className="pointer">
                  <StyledTableCell align="left">{row.employeeNumber}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.firstName + ' ' + row.lastName}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {moment(row.resignationGivenDate).format(DATE_FORMAT)}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {moment(row.resignationDate).format(DATE_FORMAT)}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.comments[0]?.comment}</StyledTableCell>
                  {props.editingResignationId !== row.resignationId ? (
                    <StyledTableCell align="left">{row.statusName}</StyledTableCell>
                  ) : (
                    <StyledTableCell align="left" width={200}>
                      <Autocomplete
                        size="small"
                        fullWidth
                        options={
                          props.statusList
                            ? props.statusList.map((status) => {
                                return { id: status.id, name: status.status }
                              })
                            : []
                        }
                        value={props.initialUpdateData.statusId.value}
                        onChange={(_, value) => {
                          props.onUpdateHandleChange('statusId', value || null)
                        }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.name || ''}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            fullWidth
                            label={props.initialUpdateData.statusId.value.name + ' *'}
                          />
                        )}
                      />
                    </StyledTableCell>
                  )}

                  <StyledTableCell align="left" width={100}>
                    <div className="layout-row">
                      {props.editingResignationId !== row.resignationId ? (
                        <Tooltip title="Edit">
                          <EditOutlinedIcon
                            style={{
                              cursor: 'pointer',
                            }}
                            onClick={() => props.onStatusChangeTrigger(row)}
                          ></EditOutlinedIcon>
                        </Tooltip>
                      ) : (
                        <div className="layout-row">
                          <Tooltip title="Update">
                            <CheckCircleOutlineIcon
                              style={{
                                cursor: 'pointer',
                                color: '#4CAF50',
                              }}
                              onClick={props.onUpdateTrigger}
                            ></CheckCircleOutlineIcon>
                          </Tooltip>
                          <Tooltip title="Cancel">
                            <CancelOutlinedIcon
                              style={{
                                cursor: 'pointer',
                                color: 'red',
                              }}
                              onClick={props.onCloseSelection}
                            ></CancelOutlinedIcon>
                          </Tooltip>
                        </div>
                      )}

                      <Tooltip title="Add Comment">
                        <CommentOutlinedIcon
                          style={{
                            color: '#2872cc',
                            cursor: 'pointer',
                          }}
                          onClick={() => props.onCommentHandle(row)}
                        ></CommentOutlinedIcon>
                      </Tooltip>
                    </div>
                  </StyledTableCell>
                </TableRow>
              ))}
            {props.resignationRowDataIsLoading && (
              <StyledTableRow>
                <StyledTableCell colSpan={7} align="center">
                  <CircularProgress color="primary" size={20} /> Loading...
                </StyledTableCell>
              </StyledTableRow>
            )}

            {!props.resignationRowDataIsLoading && props.resignationRowData.length === 0 && (
              <StyledTableRow>
                <StyledTableCell colSpan={7} align="center">
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

export default ResignationListTableView
