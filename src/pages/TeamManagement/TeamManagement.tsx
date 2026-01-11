/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { AppLayout } from '../../templates'
import { APP_TABLE_CONFIGS, BREAD_CRUMB } from '../../utilities/constants'
import { Box, Divider, Grid, Alert, TextField, InputAdornment } from '@mui/material'
import TeamCreateForm from '../../components/team-Management/teamCreateForm/TeamCreateForm'
import TeamTableView from '../../components/team-Management/teamTableView/TeamTableView'
import { AppTablePagination } from '../../components'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import type {
  CreateTeamDto,
  SetTeamAvailabilityDto,
  TeamFilterFormDto,
  TeamListQueryParamsDto,
  TeamUpdateFormDto,
  UpdateTeamDto,
} from '../../utilities/models/team.model'
import { validateFormData } from '../../utilities/helpers'
import TeamStatusChangePopup from '../../components/team-Management/teamStatusChangePopup/TeamStatusChangePopup'
import TeamEditPopup from '../../components/team-Management/teamEditPopup/TeamEditPopup'
import { applicationActions } from '../../redux/actions/application.action'
import { clientActions } from '../../redux/actions/client.action'
import { team_alertActions } from '../../redux/actions/team_alert.actions'
import { teamActions } from '../../redux/actions/team.actions'
import { useDispatch, useSelector } from 'react-redux'
import type { ApplicationDetailsDto, AppStateDto } from '../../utilities/models'
import type {
  ClientDetailsDto,
  ClientListQueryParamsDto,
} from '../../utilities/models/client.model'
import { getAllMaterialIcons } from '../../utilities/helpers/iconMapper'

const TeamManagement: React.FC = () => {
  const dispatch = useDispatch()

  const teamCreateAlert = useSelector((state: AppStateDto) => state.team_alert?.postTeamAlert)
  const teamUpdateAlert = useSelector((state: AppStateDto) => state.team_alert?.updateTeamAlert)
  const allTeamList = useSelector((state: AppStateDto) => state.team.getTeamList.data)
  const allClientList = useSelector((state: AppStateDto) => state.client.getClientList.data)
  const allAppList = useSelector((state: AppStateDto) => state.application.getAppList.data)

  const INITIAL_FILTER_STATE = {
    teamName: {
      name: 'Team Name',
      value: '',
      validator: 'string',
      isRequired: true,
      error: null,
    },
    teamIcon: {
      name: 'Icon',
      value: '',
      validator: 'string',
      isRequired: true,
      error: null,
    },
    application: {
      name: 'Application',
      value: [],
      validator: 'string',
      isRequired: true,
      error: null,
    },
    client: {
      name: 'Client',
      value: '',
      validator: 'string',
      isRequired: true,
      error: null,
    },
    teamDesc: {
      name: 'Team Description',
      value: '',
      validator: 'string',
      isRequired: false,
      error: null,
    },
  }

  const INITIAL_UPDATE_TEAM_STATE = {
    teamId: {
      name: 'Team Id',
      value: -1,
      isRequired: true,
      error: null,
    },

    teamName: {
      name: 'Team Name',
      value: '',
      validator: 'string',
      isRequired: true,
      error: null,
    },

    teamDesc: {
      name: 'Team Description',
      value: '',
      validator: 'string',
      isRequired: false,
      error: null,
    },
    teamIcon: {
      name: 'Icon',
      value: '',
      validator: 'string',
      isRequired: true,
      error: null,
    },
    client: {
      name: 'Client',
      value: '',
      validator: 'string',
      isRequired: true,
      error: null,
    },
    isEnabled: {
      name: 'Status',
      value: false,
      validator: 'boolean',
      isRequired: true,
      error: null,
    },
    application: {
      name: 'Application',
      value: [],
      validator: 'string',
      isRequired: true,
      error: null,
    },
  }

  const INITIAL_TEAM_STATUS_STATE = {
    teamStatus: {
      value: {} as SetTeamAvailabilityDto,
    },
  }

  const [rowsPerPage, setRowsPerPage] = useState(APP_TABLE_CONFIGS.DEFAULT_ROWS_PER_PAGE)
  const [teamFilterFormData, setTeamFilterFormData] =
    useState<TeamFilterFormDto>(INITIAL_FILTER_STATE)
  const [isStateTeamChangeRow, setIsStateTeamChangeRow] = useState(INITIAL_TEAM_STATUS_STATE)
  const [isEditingTeam, setIsEditingTeam] = useState<TeamUpdateFormDto>(INITIAL_UPDATE_TEAM_STATE)
  const [isStatusPopUpOpen, setIsStatePopUpOpen] = useState(false)
  const [isOpenPopUp, setIsOpenPopUp] = useState(false)
  const [page, setPage] = useState(0)
  const [searchFilter, setSearchFilter] = useState<string>('')
  const [filterTeamRow, setFilterTeamRow] = useState<SetTeamAvailabilityDto[]>([])
  const [filteredTeamList, setFilteredTeamList] = useState<SetTeamAvailabilityDto[]>([])
  const [clientList, setClientList] = useState<ClientDetailsDto[]>([])
  const [appList, setAppList] = useState<ApplicationDetailsDto[]>([])
  const [iconList] = useState(() => getAllMaterialIcons())

  {
    /*--------------------------------------------Search Field--------------------------------------------------------------------------*/
  }
  useEffect(() => {
    const trimmedFilter = searchFilter.trim().toLowerCase()

    if (!trimmedFilter) {
      setFilteredTeamList([])
      return
    }

    const filtered =
      filterTeamRow?.filter((team: SetTeamAvailabilityDto) => {
        const statusText = team.isEnabled ? 'enabled' : 'disabled'
        return (
          team.teamId?.toString().includes(trimmedFilter) ||
          team.teamName?.toLowerCase().includes(trimmedFilter) ||
          team.teamDesc?.toLowerCase().includes(trimmedFilter) ||
          team.teamIcon?.toLowerCase().includes(trimmedFilter) ||
          team.clientId?.toString().includes(trimmedFilter) ||
          team.clientName?.toLowerCase().includes(trimmedFilter) ||
          team.clientTeamRelId?.toString().includes(trimmedFilter) ||
          statusText.includes(trimmedFilter) ||
          team.applications?.some(
            (app) =>
              app.applicationId?.toString().includes(trimmedFilter) ||
              app.applicationName?.toLowerCase().includes(trimmedFilter.toLowerCase()) ||
              app.applicationKey?.toLowerCase().includes(trimmedFilter.toLowerCase())
          )
        )
      }) || []

    setFilteredTeamList(filtered)
    setPage(0)
  }, [searchFilter, filterTeamRow])

  React.useEffect(() => {
    setFilterTeamRow(allTeamList)
  }, [allTeamList])

  React.useEffect(() => {
    setClientList(allClientList.data)
  }, [allClientList])

  React.useEffect(() => {
    setAppList(allAppList)
  }, [allAppList])

  useEffect(() => {
    if (teamCreateAlert.serverity === 'success' || teamCreateAlert.serverity === 'error')
      clearFormFields()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamCreateAlert])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchFilter(event.target.value)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFilterHandleChange = (field: keyof TeamFilterFormDto, value: any) => {
    setTeamFilterFormData((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value,
        error: null,
      },
    }))
  }

  {
    /*-------------------------------------------Pagination-----------------------------------------------------------------------*/
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
    /*---------------------------------------------Create Team-------------------------------------------------------------------*/
  }
  const onCreateTeam = async () => {
    const [validateData, isValid] = await validateFormData(teamFilterFormData)
    setTeamFilterFormData(validateData)
    if (isValid) {
      const filterFormParamsDto: CreateTeamDto = {
        teamName: teamFilterFormData.teamName.value,
        teamDesc: teamFilterFormData.teamDesc.value,
        teamIcon: teamFilterFormData.teamIcon.value,
        clientId: clientList.find(
          (client) =>
            client.clientName.toLowerCase() === teamFilterFormData.client.value.toLowerCase()
        )!.clientId,
        isEnabled: true,
        applications: teamFilterFormData.application.value.flatMap((appName) => {
          const key = appList.find(
            (a) => a.applicationName.toLowerCase() === appName.toLowerCase()
          )?.applicationKey

          return key ? [{ applicationKey: key }] : []
        }),
      }

      dispatch(teamActions.postTeam(filterFormParamsDto))
    }
  }

  {
    /*-------------------------------------------Staus Change--------------------------------------------------------------------------*/
  }
  const handleEnableDisable = (row: SetTeamAvailabilityDto) => {
    setIsStatePopUpOpen(true)
    setIsStateTeamChangeRow({
      ...isStateTeamChangeRow,
      teamStatus: {
        value: {
          teamId: row.teamId,
          teamName: row.teamName,
          teamDesc: row.teamDesc,
          teamIcon: row.teamIcon,
          isEnabled: row.isEnabled,
          clientId: row.clientId,
          clientName: row.clientName,
          clientTeamRelId: row.clientTeamRelId,
          applications: row.applications,
        },
      },
    })
  }

  const handleStatusOnClose = () => {
    setIsStatePopUpOpen(false)
  }

  const teamStatusChangeClick = () => {
    setIsStatePopUpOpen(false)
  }

  const teamStatusChange = () => {
    const teamStatusChangeParams: UpdateTeamDto = {
      teamId: isStateTeamChangeRow.teamStatus.value.teamId,
      teamName: isStateTeamChangeRow.teamStatus.value.teamName,
      teamDesc: isStateTeamChangeRow.teamStatus.value.teamDesc,
      teamIcon: isStateTeamChangeRow.teamStatus.value.teamIcon,
      isEnabled: !isStateTeamChangeRow.teamStatus.value.isEnabled,
      clientId: isStateTeamChangeRow.teamStatus.value.clientId,
      applications: isStateTeamChangeRow.teamStatus.value.applications,
    }

    dispatch(teamActions.updateTeam(teamStatusChangeParams))

    setIsStatePopUpOpen(false)
    // Clear any previous update alerts
    dispatch(team_alertActions.clearUpdateTeamAlert())
  }
  {
    /*-----------------------------------------------------------Error Handle----------------------------------------------------------*/
  }

  // const handleFieldBlur = (field: keyof TeamFilterFormDto) => {

  //   const fieldData = teamFilterFormData[field]

  //   if (fieldData.isRequired) {
  //     let hasError = false
  //     let errorMessage = ''

  //     if (Array.isArray(fieldData.value)) {
  //       hasError = fieldData.value.length === 0
  //       errorMessage = `${fieldData.name} is required`
  //     } else {
  //       hasError = !fieldData.value?.toString().trim()
  //       errorMessage = `${fieldData.name} is required`
  //     }

  //     // Only set error if there actually is one AND value hasn't been set
  //     if (hasError) {
  //       setTeamFilterFormData((prevState) => ({
  //         ...prevState,
  //         [field]: {
  //           ...prevState[field],
  //           error: errorMessage,
  //         },
  //       }))
  //     }
  //   }
  // }
  const handleFieldBlur = (field: keyof TeamFilterFormDto, currentValue?: any) => {
    setTeamFilterFormData((prevState) => {
      const fieldData = prevState[field]
      const valueToCheck = currentValue !== undefined ? currentValue : fieldData.value

      if (fieldData.isRequired) {
        let hasError = false
        let errorMessage = ''

        if (Array.isArray(valueToCheck)) {
          hasError = valueToCheck.length === 0
          errorMessage = `${fieldData.name} is required`
        } else {
          hasError = !valueToCheck?.toString().trim()
          errorMessage = `${fieldData.name} is required`
        }

        return {
          ...prevState,
          [field]: {
            ...prevState[field],
            error: hasError ? errorMessage : null,
          },
        }
      }
      return prevState
    })
  }

  {
    /*-----------------------------------------------------------Update Team----------------------------------------------------------*/
  }
  const onEditTeam = (selectedRowData: SetTeamAvailabilityDto) => {
    setIsOpenPopUp(true)
    setIsEditingTeam({
      ...isEditingTeam,
      teamId: {
        ...isEditingTeam.teamId,
        value: selectedRowData.teamId,
      },
      teamName: {
        ...isEditingTeam.teamName,
        value: selectedRowData.teamName,
      },
      teamDesc: {
        ...isEditingTeam.teamDesc,
        value: selectedRowData.teamDesc,
      },
      teamIcon: {
        ...isEditingTeam.teamIcon,
        value: selectedRowData.teamIcon,
      },
      client: {
        ...isEditingTeam.client,
        value: selectedRowData.clientName,
      },
      isEnabled: {
        ...isEditingTeam.isEnabled,
        value: selectedRowData.isEnabled,
      },
      application: {
        ...isEditingTeam.application,

        value: selectedRowData.applications.map((app) => app.applicationName),
      },
    })
  }

  const onEditTeamHandleChange = (property: keyof typeof isEditingTeam, value: any) => {
    setIsEditingTeam({
      ...isEditingTeam,
      [property]: {
        ...isEditingTeam[property],
        value: value,
      },
    })
  }

  const onUpdateTeam = async () => {
    const [validateData, isValid] = await validateFormData(isEditingTeam)
    setIsEditingTeam(validateData)
    if (isValid) {
      const editTeamParams: UpdateTeamDto = {
        teamId: isEditingTeam.teamId.value,
        teamName: isEditingTeam.teamName.value,
        teamDesc: isEditingTeam.teamDesc.value,
        teamIcon: isEditingTeam.teamIcon.value,
        clientId: clientList.find(
          (client) => client.clientName.toLowerCase() === isEditingTeam.client.value.toLowerCase()
        )!.clientId,
        isEnabled: isEditingTeam.isEnabled.value,
        applications: isEditingTeam.application.value.flatMap((appName) => {
          const key = appList.find(
            (a) => a.applicationName.toLowerCase() === appName.toLowerCase()
          )?.applicationKey

          return key ? [{ applicationKey: key }] : []
        }),
      }
      dispatch(teamActions.updateTeam(editTeamParams))

      setIsOpenPopUp(false)

      // Clear any previous update alerts
      dispatch(team_alertActions.clearUpdateTeamAlert())
    }
  }

  const onClose = () => {
    setIsOpenPopUp(false)
    // Reset editing banner to initial state
    setIsEditingTeam(INITIAL_UPDATE_TEAM_STATE)
  }

  //Clear all the field after submit
  const clearFormFields = () => {
    setTeamFilterFormData(INITIAL_FILTER_STATE)
  }

  const closeTeamCreateAlert = () => {
    dispatch(team_alertActions.clearPostTeamAlert())
  }

  const closeTeamUpdateAlert = () => {
    dispatch(team_alertActions.clearUpdateTeamAlert())
  }

  const getAllTeamList = () => {
    const params: TeamListQueryParamsDto = {
      getAllAppTeams: true,
      getDisabledTeams: true,
    }
    dispatch(teamActions.getTeamList(params))
  }

  const getAllClientList = () => {
    const params: ClientListQueryParamsDto = {
      getTeams: true,
      getDisabledClients: false,
    }
    dispatch(clientActions.getClientList(params))
  }

  const getAllAppList = () => {
    dispatch(applicationActions.getAppList())
  }

  React.useEffect(() => {
    getAllTeamList()
    getAllClientList()
    getAllAppList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <React.Fragment>
      <AppLayout breadcrumb={BREAD_CRUMB.TEAM_MANAGEMENT}>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <p
            style={{
              paddingBottom: 7,
              margin: 0,
              fontWeight: 400,
              fontSize: '24px',
            }}
          >
            Team Management
          </p>
        </Box>
        <Divider className="dividerStyle" />
        <Grid container spacing={2} mt={2}>
          <Grid size={{ xs: 12, sm: 12, md: 3 }} className="sectionTitleHolder">
            <h3>Create New Team</h3>
            <p>Add new teams to the application can be done by using this section.</p>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 9 }} mb={2}>
            {teamCreateAlert.message && (
              <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
                <Alert onClose={closeTeamCreateAlert} severity={teamCreateAlert.severity}>
                  {teamCreateAlert.message}
                </Alert>
              </div>
            )}
            <TeamCreateForm
              appList={allAppList}
              clientList={clientList}
              iconList={iconList}
              onFilterHandleChange={onFilterHandleChange}
              teamFilterFormData={teamFilterFormData}
              onCreateTeam={onCreateTeam}
              onFieldBlur={handleFieldBlur}
            />
          </Grid>
        </Grid>

        <Divider className="dividerStyle" />
        <Grid container spacing={2} mt={2} mb={3}>
          <Grid size={{ md: 3 }} className="sectionTitleHolder">
            <h3>Manage Teams</h3>
            <p>Edit & Deactivate existing team can be done by using this section.</p> <br />
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              color="primary"
              placeholder="Search Teams"
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
            {teamUpdateAlert.message && (
              <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
                <Alert onClose={closeTeamUpdateAlert} severity={teamUpdateAlert.severity}>
                  {teamUpdateAlert.message}
                </Alert>
              </div>
            )}

            <TeamTableView
              teamList={
                filteredTeamList.length > 0 || searchFilter ? filteredTeamList : filterTeamRow || []
              }
              onEditTeam={onEditTeam}
              page={page}
              rowsPerPage={rowsPerPage}
              handleEnableDisable={handleEnableDisable}
            >
              <AppTablePagination
                data={
                  filteredTeamList.length > 0 || searchFilter
                    ? filteredTeamList
                    : filterTeamRow || []
                }
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TeamTableView>
          </Grid>
        </Grid>
        <Divider className="dividerStyle" />
        <TeamEditPopup
          clientList={clientList}
          onEditTeamHandleChange={onEditTeamHandleChange}
          IsEdingTeam={isEditingTeam}
          onUpdateTeam={onUpdateTeam}
          onClose={onClose}
          isOpen={isOpenPopUp}
          appList={appList}
          iconList={iconList}
        />

        <TeamStatusChangePopup
          isOpen={isStatusPopUpOpen}
          onClose={handleStatusOnClose}
          isStatusChangeRow={isStateTeamChangeRow}
          teamStatusChange={teamStatusChange}
          teamStatusChangeClick={teamStatusChangeClick}
        />
      </AppLayout>
    </React.Fragment>
  )
}

export default TeamManagement
