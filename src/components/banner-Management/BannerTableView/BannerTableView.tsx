import React, { type ReactNode } from 'react'
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
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import type { SetBannerAvailabilityDto } from '../../../utilities/models'
import moment from 'moment'

const BannerTableView: React.FC<{
  bannerList: Array<SetBannerAvailabilityDto>
  onImgClick(imageUrl: string): void
  page: number
  rowsPerPage: number
  onEditBannner(row: SetBannerAvailabilityDto): void
  children: ReactNode
  handleEnableDisable: (row: SetBannerAvailabilityDto) => void
  handleDeleteBanner: (row: SetBannerAvailabilityDto) => void
  bannerListIsLoading: boolean
}> = (props) => {
  return (
    <Grid>
      <TableContainer>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="left">Start Date</StyledTableCell>
              <StyledTableCell align="left">Expire Date</StyledTableCell>
              <StyledTableCell align="left">Image</StyledTableCell>
              <StyledTableCell align="left">Title</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left" width={70}>
                Action
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {!props.bannerListIsLoading &&
              props.bannerList.length > 0 &&
              (props.rowsPerPage > 0
                ? props.bannerList.slice(
                    props.page * props.rowsPerPage,
                    props.page * props.rowsPerPage + props.rowsPerPage
                  )
                : props.bannerList
              ).map((row: SetBannerAvailabilityDto, index) => (
                <TableRow key={index} className="pointer">
                  <StyledTableCell align="left">
                    {moment(row.startDate).format('YYYY-MM-DD')}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {moment.utc(row.expiredAt).format('YYYY-MM-DD')}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <img
                      width="100px"
                      src={row.imageURL}
                      alt={row.bannerTitle}
                      onClick={() => props.onImgClick(row.imageURL)}
                      style={{ cursor: 'pointer' }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.bannerTitle}</StyledTableCell>
                  <StyledTableCell align="left">{row.bannerDesc}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.isEnabled ? (
                      <span className="enabled">Enabled</span>
                    ) : (
                      <span className="disabled">Disabled</span>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left" width={70}>
                    <div className="layout-row">
                      <Tooltip title="Edit Banner">
                        <EditOutlinedIcon
                          className="editIconStyle"
                          fontSize="small"
                          onClick={(e) => {
                            e.stopPropagation()
                            props.onEditBannner(row)
                          }}
                          style={{
                            cursor: 'pointer',
                            opacity: row.isEnabled ? 1 : 0.3,
                            pointerEvents: row.isEnabled ? 'auto' : 'none',
                          }}
                        ></EditOutlinedIcon>
                      </Tooltip>
                      <Tooltip title={row.isEnabled ? 'Disable Banner' : 'Enable Banner'}>
                        {row.isEnabled ? (
                          <NotInterestedOutlinedIcon
                            fontSize="small"
                            style={{
                              color: '#f49236ff',
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
                      {row.isEnabled ? (
                        <Tooltip title="Delete Banner">
                          <DeleteOutlinedIcon
                            fontSize="small"
                            style={{ color: '#e90c10', cursor: 'pointer' }}
                            onClick={() => props.handleDeleteBanner(row)}
                          ></DeleteOutlinedIcon>
                        </Tooltip>
                      ) : (
                        ''
                      )}
                    </div>
                  </StyledTableCell>
                </TableRow>
              ))}
            {props.bannerListIsLoading && (
              <StyledTableRow>
                <StyledTableCell colSpan={7} align="center">
                  <CircularProgress color="primary" size={20} /> Loading...
                </StyledTableCell>
              </StyledTableRow>
            )}

            {!props.bannerListIsLoading && props.bannerList.length === 0 && (
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

export default BannerTableView
