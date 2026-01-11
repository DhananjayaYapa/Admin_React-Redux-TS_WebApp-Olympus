/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { Edit, FilterList, NotInterested, CheckCircleOutline } from '@mui/icons-material'
import type { UserDto } from '../../../utilities/models'
import { useState } from 'react'
import UserConfirmDialog from '../UserConfirm/UserConfirm'

interface TableColumn {
  key: string
  name: string
  isSelected: boolean
  disabled?: boolean
}

interface Props {
  users: UserDto[]
  loading: boolean
  columns: TableColumn[]
  onToggleColumn: (key: string) => void
  onSelectAllColumns: (checked: boolean) => void
  allColumnsSelected: boolean
  filterVisible: boolean
  onToggleFilter: () => void
  page: number
  rowsPerPage: number
  anchorEl: HTMLElement | null
  onOpenCustomize: (el: HTMLElement | null) => void
  onCloseCustomize: () => void
  applications?: { applicationKey: string; applicationId: number; applicationName: string }[]
  designations?: {
    projectRoleId: number
    projectRoleName: string
    projectRoleDisplayName?: string
  }[]
  filters: any
  updateFilter: (key: string, value: any) => void
  onApplyFilter: () => void
  onClearFilter: () => void
  onUpdateUserStatus: (user: UserDto, newStatus: boolean) => void
  onHandleEditUser: (user: UserDto) => void
  children?: React.ReactNode
}

const ManageUsersTable: React.FC<Props> = ({
  users,
  loading,
  columns,
  onToggleColumn,
  onSelectAllColumns,
  allColumnsSelected,
  filterVisible,
  onToggleFilter,
  page,
  rowsPerPage,
  anchorEl,
  onOpenCustomize,
  onCloseCustomize,
  applications = [],
  designations = [],
  filters,
  updateFilter,
  onApplyFilter,
  onClearFilter,
  onUpdateUserStatus,
  onHandleEditUser,
  children,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Manage Users</Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  bgcolor: '#1976d2',
                  color: '#fff',
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                I
              </Box>
              <Typography variant="body2">Internal</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  bgcolor: '#9e9e9e',
                  color: '#fff',
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                E
              </Box>
              <Typography variant="body2">External</Typography>
            </Box>
          </Box>

          <Button variant="contained" onClick={(e) => onOpenCustomize(e.currentTarget)}>
            Customize
          </Button>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onCloseCustomize}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                px: 2,
                py: 1,
                minWidth: 240,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allColumnsSelected}
                    onChange={(e) => onSelectAllColumns(e.target.checked)}
                  />
                }
                label={<strong>Select All</strong>}
                sx={{ mb: 1 }}
              />

              {columns.map((col) => (
                <FormControlLabel
                  key={col.key}
                  label={col.name}
                  control={
                    <Checkbox
                      checked={col.isSelected}
                      onChange={() => onToggleColumn(col.key)}
                      disabled={col.disabled}
                    />
                  }
                  sx={{
                    opacity: col.disabled ? 0.5 : 1,
                    pointerEvents: col.disabled ? 'none' : 'auto',
                    mb: 0.5,
                  }}
                />
              ))}
            </Box>
          </Menu>

          <IconButton onClick={onToggleFilter}>
            <FilterList />
          </IconButton>
        </Box>
      </Box>

      {/* Filter Area */}
      {filterVisible && (
        <Grid sx={{ mb: 2 }}>
          <Grid container spacing={1}>
            <Grid size={{ xs: 2 }}>
              <TextField
                fullWidth
                size="small"
                label="Emp No"
                value={filters.empNo}
                onChange={(e) => updateFilter('empNo', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 2 }}>
              <TextField
                fullWidth
                size="small"
                label="Name"
                value={filters.name}
                onChange={(e) => updateFilter('name', e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="designation-label">Designation</InputLabel>

                <Select
                  labelId="designation-label"
                  label="Designation"
                  size="small"
                  value={filters.designation}
                  onChange={(e) => updateFilter('designation', e.target.value)}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: 250,
                        width: 340,
                      },
                    },
                    disablePortal: true,
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  {designations.map((d) => (
                    <MenuItem key={d.projectRoleId} value={d.projectRoleId}>
                      {d.projectRoleName} ({d.projectRoleDisplayName})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="apps-label">Authorized Apps</InputLabel>

                <Select
                  labelId="apps-label"
                  label="Authorized Apps"
                  size="small"
                  value={filters.application}
                  onChange={(e) => updateFilter('application', e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  {applications.map((a) => (
                    <MenuItem key={a.applicationId} value={a.applicationId}>
                      {a.applicationName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="type-label">Type</InputLabel>

                <Select
                  labelId="type-label"
                  label="Type"
                  value={filters.type}
                  onChange={(e) => updateFilter('type', e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="false">Internal</MenuItem>
                  <MenuItem value="true">External</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="status-label">Status</InputLabel>

                <Select
                  labelId="status-label"
                  label="Status"
                  size="small"
                  value={filters.status}
                  onChange={(e) => updateFilter('status', e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="true">Enabled</MenuItem>
                  <MenuItem value="false">Disabled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="contained" onClick={onApplyFilter}>
              Filter
            </Button>

            <Button variant="outlined" onClick={onClearFilter}>
              Clear
            </Button>
          </Box>
        </Grid>
      )}

      {/* Loading */}
      {loading && <Typography sx={{ textAlign: 'center', mt: 3 }}>Loading users...</Typography>}

      {/* Table */}
      {!loading && (
        <Paper elevation={0}>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell sx={{ width: '5%' }}></TableCell>

                  {columns
                    .filter((c) => c.isSelected)
                    .map((col) => (
                      <TableCell key={col.key} sx={{ fontWeight: 600 }}>
                        {col.name}
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((u) => (
                  <TableRow key={u.userId} hover>
                    {/* Internal / External Icon */}
                    <TableCell>
                      <Box
                        sx={{
                          bgcolor: u.isExternal ? '#9e9e9e' : '#1976d2',
                          color: 'white',
                          width: 26,
                          height: 26,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {u.isExternal ? 'E' : 'I'}
                      </Box>
                    </TableCell>

                    {columns.map((col) => {
                      if (!col.isSelected) return null

                      switch (col.key) {
                        case 'empNo':
                          return <TableCell key={col.key}>{u.employeeNumber}</TableCell>

                        case 'fullName':
                          return (
                            <TableCell key={col.key}>{u.firstName + ' ' + u.lastName}</TableCell>
                          )

                        case 'username':
                          return <TableCell key={col.key}>{u.username}</TableCell>

                        case 'designation':
                          return <TableCell key={col.key}>{u.designationShortForm}</TableCell>

                        case 'designationEffectiveDate':
                          return (
                            <TableCell key={col.key}>{u.designationEffectiveFrom ?? '-'}</TableCell>
                          )

                        case 'joinDate':
                          return <TableCell key={col.key}>{u.joinDate ?? '-'}</TableCell>

                        case 'confirmationDate':
                          return <TableCell key={col.key}>{u.confirmationDate ?? '-'}</TableCell>

                        case 'birthday':
                          return <TableCell key={col.key}>{u.birthday ?? '-'}</TableCell>

                        case 'userApplications':
                          return (
                            <TableCell key={col.key}>
                              {u.applications?.map((app) => app.applicationName).join(', ')}
                            </TableCell>
                          )

                        case 'status':
                          return (
                            <TableCell key={col.key}>
                              <Chip
                                label={u.isEnabled ? 'Enabled' : 'Disabled'}
                                size="small"
                                sx={{
                                  padding: u.isEnabled ? '0px 5px' : '0px 4px',
                                  fontSize: '12px',
                                  borderRadius: '3px',
                                  border: u.isEnabled
                                    ? '1px solid rgba(0, 255, 0, 0.5)'
                                    : '1px solid rgba(255, 0, 0, 0.5)',
                                  background: u.isEnabled
                                    ? 'rgba(0, 255, 0, 0.3)'
                                    : 'rgba(255, 0, 0, 0.3)',
                                }}
                              />
                            </TableCell>
                          )

                        case 'action':
                          return (
                            <TableCell key={col.key}>
                              <Box display="flex" alignItems="center">
                                <Tooltip title="Edit User">
                                  <span>
                                    <IconButton
                                      size="small"
                                      disabled={!u.isEnabled}
                                      sx={{ color: '#616161' }}
                                      onClick={() => onHandleEditUser(u)}
                                    >
                                      <Edit fontSize="small" />
                                    </IconButton>
                                  </span>
                                </Tooltip>

                                {u.isEnabled ? (
                                  <Tooltip title="Disable User">
                                    <IconButton
                                      size="small"
                                      sx={{ color: '#d32f2f' }}
                                      onClick={() => {
                                        setSelectedUser(u)
                                        setConfirmOpen(true)
                                      }}
                                    >
                                      <NotInterested fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                ) : (
                                  <Tooltip title="Enable User">
                                    {/* <IconButton size="small" sx={{ color: '#2e7d32' }}>
                                      <CheckCircleOutline fontSize="small" />
                                    </IconButton> */}
                                    <IconButton
                                      size="small"
                                      sx={{ color: '#2e7d32' }}
                                      onClick={() => {
                                        setSelectedUser(u)
                                        setConfirmOpen(true)
                                      }}
                                    >
                                      <CheckCircleOutline fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                )}
                                <UserConfirmDialog
                                  open={confirmOpen}
                                  onClose={() => setConfirmOpen(false)}
                                  onConfirm={() => {
                                    if (selectedUser && onUpdateUserStatus) {
                                      onUpdateUserStatus(selectedUser, !selectedUser.isEnabled)
                                    }
                                    setConfirmOpen(false)
                                  }}
                                  title="Please Confirm"
                                  message={
                                    selectedUser
                                      ? `Do you want to ${selectedUser.isEnabled ? 'Disable' : 'Activate'} user '${selectedUser.username}' ?`
                                      : ''
                                  }
                                />
                              </Box>
                            </TableCell>
                          )

                        default:
                          return null
                      }
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {children}
        </Paper>
      )}
    </Box>
  )
}

export default ManageUsersTable
