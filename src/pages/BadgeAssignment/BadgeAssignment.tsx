import React, { useEffect, useState } from 'react'
import { AppLayout } from '../../templates'
import { APP_TABLE_CONFIGS, BREAD_CRUMB } from '../../utilities/constants'
import { Alert, Box, Divider, Grid, InputAdornment, TextField } from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import AssignmentForm from '../../components/badge-Management/badeAssignment/assignmentForm/AssignmentForm'
import EmployeeViewTable from '../../components/badge-Management/badeAssignment/employeeViewTable/EmployeViewTable'
import { AppTablePagination } from '../../components'
import { useLocation } from 'react-router-dom'
import type {
  AllocationListQueryParamsDto,
  AssignBadgeDto,
  AssignBadgePayload,
  BadgeAssignDto,
  BadgeListQueryParamsDto,
  BadgeTableDetailsDto,
  BriefUserListQueryParamsDto,
  EmployeeListDto,
  SetBadgeAvailabilityDto,
  UpdateAssignBadgeDto,
} from '../../utilities/models/badge.model'
import { validateFormData } from '../../utilities/helpers'
import AssignStausChangePopUp from '../../components/badge-Management/badeAssignment/assignStatusPopup/AssignStatusChangePopup'
import { useDispatch, useSelector } from 'react-redux'
import type { AppStateDto } from '../../utilities/models'
import { alertActions, badgeActions } from '../../redux/actions'

const BadgeAssignment = () => {
  const dispatch = useDispatch()
  const assignCreateAlert = useSelector(
    (state: AppStateDto) => state.alert.postAllocationBadgeAlert
  )
  const assignUpdateAlert = useSelector(
    (state: AppStateDto) => state.alert.updateAllocationBadgeAlert
  )
  const allAllocationList = useSelector((state: AppStateDto) => state.badge.getAllocationList.data)
  const allUserBriefList = useSelector((state: AppStateDto) => state.badge.getUserBrief.data)
  const allBadgeList = useSelector((state: AppStateDto) => state.badge.getBadgeList.data)

  const location = useLocation()
  const { badgeDetails } = location.state || {}

  const INITIAL_FILTER_STATE = {
    badgeId: {
      value: badgeDetails.id,
      validator: 'number',
      isRequired: false,
      error: null,
    },
    title: {
      name: 'Title',
      value: badgeDetails.title,
      validator: 'string',
      isRequired: true,
      error: null,
    },
    url: {
      value: badgeDetails.url,
      validator: 'string',
      isRequired: false,
      error: null,
    },
    username: {
      name: 'Employee',
      value: [],
      validator: 'string',
      isRequired: true,
      error: null,
    },
  }

  const INITIAL_ASSIGN_STATUS_STATE = {
    assignStatus: {
      value: {} as BadgeTableDetailsDto,
    },
  }

  const [badgeAssignFilterFormData, setBadgeAssignFilterFormData] =
    useState<BadgeAssignDto>(INITIAL_FILTER_STATE)
  const [isStatusPopUpOpen, setIsStatePopUpOpen] = useState(false)
  const [isStateBadgeChangeRow, setIsStateBadgeChangeRow] = useState(INITIAL_ASSIGN_STATUS_STATE)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(APP_TABLE_CONFIGS.DEFAULT_ROWS_PER_PAGE)
  const [filteredEmployeeList, setFilteredEmployeeList] = useState<BadgeTableDetailsDto[]>([])
  const [searchFilter, setSearchFilter] = useState<string>('')
  const [filterEmployeeRow, setFilteredEmployeeRow] = useState<BadgeTableDetailsDto[]>([])
  const [filterBadgeRow, setFilteredBadgeRow] = useState<SetBadgeAvailabilityDto[]>([])
  const [employeeList, setEmployeeList] = useState<EmployeeListDto[]>([])
  const [currentBadgeId, setCurrentBadgeId] = useState<number | undefined>(badgeDetails?.id)
  {
    /*.............................................................................Badge Assign .......................................................................................*/
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFilterHandleChange = (field: keyof BadgeAssignDto, value: any) => {
    setBadgeAssignFilterFormData((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value,
        error: null,
      },
    }))
    if (field === 'title') {
      const selectedBadge = filterBadgeRow?.find(
        (badge) => badge.title.trim().toLowerCase() === value.trim().toLowerCase()
      )
      if (selectedBadge) {
        setCurrentBadgeId(selectedBadge.id)
      }
    }
  }

  const onAssignBadge = async () => {
    const [validateData, isValid] = await validateFormData(badgeAssignFilterFormData)
    setBadgeAssignFilterFormData(validateData)
    if (isValid) {
      const filterFormParamsDto: AssignBadgeDto = {
        badgeId: filterBadgeRow?.find(
          (badge) =>
            badge.title.trim().toLowerCase() ===
            badgeAssignFilterFormData.title.value.trim().toLowerCase()
        )!?.id,
        username: badgeAssignFilterFormData.username.value,
      }

      const payload: AssignBadgePayload = {
        badges: filterFormParamsDto.username.map((name) => ({
          badgeId: filterFormParamsDto.badgeId,
          username: name,
        })),
      }

      dispatch(badgeActions.postAllocation(payload))
    }
  }

  {
    /*.............................................................................Assign Status Change.......................................................................................*/
  }

  const handleEnableDisable = (row: BadgeTableDetailsDto) => {
    setIsStatePopUpOpen(true)
    setIsStateBadgeChangeRow({
      ...isStateBadgeChangeRow,
      assignStatus: {
        value: {
          id: row.id,
          isEnable: row.isEnable,
          createdBy: row.createdBy,
          createdAt: row.createdAt,
          modifiedBy: row.modifiedBy,
          modifiedAt: row.modifiedAt,
          userId: row.userId,
          employeeNumber: row.employeeNumber,
          name: row.name,
          username: row.username,
          badgeId: row.badgeId,
          title: row.title,
          description: row.description,
          url: row.url,
        },
      },
    })
  }

  const handleStatusOnClose = () => {
    setIsStatePopUpOpen(false)
  }

  const assignStatusChangeClick = () => {
    setIsStatePopUpOpen(false)
  }

  const assignStatusChange = () => {
    const badgeStatusChangeParams: UpdateAssignBadgeDto = {
      id: isStateBadgeChangeRow.assignStatus.value.id,
      badgeId: isStateBadgeChangeRow.assignStatus.value.badgeId,
    }

    dispatch(badgeActions.updateAllocation(badgeStatusChangeParams))
    setIsStatePopUpOpen(false)
    // Clear any previous update alerts
    dispatch(alertActions.clearUpdateAllocationBadgeAlert())
  }

  {
    /*.............................................................................Pagination.......................................................................................*/
  }

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  {
    /*.............................................................................Search Field.......................................................................................*/
  }

  useEffect(() => {
    const trimmedFilter = searchFilter.trim().toLowerCase()

    if (!trimmedFilter) {
      setFilteredEmployeeList([])
      return
    }

    // Normalize both hyphens AND underscores: remove spaces around them
    const normalizedFilter = trimmedFilter.replace(/\s*-\s*/g, '-').replace(/\s*_\s*/g, '_')

    const filtered =
      filterEmployeeRow?.filter((employee: BadgeTableDetailsDto) => {
        const empNumber = employee.employeeNumber?.toLocaleLowerCase()
        const name = (employee.name?.toLowerCase() || '')
          .replace(/\s*-\s*/g, '-')
          .replace(/\s*_\s*/g, '_')

        const title = (employee.title?.toLowerCase() || '')
          .replace(/\s*-\s*/g, '-')
          .replace(/\s*_\s*/g, '_')

        const description = (employee.description?.toLowerCase() || '')
          .replace(/\s*-\s*/g, '-')
          .replace(/\s*_\s*/g, '_')
        const userId = (employee.userId?.toString() || '').toLowerCase()
        const badgeId = (employee.badgeId?.toString() || '').toLowerCase()
        const username = (employee.username?.toLowerCase() || '')
          .replace(/\s*-\s*/g, '-')
          .replace(/\s*_\s*/g, '_')
        return (
          title.includes(normalizedFilter) ||
          description.includes(normalizedFilter) ||
          empNumber.includes(trimmedFilter) ||
          name.includes(trimmedFilter) ||
          username.includes(trimmedFilter) ||
          userId.includes(trimmedFilter) ||
          badgeId.includes(trimmedFilter)
        )
      }) || []

    setFilteredEmployeeList(filtered)
    setPage(0)
  }, [searchFilter, filterEmployeeRow])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchFilter(event.target.value)
  }

  const clearFormFields = () => {
    setBadgeAssignFilterFormData(INITIAL_FILTER_STATE)
  }

  {
    /*.............................................................................Get Allocations.......................................................................................*/
  }

  const getAllAllocationList = () => {
    const params: AllocationListQueryParamsDto = {
      getDisabled: false,
      badgeId: currentBadgeId,
    }

    dispatch(badgeActions.getAllocationList(params))
  }

  React.useEffect(() => {
    getAllAllocationList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBadgeId])

  React.useEffect(() => {
    setFilteredEmployeeRow(allAllocationList?.data)
  }, [allAllocationList, currentBadgeId])

  {
    /*.............................................................................Alerts.......................................................................................*/
  }

  useEffect(() => {
    if (assignCreateAlert.serverity === 'success') {
      clearFormFields()
      getAllAllocationList()
    } else if (assignCreateAlert.serverity === 'error') {
      clearFormFields()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignCreateAlert])

  const closeBadgeCreateAlert = () => {
    dispatch(alertActions.clearAllocationBadgeAlert())
  }

  const closeBannerUpdateAlert = () => {
    dispatch(alertActions.clearUpdateAllocationBadgeAlert())
  }

  {
    /*.............................................................................Get all badges.......................................................................................*/
  }

  const getAllBadgeList = () => {
    const params: BadgeListQueryParamsDto = {
      getDisabled: true,
    }
    dispatch(badgeActions.getBadgeList(params))
  }

  React.useEffect(() => {
    getAllBadgeList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    setFilteredBadgeRow(allBadgeList?.data)
  }, [allBadgeList])
  {
    /*.............................................................................Get all brief users.......................................................................................*/
  }

  const getAllUserBrief = () => {
    const params: BriefUserListQueryParamsDto = {
      getDisabled: false,
      getAll: true,
      ignoreApplication: true,
    }
    dispatch(badgeActions.getUserBrief(params))
  }

  React.useEffect(() => {
    getAllUserBrief()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    setEmployeeList(allUserBriefList?.data)
  }, [allUserBriefList])

  return (
    <React.Fragment>
      <AppLayout breadcrumb={BREAD_CRUMB.BADGE_ASSIGNMENT}>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <p
            style={{
              paddingBottom: 7,
              margin: 0,
              fontWeight: 400,
              fontSize: '24px',
            }}
          >
            Badge Assignments
          </p>
        </Box>
        <Divider className="dividerStyle" />

        <Grid container spacing={2} mt={2}>
          <Grid size={{ xs: 12, sm: 12, md: 3 }} className="sectionTitleHolder">
            <h3>Assign Badge</h3>
            <p>Assign badge can be done by using this section</p>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 9 }} mb={2}>
            {assignCreateAlert.message && (
              <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
                <Alert onClose={closeBadgeCreateAlert} severity={assignCreateAlert.severity}>
                  {assignCreateAlert.message}
                </Alert>
              </div>
            )}
            <AssignmentForm
              badgeDetails={badgeAssignFilterFormData}
              badgeList={filterBadgeRow}
              onChange={onFilterHandleChange}
              employeeList={employeeList}
              onAssignBadge={onAssignBadge}
            />
          </Grid>
        </Grid>
        <Divider className="dividerStyle" />

        <Grid container spacing={2} mt={2} mb={3}>
          <Grid size={{ md: 3 }} className="sectionTitleHolder">
            <h3>Manage Badge Assignments</h3>
            <p>Delete badge can be done using this section.</p> <br />
            <TextField
              label="Search Employees"
              id="outlined-basic"
              size="small"
              fullWidth
              variant="outlined"
              color="primary"
              placeholder="Search"
              value={searchFilter}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 9 }}>
            {assignUpdateAlert.message && (
              <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
                <Alert onClose={closeBannerUpdateAlert} severity={assignUpdateAlert.severity}>
                  {assignUpdateAlert.message}
                </Alert>
              </div>
            )}

            <EmployeeViewTable
              bannerList={
                filteredEmployeeList.length > 0 || searchFilter
                  ? filteredEmployeeList
                  : filterEmployeeRow || []
              }
              page={page}
              rowsPerPage={rowsPerPage}
              handleEnableDisable={handleEnableDisable}
            >
              <AppTablePagination
                data={
                  filteredEmployeeList.length > 0 || searchFilter
                    ? filteredEmployeeList
                    : filterEmployeeRow || []
                }
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </EmployeeViewTable>
          </Grid>
        </Grid>
        <AssignStausChangePopUp
          isOpen={isStatusPopUpOpen}
          onClose={handleStatusOnClose}
          isStatusChangeRow={isStateBadgeChangeRow}
          assignStatusChange={assignStatusChange}
          assignStatusChangeClick={assignStatusChangeClick}
        />
      </AppLayout>
    </React.Fragment>
  )
}

export default BadgeAssignment
