import React, { useEffect, useState } from 'react'
import { AppLayout } from '../../templates'
import { APP_TABLE_CONFIGS, BREAD_CRUMB } from '../../utilities/constants'
import { Alert, Box, Divider, Grid, InputAdornment, TextField } from '@mui/material'
import {
  AppTablePagination,
  ClientCreateForm,
  ClientEditPopUp,
  ClientStatusChangePopUp,
  ClientTableView,
} from '../../components'
import type {
  AppStateDto,
  ClientDto,
  ClientFilterFormDto,
  ClientListQueryParamsDto,
  ClientUpdateFormDto,
  CreateClientDto,
  SetSbuDto,
  SubListQueryParamsDto,
  UpdateClientDto,
} from '../../utilities/models'
import { validateFormData } from '../../utilities/helpers'
import { useDispatch, useSelector } from 'react-redux'
import { alertActions, clientActions, sbuActions } from '../../redux/actions'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

const ClientManagement: React.FC = () => {
  const CLIENT_INITIAL_FORM_STATE: ClientFilterFormDto = {
    clientName: {
      value: '',
      validator: 'text',
      isRequired: true,
      error: null,
    },
    clientDesc: {
      value: '',
      validator: 'text',
      isRequired: false,
      error: null,
    },
    sbuId: {
      value: null,
      validator: 'number',
      isRequired: true,
      error: null,
    },
  }

  const INITIAL_UPDATE_CLIENT_STATE: ClientUpdateFormDto = {
    clientId: {
      value: -1,
      isRequired: true,
      error: null,
    },
    clientName: {
      value: '',
      validator: 'text',
      isRequired: true,
      error: null,
    },
    clientDesc: {
      value: '',
      validator: 'text',
      isRequired: false,
      error: null,
    },
    sbuId: {
      value: null,
      validator: 'number',
      isRequired: true,
      error: null,
    },
    isEnabled: {
      value: false,
      isRequired: false,
      error: null,
    },
  }

  const INITIAL_CLIENT_STATUS_UPDATE_STATE = {
    clientStatus: {
      value: {} as UpdateClientDto,
    },
  }

  const dispatch = useDispatch()
  const clientCreateAlert = useSelector((state: AppStateDto) => state.alert.postClient)
  const clientUpdateAlert = useSelector((state: AppStateDto) => state.alert.updateClient)
  const sbuTableData = useSelector((state: AppStateDto) => state.sbu.getAllSbuList.data)
  const clientTableData = useSelector((state: AppStateDto) => state.client.getClientList.data)
  const clientCreateState = useSelector((state: AppStateDto) => state.client.postClient)
  const clientUpdateState = useSelector((state: AppStateDto) => state.client.updateClient)
  const clientTableDataIsLoading = useSelector(
    (state: AppStateDto) => state.client.getClientList.isLoading
  )

  const [clientFormData, setClientFormData] =
    useState<ClientFilterFormDto>(CLIENT_INITIAL_FORM_STATE)
  const [sbuList, setSbuList] = useState<SetSbuDto[]>([])
  const [clientRowData, setClientRowData] = useState<ClientDto[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(APP_TABLE_CONFIGS.DEFAULT_ROWS_PER_PAGE)
  const [filterClientList, setFilterClientList] = useState<ClientDto[]>([])
  const [searchInput, setSearchInput] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenStatusPopUp, setIsOpenStatusPopUp] = useState(false)
  const [initialUpdateClientData, setInitialUpdateClientData] = useState(
    INITIAL_UPDATE_CLIENT_STATE
  )
  const [initialClientStatusUpdate, setInitialClientStatusUpdate] = useState(
    INITIAL_CLIENT_STATUS_UPDATE_STATE
  )

  useEffect(() => {
    if (clientCreateAlert.serverity === 'error' || clientCreateAlert.serverity === 'success') {
      setClientFormData(CLIENT_INITIAL_FORM_STATE)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientCreateAlert])

  useEffect(() => {
    getAllSbuList()
    getAllClientList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setSbuList(sbuTableData?.data || [])
  }, [sbuTableData])

  useEffect(() => {
    setClientRowData(clientTableData?.data || [])
  }, [clientTableData])

  useEffect(() => {
    const trimmedFilter = searchInput.trim().toLowerCase()

    if (!trimmedFilter) {
      return setFilterClientList([])
    }
    const filtered = clientRowData?.filter((client: ClientDto) => {
      const statusText = client.isEnabled ? 'enabled' : 'disabled'
      return (
        statusText.includes(trimmedFilter) ||
        client.clientDesc?.trim().toLowerCase().includes(trimmedFilter) ||
        client.clientName?.trim().toLowerCase().includes(trimmedFilter) ||
        client.sbuName?.trim().toLowerCase().includes(trimmedFilter)
      )
    })
    setFilterClientList(filtered)
    setPage(0)
  }, [searchInput, clientRowData])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clientFormFilterHandle = (field: keyof ClientFilterFormDto, value: any) => {
    setClientFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value,
        error: null,
      },
    }))
  }

  const clientInputFocusHandle = (field: keyof ClientFilterFormDto) => {
    setClientFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        error: null,
      },
    }))
  }

  const onCreateClient = async () => {
    const [validatedData, isValid] = await validateFormData(clientFormData)
    setClientFormData(validatedData)

    if (isValid) {
      const filterFormData: CreateClientDto = {
        clientName: validatedData.clientName.value.trim(),
        clientDesc: validatedData.clientDesc.value
          ? validatedData.clientDesc.value.trim()
          : undefined,
        sbuId: validatedData.sbuId.value as number,
      }
      dispatch(clientActions.postClient(filterFormData))
    }
  }

  const onPostClientCloseAlert = () => {
    dispatch(alertActions.clearPostClientAlert())
  }

  const clearFormFields = () => {
    setClientFormData(CLIENT_INITIAL_FORM_STATE)
  }

  const getAllSbuList = () => {
    const params: SubListQueryParamsDto = {
      getDisabled: false,
      getAll: true,
    }
    dispatch(sbuActions.getAllSbuList(params))
  }

  const getAllClientList = () => {
    const params: ClientListQueryParamsDto = {
      getDisabledClients: true,
    }
    dispatch(clientActions.getClientList(params))
  }

  // pagination
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  // pagination
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value)
  }

  const clientEditTrigger = (row: ClientDto) => {
    setIsOpen(true)
    setInitialUpdateClientData({
      ...initialUpdateClientData,
      clientId: {
        ...initialUpdateClientData.clientId,
        value: row.clientId,
      },
      clientName: {
        ...initialUpdateClientData.clientName,
        value: row.clientName,
      },
      clientDesc: {
        ...initialUpdateClientData.clientDesc,
        value: row.clientDesc || '',
      },
      sbuId: {
        ...initialUpdateClientData.sbuId,
        value: row.sbuId || null,
      },
    })
  }

  const onClose = () => {
    setIsOpen(false)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onEditClientHandleChange = (field: keyof typeof initialUpdateClientData, value: any) => {
    setInitialUpdateClientData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value,
        error: null,
      },
    }))
  }

  const onUpdateClient = async () => {
    const [validatedData, isValid] = await validateFormData(initialUpdateClientData)
    setInitialUpdateClientData(validatedData)
    if (isValid) {
      const updateClientParams: UpdateClientDto = {
        clientId: initialUpdateClientData.clientId.value,
        clientName: initialUpdateClientData.clientName.value.trim(),
        clientDesc: initialUpdateClientData.clientDesc.value
          ? initialUpdateClientData.clientDesc.value.trim()
          : undefined,
        sbuId: initialUpdateClientData.sbuId.value as number,
      }
      dispatch(clientActions.updateClient(updateClientParams))
      setIsOpen(false)
    }
  }

  const onUpdateClientCloseAlert = () => {
    dispatch(alertActions.clearUpdateClientAlert())
  }

  const clientStatusChangeTrigger = (row: ClientDto) => {
    setIsOpenStatusPopUp(true)
    setInitialClientStatusUpdate({
      ...initialClientStatusUpdate,
      clientStatus: {
        value: {
          clientId: row.clientId,
          clientName: row.clientName,
          clientDesc: row.clientDesc,
          sbuId: row.sbuId || 0,
          isEnabled: row.isEnabled,
        },
      },
    })
  }

  const onStatusUpdate = () => {
    const statusChangeParams: UpdateClientDto = {
      clientId: initialClientStatusUpdate.clientStatus.value.clientId,
      clientName: initialClientStatusUpdate.clientStatus.value.clientName,
      clientDesc: initialClientStatusUpdate.clientStatus.value.clientDesc,
      sbuId: initialClientStatusUpdate.clientStatus.value.sbuId,
      isEnabled: !initialClientStatusUpdate.clientStatus.value.isEnabled,
    }
    dispatch(clientActions.updateClient(statusChangeParams))
    setIsOpenStatusPopUp(false)
  }

  const onCloseStatusPopUp = () => {
    setIsOpenStatusPopUp(false)
  }

  return (
    <React.Fragment>
      <AppLayout breadcrumb={BREAD_CRUMB.CLIENT_MANAGEMENT}>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <p
            style={{
              paddingBottom: 7,
              margin: 0,
              fontWeight: 400,
              fontSize: '24px',
            }}
          >
            Client Management
          </p>
        </Box>
        <Divider className="dividerStyle" />
        <Grid container spacing={2} mt={2} mb={2}>
          <Grid size={{ xs: 12, sm: 12, md: 3 }} className="sectionTitleHolder">
            <h3>Create New Client</h3>
            <p>Add new clients to the application can be done by using this section.</p>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 9 }}>
            {clientCreateAlert.message && (
              <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
                <Alert onClose={onPostClientCloseAlert} severity={clientCreateAlert.serverity}>
                  {clientCreateAlert.message}
                </Alert>
              </div>
            )}
            <ClientCreateForm
              clientFormData={clientFormData}
              clientFormFilterHandle={clientFormFilterHandle}
              onCreateClient={onCreateClient}
              onClearFormFields={clearFormFields}
              clientInputFocusHandle={clientInputFocusHandle}
              sbuList={sbuList}
              isProcessing={clientCreateState.isLoading}
            />
          </Grid>
        </Grid>
        <Divider className="dividerStyle" />
        <Grid container spacing={2} mt={2}>
          <Grid size={{ xs: 12, sm: 12, md: 3 }} className="sectionTitleHolder">
            <h3>Manage Clients</h3>
            <p>Edit & Deactivate existing clients can be done using this section.</p>
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              color="primary"
              placeholder="Search Client"
              value={searchInput}
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
            {clientUpdateAlert.message && (
              <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
                <Alert onClose={onUpdateClientCloseAlert} severity={clientUpdateAlert.serverity}>
                  {clientUpdateAlert.message}
                </Alert>
              </div>
            )}
            <ClientTableView
              clientTableData={
                filterClientList.length > 0 || searchInput ? filterClientList : clientRowData
              }
              page={page}
              rowsPerPage={rowsPerPage}
              clientEditTrigger={clientEditTrigger}
              clientStatusChangeTrigger={clientStatusChangeTrigger}
              clientTableDataIsLoading={clientTableDataIsLoading}
            >
              <AppTablePagination
                data={filterClientList.length > 0 || searchInput ? filterClientList : clientRowData}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </ClientTableView>
          </Grid>
        </Grid>
        <ClientEditPopUp
          isOpen={isOpen}
          onClose={onClose}
          initialUpdateClientData={initialUpdateClientData}
          onUpdateClient={onUpdateClient}
          onEditClientHandleChange={onEditClientHandleChange}
          sbuList={sbuList}
          isProcessing={clientUpdateState.isLoading}
        />
        <ClientStatusChangePopUp
          isOpen={isOpenStatusPopUp}
          onClose={onCloseStatusPopUp}
          onStatusUpdate={onStatusUpdate}
          initialClientStatusUpdate={initialClientStatusUpdate}
        />
      </AppLayout>
    </React.Fragment>
  )
}

export default ClientManagement
