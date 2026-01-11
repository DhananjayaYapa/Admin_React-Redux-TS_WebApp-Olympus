import React, { useEffect, useState } from 'react'
import { AppLayout } from '../../templates'
import { APP_TABLE_CONFIGS, BREAD_CRUMB } from '../../utilities/constants'
import { Alert, Box, Divider, Grid, InputAdornment, TextField } from '@mui/material'
import {
  AppTablePagination,
  SbuCreateForm,
  SbuEditPopUp,
  SbuStatusChangePopUp,
  SbuTableView,
} from '../../components'
import type {
  AppStateDto,
  CreateSbuDto,
  SbuFilterFormDto,
  SetSbuDto,
  SubListQueryParamsDto,
  UpdateSbuDto,
} from '../../utilities/models'
import { validateFormData } from '../../utilities/helpers'
import { useDispatch, useSelector } from 'react-redux'
import { alertActions, sbuActions } from '../../redux/actions'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

const SBUManagement: React.FC = () => {
  const SBU_INITIAL_FORM_STATE = {
    sbuName: {
      value: '',
      validator: 'text',
      isRequired: true,
      error: null,
    },
    sbuDesc: {
      value: '',
      validator: 'text',
      isRequired: false,
      error: null,
    },
  }

  const INITIAL_UPDATE_SBU_STATE = {
    sbuId: {
      value: -1,
      isRequired: true,
      error: null,
    },
    sbuName: {
      value: '',
      validator: 'text',
      isRequired: false,
      error: null,
    },
    sbuDesc: {
      value: '',
      validator: 'text',
      isRequired: false,
      error: null,
    },
    isEnabled: {
      value: false,
      isRequired: false,
      error: null,
    },
  }

  const INITIAL_SBU_STATUS_UPADTE_STATE = {
    sbuStatus: {
      value: {} as UpdateSbuDto,
    },
  }

  const dispatch = useDispatch()
  const sbuCreateAlert = useSelector((state: AppStateDto) => state.alert.postSbu)
  const sbuUpdateAlert = useSelector((state: AppStateDto) => state.alert.updateSbu)
  const sbuTableData = useSelector((state: AppStateDto) => state.sbu.getAllSbuList.data)
  const sbuTableDataIsloding = useSelector(
    (state: AppStateDto) => state.sbu.getAllSbuList.isLoading
  )
  const isCreatingSbu = useSelector((state: AppStateDto) => state.sbu.postSbu.isLoading)

  const [sbuFormData, setSbuFormData] = useState<SbuFilterFormDto>(SBU_INITIAL_FORM_STATE)
  const [sbuRowData, setSbuRowData] = useState<SetSbuDto[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(APP_TABLE_CONFIGS.DEFAULT_ROWS_PER_PAGE)
  const [filterSbuList, setFilterSbuList] = useState<SetSbuDto[]>([])
  const [searchInput, setSearchInput] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenStatusPopUp, setIsOpenStatusPopUp] = useState(false)
  const [initialUpdateSbuData, setInitialUpdateSbuData] = useState(INITIAL_UPDATE_SBU_STATE)
  const [initialSbuStatusUpdate, setInitialSbuStatusUpdate] = useState(
    INITIAL_SBU_STATUS_UPADTE_STATE
  )

  useEffect(() => {
    if (sbuCreateAlert.serverity === 'error' || sbuCreateAlert.serverity === 'success') {
      setSbuFormData(SBU_INITIAL_FORM_STATE)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sbuCreateAlert])

  useEffect(() => {
    getAllsbuList()
  }, [])
  useEffect(() => {
    setSbuRowData(sbuTableData?.data || [])
  }, [sbuTableData])

  useEffect(() => {
    const trimmedFilter = searchInput.trim().toLowerCase()

    if (!trimmedFilter) {
      return setFilterSbuList([])
    }
    const filtered = sbuRowData?.filter((sbu: SetSbuDto) => {
      const statusText = sbu.isEnabled ? 'enabled' : 'disabled'
      return (
        statusText.includes(trimmedFilter) ||
        sbu.sbuDesc?.trim().toLowerCase().includes(trimmedFilter) ||
        sbu.sbuName?.trim().toLowerCase().includes(trimmedFilter)
      )
    })
    setFilterSbuList(filtered)
    setPage(0)
  }, [searchInput, sbuRowData])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sbuFormFilterHandle = (field: keyof SbuFilterFormDto, value: any) => {
    setSbuFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value,
        error: null,
      },
    }))
  }
  const sbuInputFocusHandle = (field: keyof SbuFilterFormDto) => {
    setSbuFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        error: null,
      },
    }))
  }
  const onCreateSbu = async () => {
    const [validatedData, isValid] = await validateFormData(sbuFormData)
    setSbuFormData(validatedData)

    if (isValid) {
      const filterFormData: CreateSbuDto = {
        sbuName: validatedData.sbuName.value,
        sbuDesc: validatedData.sbuDesc.value,
      }
      dispatch(sbuActions.postSbu(filterFormData))
    }
  }
  const onPostSbuCloseAlert = () => {
    dispatch(alertActions.clearPostSbuAlert())
  }
  const clearFormFields = () => {
    setSbuFormData(SBU_INITIAL_FORM_STATE)
  }

  const getAllsbuList = () => {
    const params: SubListQueryParamsDto = {
      getDisabled: true,
      getAll: true,
    }
    dispatch(sbuActions.getAllSbuList(params))
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

  const sbuEditTrigger = (row: SetSbuDto) => {
    setIsOpen(true)
    setInitialUpdateSbuData({
      ...initialUpdateSbuData,
      sbuId: {
        ...initialUpdateSbuData.sbuId,
        value: row.sbuId,
      },
      sbuName: {
        ...initialUpdateSbuData.sbuName,
        value: row.sbuName,
      },
      sbuDesc: {
        ...initialUpdateSbuData.sbuDesc,
        value: row.sbuDesc || '',
      },
    })
  }
  const onClose = () => {
    setIsOpen(false)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onEditSbuHandleChange = (field: keyof typeof initialUpdateSbuData, value: any) => {
    setInitialUpdateSbuData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value,
        error: null,
      },
    }))
  }

  const onUpdateSbu = async () => {
    const [validatedData, isValid] = await validateFormData(initialUpdateSbuData)
    setInitialUpdateSbuData(validatedData)
    if (isValid) {
      const updateSbuParams: UpdateSbuDto = {
        sbuId: initialUpdateSbuData.sbuId.value,
        sbuName: initialUpdateSbuData.sbuName.value,
        sbuDesc: initialUpdateSbuData.sbuDesc.value,
      }
      dispatch(sbuActions.updateSbu(updateSbuParams))
      setIsOpen(false)
    }
  }

  const onUpdateSbuCloseAlert = () => {
    dispatch(alertActions.clearUpdateSbuAlert())
  }
  const sbuStatusChangeTrigger = (row: SetSbuDto) => {
    setIsOpenStatusPopUp(true)
    setInitialSbuStatusUpdate({
      ...initialSbuStatusUpdate,
      sbuStatus: {
        value: {
          sbuId: row.sbuId,
          sbuName: row.sbuName,
          sbuDesc: row.sbuDesc,
          isEnabled: row.isEnabled,
        },
      },
    })
  }
  const onStatusUpdate = () => {
    const statusChangeParams: UpdateSbuDto = {
      sbuId: initialSbuStatusUpdate.sbuStatus.value.sbuId,
      sbuName: initialSbuStatusUpdate.sbuStatus.value.sbuName,
      sbuDesc: initialSbuStatusUpdate.sbuStatus.value.sbuDesc,
      isEnabled: !initialSbuStatusUpdate.sbuStatus.value.isEnabled,
    }
    dispatch(sbuActions.updateSbu(statusChangeParams))
    setIsOpenStatusPopUp(false)
  }
  const onCloseStatusPopUp = () => {
    setIsOpenStatusPopUp(false)
  }
  return (
    <React.Fragment>
      <AppLayout breadcrumb={BREAD_CRUMB.SBU_MANAGEMENT}>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <p
            style={{
              paddingBottom: 7,
              margin: 0,
              fontWeight: 400,
              fontSize: '24px',
            }}
          >
            SBU Management
          </p>
        </Box>
        <Divider className="dividerStyle" />
        <Grid container spacing={2} mt={2} mb={2}>
          <Grid size={{ xs: 12, sm: 12, md: 3 }} className="sectionTitleHolder">
            <h3>Create New SBU</h3>
            <p>Add new SBU to the application can be done by using this section.</p>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 9 }}>
            {sbuCreateAlert.message && (
              <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
                <Alert onClose={onPostSbuCloseAlert} severity={sbuCreateAlert.serverity}>
                  {sbuCreateAlert.message}
                </Alert>
              </div>
            )}
            <SbuCreateForm
              sbuFormData={sbuFormData}
              sbuFormFilterHandle={sbuFormFilterHandle}
              onCreateSbu={onCreateSbu}
              onClearFormFields={clearFormFields}
              sbuInputFocusHandle={sbuInputFocusHandle}
              isCreating={isCreatingSbu}
            />
          </Grid>
        </Grid>
        <Divider className="dividerStyle" />
        <Grid container spacing={2} mt={2}>
          <Grid size={{ xs: 12, sm: 12, md: 3 }} className="sectionTitleHolder">
            <h3>Manage SBUs</h3>
            <p>Edit & Deactivate existing SBUs can be done using this section.</p>
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              color="primary"
              placeholder="Search SBU"
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
            {sbuUpdateAlert.message && (
              <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
                <Alert onClose={onUpdateSbuCloseAlert} severity={sbuUpdateAlert.serverity}>
                  {sbuUpdateAlert.message}
                </Alert>
              </div>
            )}
            <SbuTableView
              sbuTableData={filterSbuList.length > 0 || searchInput ? filterSbuList : sbuRowData}
              page={page}
              rowsPerPage={rowsPerPage}
              sbuEditTrigger={sbuEditTrigger}
              sbuStatusChangeTrigger={sbuStatusChangeTrigger}
              sbuTableDataIsloding={sbuTableDataIsloding}
            >
              <AppTablePagination
                data={filterSbuList.length > 0 || searchInput ? filterSbuList : sbuRowData}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </SbuTableView>
          </Grid>
        </Grid>
        <SbuEditPopUp
          isOpen={isOpen}
          onClose={onClose}
          initialUpdateSbuData={initialUpdateSbuData}
          onUpdateSbu={onUpdateSbu}
          onEditSbuHandleChange={onEditSbuHandleChange}
        />
        <SbuStatusChangePopUp
          isOpen={isOpenStatusPopUp}
          onClose={onCloseStatusPopUp}
          onStatusUpdate={onStatusUpdate}
          initialSbuStatusUpdate={initialSbuStatusUpdate}
        />
      </AppLayout>
    </React.Fragment>
  )
}

export default SBUManagement
