import React, { useEffect, useState } from 'react'
import { AppLayout } from '../../templates'
import { APP_TABLE_CONFIGS, BREAD_CRUMB, DATE_FORMAT } from '../../utilities/constants'
import { Alert, Box, Divider, Grid, InputAdornment, TextField } from '@mui/material'
import {
  AddResignationEntryForm,
  AddUserEntryForm,
  AppTablePagination,
  CommentPopUp,
} from '../../components'
import ResignationListTableView from '../../components/resignation-management/ResignationListTableView/ResignationListTableView'
import { useDispatch, useSelector } from 'react-redux'
import type {
  AppStateDto,
  CreateCommentDto,
  postResignationDto,
  initBriefStatusDto,
  initialFilterFormDto,
  initResignationDto,
  initUserDto,
  ResignationListQueryParamsDto,
  StatusListQueryParamsDto,
  UpdateResignationDto,
  UserListQueryParamsDto,
  UserSelectDto,
} from '../../utilities/models'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { alertActions, resignationActions, userActions } from '../../redux/actions'
import { validateFormData } from '../../utilities/helpers'
import moment from 'moment'

const ResignationManagement: React.FC = () => {
  const INITIAL_FILTER_STATE = {
    resignationGivenDate: {
      value: null,
      error: null,
      validator: 'date',
      isRequired: true,
    },
    resignationDate: {
      value: null,
      error: '',
      validator: 'date',
      isRequired: true,
    },
    username: {
      value: {} as initUserDto,
      error: null,
      isRequired: true,
      validator: 'object',
    },
    isEnabled: {
      value: null,
      error: null,
      isRequired: false,
      validator: 'boolean',
    },
    comment: {
      value: '',
      error: null,
      isRequired: false,
      validator: 'text',
    },
  }
  const INITIAL_COMMENT_STATE = {
    comment: {
      value: '',
      error: null,
      validator: 'text',
      isRequired: false,
    },
  }
  const INITIAL_UPDATE_STATE = {
    resignationId: {
      value: -1,
      error: null,
      isRequired: true,
    },
    statusId: {
      value: {} as initBriefStatusDto,
      error: null,
      validator: 'object',
      isRequired: false,
    },
  }
  const dispatch = useDispatch()
  const userList = useSelector((state: AppStateDto) => state.user.getUserList.data)
  const resignationPostAlert = useSelector((state: AppStateDto) => state.alert.postResignation)
  const postCommentAlert = useSelector((state: AppStateDto) => state.alert.postComment)
  const updateResignationAlert = useSelector((state: AppStateDto) => state.alert.updateResignation)
  const resignationList = useSelector(
    (state: AppStateDto) => state.resignation.getResignationList.data?.data
  )
  const getStatusList = useSelector(
    (state: AppStateDto) => state.resignation.getStatusList.data?.data
  )
  const resignationRowDataIsLoading = useSelector(
    (state: AppStateDto) => state.resignation.getResignationList.isLoading
  )
  const isCreating = useSelector(
    (state: AppStateDto) => state.resignation.createResignation.isLoading
  )

  const [usersList, setUsersList] = useState<UserSelectDto[]>([])
  const [resignationfilterFormData, setResignationfilterFormData] = useState(INITIAL_FILTER_STATE)
  const [resignationRowData, setResignationRowData] = useState<initResignationDto[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(APP_TABLE_CONFIGS.DEFAULT_ROWS_PER_PAGE)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedResignation, setSelectedResignation] = useState<initResignationDto | null>(null)
  const [initComment, setInitComment] = useState(INITIAL_COMMENT_STATE)
  const [editingResignationId, setEditingResignationId] = useState<number | null>(null)
  const [statusList, setStatusList] = useState<StatusListQueryParamsDto[]>([])
  const [initialUpdateResignationData, setInitialUpdateResignationData] =
    useState(INITIAL_UPDATE_STATE)
  const [searchText, setSearchText] = useState('')
  const [fileredSerachData, setFileredSerachData] = useState<initResignationDto[]>([])

  useEffect(() => {
    getUserList()
    getResignationListReq()
  }, [])

  useEffect(() => {
    if (resignationfilterFormData.username.value?.name) {
      const params: ResignationListQueryParamsDto = {
        username: resignationfilterFormData.username.value.name,
      }
      dispatch(resignationActions.getResignationList(params))
    }
  }, [resignationfilterFormData.username.value])

  useEffect(() => {
    setUsersList(userList)
  }, [userList])

  useEffect(() => {
    if (
      resignationPostAlert.serverity === 'success' ||
      resignationPostAlert.serverity === 'error'
    ) {
      onClearFormFields()
      dispatch(resignationActions.getResignationList({}))
    }
  }, [resignationPostAlert])

  useEffect(() => {
    setResignationRowData(resignationList)
  }, [resignationList])

  useEffect(() => {
    if (postCommentAlert.serverity === 'success' || postCommentAlert.serverity === 'error') {
      onClearCommentFields()
      dispatch(resignationActions.getResignationList({}))
    }
  }, [postCommentAlert])

  useEffect(() => {
    if (
      updateResignationAlert.serverity === 'success' ||
      updateResignationAlert.serverity === 'error'
    ) {
      dispatch(resignationActions.getResignationList({}))
    }
  }, [updateResignationAlert])

  useEffect(() => {
    if (getStatusList) {
      setStatusList(getStatusList)
    }
  }, [getStatusList])

  useEffect(() => {
    const typedText = searchText.trim().toLowerCase()

    if (!typedText) {
      return setFileredSerachData([])
    }
    const filtered = resignationRowData?.filter((resignation: initResignationDto) => {
      const fullName = resignation.firstName.concat(' ', resignation.lastName)
      const allComments = (resignation.comments || [])
        .map((c) => c.comment)
        .join(' ')
        .toLowerCase()

      return (
        resignation.employeeNumber.toLowerCase().includes(typedText) ||
        fullName.toLowerCase().includes(typedText) ||
        resignation.resignationGivenDate.toString().includes(typedText) ||
        resignation.resignationDate.toString().includes(typedText) ||
        allComments?.includes(typedText) ||
        resignation.statusName?.toLowerCase().includes(typedText)
      )
    })
    setFileredSerachData(filtered)
    setPage(0)
  }, [searchText, resignationRowData])

  const getUserList = () => {
    const params: UserListQueryParamsDto = {
      ignoreApplication: true,
      getAll: true,
      status: true,
    }
    dispatch(userActions.getUserListRequest(params))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filterFormHandleChange = (field: keyof initialFilterFormDto, value: any) => {
    setResignationfilterFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value,
        error: null,
      },
    }))
  }

  const onCreateresignation = async () => {
    if (
      resignationfilterFormData.resignationGivenDate.value &&
      resignationfilterFormData.resignationDate.value &&
      moment(resignationfilterFormData.resignationDate.value).isBefore(
        moment(resignationfilterFormData.resignationGivenDate.value),
        'day'
      )
    ) {
      setResignationfilterFormData({
        ...resignationfilterFormData,
        resignationDate: {
          ...resignationfilterFormData.resignationDate,
          error: 'End date cannot be earlier than Resignation Given date',
        },
      })
      return
    }
    const [validatedData, isValid] = await validateFormData(resignationfilterFormData)
    setResignationfilterFormData(validatedData)
    if (isValid) {
      const resignationFormParams: postResignationDto = {
        resignationGivenDate: moment(resignationfilterFormData.resignationGivenDate.value).format(
          DATE_FORMAT
        ),
        resignationDate: moment(resignationfilterFormData.resignationDate.value).format(
          DATE_FORMAT
        ),
        username: resignationfilterFormData.username.value.name,
        comment: resignationfilterFormData.comment.value,
        isEnabled: true,
      }
      dispatch(resignationActions.createResignation(resignationFormParams))
    }
  }
  const onClearFormFields = () => {
    setResignationfilterFormData(INITIAL_FILTER_STATE)
  }
  const closeResignationPostAlert = () => {
    dispatch(alertActions.clearPostResignationAlert())
  }

  const getResignationListReq = () => {
    const resignationList: ResignationListQueryParamsDto = {}
    dispatch(resignationActions.getResignationList(resignationList))
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
  const onCommentHandle = (row: initResignationDto) => {
    setSelectedResignation(row)
    setIsOpen(true)
    const commentParams: ResignationListQueryParamsDto = {
      userId: row.userId,
    }
    dispatch(resignationActions.getResignationList(commentParams))
  }
  const onCommentPopUpClose = () => {
    setIsOpen(false)
  }
  const onClearCommentFields = () => {
    setInitComment(INITIAL_COMMENT_STATE)
  }
  const onCommentHandleChange = (value: string) => {
    setInitComment((prev) => ({
      ...prev,
      comment: {
        ...prev.comment,
        value,
        error: null,
      },
    }))
  }
  const onAddComment = async () => {
    const [validatedData, isValid] = await validateFormData(initComment)
    setInitComment(validatedData)
    if (isValid && selectedResignation) {
      const commentParams: CreateCommentDto = {
        resignationId: selectedResignation.resignationId,
        comment: initComment.comment.value,
      }
      dispatch(resignationActions.createComment(commentParams))
      setIsOpen(false)
    }
  }
  const onPostCommentAlertClose = () => {
    dispatch(alertActions.clearPostCommentAlert())
  }
  const onStatusChangeTrigger = (row: initResignationDto) => {
    setEditingResignationId(row.resignationId)
    setInitialUpdateResignationData({
      ...initialUpdateResignationData,
      resignationId: {
        ...initialUpdateResignationData.resignationId,
        value: row.resignationId,
      },
      statusId: {
        ...initialUpdateResignationData.statusId,
        value: {
          id: row.statusId,
          name: row.statusName,
        },
      },
    })
    const statusListParams: StatusListQueryParamsDto = {}
    dispatch(resignationActions.getStatusList(statusListParams))
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onUpdateHandleChange = (field: keyof typeof initialUpdateResignationData, value: any) => {
    setInitialUpdateResignationData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value: value,
        error: null,
      },
    }))
  }
  const onUpdateTrigger = () => {
    const updateparams: UpdateResignationDto = {
      resignationId: initialUpdateResignationData.resignationId.value,
      statusId: initialUpdateResignationData.statusId.value.id,
    }
    dispatch(resignationActions.updateResignation(updateparams))
    setEditingResignationId(null)
  }
  const onCloseSelection = () => {
    setEditingResignationId(null)
  }
  const onUpdateResignationAlertClose = () => {
    dispatch(alertActions.clearUpdateResignationAlert())
  }
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
  }
  return (
    <React.Fragment>
      <AppLayout breadcrumb={BREAD_CRUMB.RESIGNATION_MANAGEMENT}>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <p
            style={{
              paddingBottom: 7,
              margin: 0,
              fontWeight: 400,
              fontSize: '24px',
            }}
          >
            Resignation Management
          </p>
        </Box>
        <Divider className="dividerStyle" />
        <Grid container spacing={2} mt={2}>
          <Grid size={{ xs: 12, sm: 12, md: 3 }} className="sectionTitleHolder">
            <h3>Select User</h3>
            <p>
              Select user can be done by using <br />
              this section.
            </p>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 7 }}>
            <AddUserEntryForm
              userList={usersList}
              resignationfilterFormData={resignationfilterFormData}
              filterFormHandleChange={filterFormHandleChange}
            />
          </Grid>
        </Grid>
        <Divider className="dividerStyle" />
        <Grid container spacing={2} mt={4}>
          <Grid size={{ xs: 12, sm: 12, md: 3 }} className="sectionTitleHolder">
            <h3>Add Resignation</h3>
            <p>Add new resignations to the application can be done by using this section.</p>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 7 }}>
            {resignationPostAlert.message && (
              <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
                <Alert onClose={closeResignationPostAlert} severity={resignationPostAlert.severity}>
                  {resignationPostAlert.message}
                </Alert>
              </div>
            )}
            <AddResignationEntryForm
              resignationfilterFormData={resignationfilterFormData}
              filterFormHandleChange={filterFormHandleChange}
              onCreateresignation={onCreateresignation}
              onClearFormFields={onClearFormFields}
              isCreating={isCreating}
              isMainGrid={true}
            />
          </Grid>
        </Grid>
        <Divider className="dividerStyle" />
        <Grid container spacing={2} mt={2}>
          <Grid size={{ xs: 12, sm: 12, md: 3 }} className="sectionTitleHolder">
            <h3>Manage Resignations</h3>
            <p>
              View all resignations,update status or add a comment can be done using this section.
            </p>
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              color="primary"
              placeholder="Search Resignation"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearchChange}
              value={searchText}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 9 }}>
            {postCommentAlert.message && (
              <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
                <Alert onClose={onPostCommentAlertClose} severity={postCommentAlert.severity}>
                  {postCommentAlert.message}
                </Alert>
              </div>
            )}
            {updateResignationAlert.message && (
              <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
                <Alert
                  onClose={onUpdateResignationAlertClose}
                  severity={updateResignationAlert.severity}
                >
                  {updateResignationAlert.message}
                </Alert>
              </div>
            )}
            <ResignationListTableView
              resignationRowData={
                (fileredSerachData?.length > 0 || searchText
                  ? fileredSerachData
                  : resignationRowData) || []
              }
              page={page}
              rowsPerPage={rowsPerPage}
              onCommentHandle={onCommentHandle}
              onStatusChangeTrigger={onStatusChangeTrigger}
              editingResignationId={editingResignationId}
              statusList={statusList}
              onCloseSelection={onCloseSelection}
              onUpdateHandleChange={onUpdateHandleChange}
              onUpdateTrigger={onUpdateTrigger}
              initialUpdateData={initialUpdateResignationData}
              resignationRowDataIsLoading={resignationRowDataIsLoading}
            >
              <AppTablePagination
                data={
                  (fileredSerachData?.length > 0 || searchText
                    ? fileredSerachData
                    : resignationRowData) || []
                }
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </ResignationListTableView>
          </Grid>
          <CommentPopUp
            isOpen={isOpen}
            onClose={onCommentPopUpClose}
            comments={selectedResignation?.comments || []}
            onCommentHandleChange={onCommentHandleChange}
            onAddComment={onAddComment}
            initCommentValue={initComment.comment.value}
          />
        </Grid>
      </AppLayout>
    </React.Fragment>
  )
}

export default ResignationManagement
