/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { Alert, Box, Button, Divider, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../templates/AppLayout/AppLayout'
import { APP_ROUTES, BREAD_CRUMB } from '../../utilities/constants'
import { alertActions, applicationActions, userActions } from '../../redux/actions'
import ManageUsersTable from '../../components/User/ManageUser/ManageUserTable'
import CreateUserDialog from '../../components/User/CreateUser/CreateUser'
import type {
  AppStateDto,
  CreateUserDto,
  ApplicationDto,
  DesignationDto,
  UserDto,
  UserListQueryParamsDto,
  UpdateUserStatusDto,
  ApplicationUserRelDto,
} from '../../utilities/models'
import { validateFormData } from '../../utilities/helpers/FormValidator'
import { AppTablePagination } from '../../components'

const initialForm = {
  email: '',
  firstName: '',
  lastName: '',
  empNo: '',
  designation: null as number | null,
  dateOfBirth: null as string | null,
  joinDate: null as string | null,
  application: [] as string[],
  isExternalUser: false,
}

const UserManagement: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userCreateAlert = useSelector((state: AppStateDto) => state.alert.postUserAlert)
  const userListState = useSelector((state: AppStateDto) => state.user.getUserList)
  const createUserState = useSelector((state: AppStateDto) => state.user.createUser)
  const designationList = useSelector((state: AppStateDto) => state.user.getUserDesignations.data)
  const alertState = useSelector((state: AppStateDto) => state.alert)
  const applicationList = useSelector((state: AppStateDto) => state.application.getAppList.data)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [applications, setApplications] = useState<ApplicationDto[]>([])
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [errorMessage, setErrorMessage] = useState('')
  const [filterVisible, setFilterVisible] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [filters, setFilters] = useState({
    empNo: '',
    name: '',
    designation: '',
    application: '',
    type: '',
    status: '',
  })

  const getFormValidationConfig = () => ({
    email: {
      value: form.email,
      validator: 'email',
      isRequired: true,
    },
    firstName: {
      value: form.firstName,
      validator: 'text',
      isRequired: true,
    },
    lastName: {
      value: form.lastName,
      validator: 'text',
      isRequired: true,
    },
    empNo: {
      value: form.empNo,
      validator: 'text',
      isRequired: true,
    },
    designation: {
      value: form.designation,
      validator: 'text',
      isRequired: true,
    },
    dateOfBirth: {
      value: form.dateOfBirth,
      validator: 'date',
      isRequired: true,
    },
    joinDate: {
      value: form.joinDate,
      validator: 'date',
      isRequired: true,
    },
    application: {
      value: form.application,
      validator: 'array',
      isRequired: true,
    },
  })

  const [columns, setColumns] = useState([
    { key: 'empNo', name: 'Emp No', isSelected: true, disabled: true },
    { key: 'fullName', name: 'Name', isSelected: true, disabled: true },
    { key: 'username', name: 'Username', isSelected: true, disabled: true },
    { key: 'designation', name: 'Designation', isSelected: true, disabled: true },
    { key: 'designationEffectiveDate', name: 'Designation Effective Date', isSelected: false },
    { key: 'joinDate', name: 'Join Date', isSelected: false },
    { key: 'confirmationDate', name: 'Confirmation Date', isSelected: false },
    { key: 'birthday', name: 'Date of Birth', isSelected: false },
    { key: 'userApplications', name: 'Authorized Apps', isSelected: false },
    { key: 'status', name: 'Status', isSelected: true, disabled: true },
    { key: 'action', name: 'Action', isSelected: true, disabled: true },
  ])

  const appKeyToId: Record<string, number> = {
    '3a2c0642-1932-44fb-8874-dfc1947b6d4b': 1, // Herms
    '0fd4787f-55a8-40c2-9a39-de37b2ea8239': 2, // Athena
    'b09dee3f-3b60-439e-804b-880bb94acd02': 4, // Hera
    '17ba35b0-3452-4145-8787-c7d6e3ca7ac0': 3, // core
  }

  useEffect(() => {
    dispatch(
      userActions.getUserListRequest({
        getAll: true,
        ignoreApplication: true,
      })
    )
  }, [])

  useEffect(() => {
    const mapped = applicationList?.map((a: any) => ({
      applicationName: a.applicationName,
      applicationKey: a.applicationKey,
      applicationId: appKeyToId[a.applicationKey] ?? null,
    }))

    setApplications(mapped)
  }, [applicationList])

  const resetForm = () => {
    setForm(initialForm)
    setFieldErrors({})
    setErrorMessage('')
  }

  const updateField = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setFieldErrors((prev) => {
      const updated = { ...prev }
      delete updated[field]
      return updated
    })
  }

  const updateFilter = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const onApplyFilter = () => {
    const payload: UserListQueryParamsDto = {
      getAll: true,
      employeeNumber: filters.empNo || '',
      name: filters.name || '',
      designationId: filters.designation || '',
      applicationId: filters.application || '',
      ignoreApplication: filters.application ? false : true,
      isExternal: filters.type === '' ? '' : filters.type === 'true',
      status: filters.status === '' ? '' : filters.status === 'true',
    }
    dispatch(userActions.getUserListRequest(payload))
  }

  const validate = async () => {
    const [validated, isValid] = await validateFormData(getFormValidationConfig())

    // convert to your UI error structure
    const err: Record<string, string> = {}

    Object.entries(validated).forEach(([field, data]: any) => {
      if (data.error) err[field] = data.error
    })

    setFieldErrors(err)
    return isValid
  }

  const handleSubmit = async () => {
    const valid = await validate()
    if (!valid) return
    if (form.joinDate && form.dateOfBirth) {
      if (new Date(form.joinDate) <= new Date(form.dateOfBirth)) {
        setFieldErrors({
          ...fieldErrors,
          joinDate: 'Join Date must be later than Date of Birth',
        })
        return
      }
    }

    const payload: CreateUserDto = {
      username: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      isEnabled: true,
      joinDate: form.joinDate!,
      birthday: form.dateOfBirth!,
      employeeNumber: form.empNo,
      applications: form.application.map((a) => ({ applicationKey: a })),
      designationId: Number(form.designation),
      isExternal: form.isExternalUser,
    }

    dispatch(userActions.createUserRequest(payload))
  }

  useEffect(() => {
    if (!createUserState.success) return
    setOpen(false)
    resetForm()
    dispatch(
      alertActions.setPostUserAlert({
        message: 'User created successfully!',
        severity: 'success',
      })
    )
    dispatch(userActions.clearCreateUserState())
  }, [createUserState.success])

  const allColumnsSelected = columns.every((c) => c.isSelected)
  const handleSelectAllColumns = (checked: boolean) => {
    setColumns(
      columns.map((col) =>
        col.disabled ? { ...col, isSelected: true } : { ...col, isSelected: checked }
      )
    )
  }

  const handleToggleColumn = (key: string) => {
    setColumns(
      columns.map((c) => (c.key === key && !c.disabled ? { ...c, isSelected: !c.isSelected } : c))
    )
  }
  useEffect(() => {
    const error = createUserState.error
    if (!error) return

    if (typeof error === 'string') {
      setErrorMessage(error)
      return
    }

    const response = error?.response
    const data = response?.data

    if (data?.errors && typeof data.errors === 'object') {
      setFieldErrors((prev) => ({
        ...prev,
        ...data.errors,
      }))
      setErrorMessage('')
      return
    }

    const message = data?.message || error?.message || 'Something went wrong.'
    setErrorMessage(message)
    setFieldErrors({})
  }, [createUserState.error])

  const handleUpdateUserStatus = (user: UserDto, newStatus: boolean) => {
    const payload: UpdateUserStatusDto = {
      username: user.username!,
      isEnabled: newStatus,
      applications: user.applications.map((app: ApplicationUserRelDto) => ({
        applicationKey: app.applicationKey,
      })),
    }

    dispatch(userActions.updateUserStatusRequest(payload))
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

  const onHandleCreateUser = () => {
    setOpen(true)
    dispatch(applicationActions.getAppList())
    dispatch(userActions.getUserDesignationsRequest())
  }

  const onHandleEditUser = (user: UserDto) => {
    navigate(APP_ROUTES.EDIT_USER.replace(':username', user.username!))
  }

  return (
    <AppLayout breadcrumb={BREAD_CRUMB.USER_MANAGEMENT}>
      {userCreateAlert?.message && (
        <Alert
          severity={userCreateAlert.severity}
          sx={{ mb: 2 }}
          onClose={() => dispatch(alertActions.clearPostUserAlert())}
        >
          {userCreateAlert.message}
        </Alert>
      )}
      {userCreateAlert?.message && (
        <Alert
          severity={userCreateAlert.severity}
          sx={{ mb: 2 }}
          onClose={() => dispatch(alertActions.clearPostUserAlert())}
        >
          {userCreateAlert.message}
        </Alert>
      )}

      {alertState.updateUserStatusAlert?.message && (
        <Alert
          severity={alertState.updateUserStatusAlert.severity}
          sx={{ mb: 2 }}
          onClose={() => dispatch(alertActions.clearUpdateUserStatusAlert())}
        >
          {alertState.updateUserStatusAlert.message}
        </Alert>
      )}

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography sx={{ fontWeight: 500, fontSize: 24 }}>User Management</Typography>

        <Button variant="contained" onClick={onHandleCreateUser}>
          Create User
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <ManageUsersTable
        users={userListState.data as UserDto[]}
        loading={userListState.isLoading}
        filterVisible={filterVisible}
        onToggleFilter={() => setFilterVisible((p) => !p)}
        columns={columns}
        onToggleColumn={handleToggleColumn}
        allColumnsSelected={allColumnsSelected}
        onSelectAllColumns={handleSelectAllColumns}
        anchorEl={anchorEl}
        onOpenCustomize={setAnchorEl}
        onCloseCustomize={() => setAnchorEl(null)}
        page={page}
        applications={applications}
        designations={designationList}
        rowsPerPage={rowsPerPage}
        filters={filters}
        updateFilter={updateFilter}
        onApplyFilter={onApplyFilter}
        onClearFilter={() => {
          setFilters({
            empNo: '',
            name: '',
            designation: '',
            application: '',
            type: '',
            status: '',
          })

          dispatch(
            userActions.getUserListRequest({
              getAll: true,
              ignoreApplication: true,
            })
          )
        }}
        onUpdateUserStatus={handleUpdateUserStatus}
        onHandleEditUser={onHandleEditUser}
      >
        <AppTablePagination
          data={userListState.data as UserDto[]}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </ManageUsersTable>

      <CreateUserDialog
        open={open}
        onClose={() => {
          setOpen(false)
          resetForm()
        }}
        form={form}
        applications={applications}
        designations={designationList as DesignationDto[]}
        fieldErrors={fieldErrors}
        errorMessage={errorMessage}
        updateField={updateField}
        onSubmit={handleSubmit}
      />
    </AppLayout>
  )
}

export default UserManagement
