/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { AppLayout } from '../../../templates'
import { Alert, Box, Button, Divider, Grid, Tab, Tabs, Typography } from '@mui/material'
import styles from './EditUser.module.scss'
import {
  AddResignationEntryForm,
  AppTablePagination,
  AssignUserBadge,
  AthenaEntitlements,
  CommentPopUp,
  DashboardEntitlements,
  DemeterEntitlements,
  EditConfirmationDate,
  EditUserDetails,
  EntitlementSummary,
  HeraEntitlements,
  HermesEntitlements,
  LeaveConfiguration,
  ManageBadgeList,
  RemovePopUp,
  UsersDropdown,
} from '../../../components'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import type {
  ApplicationDetailsDto,
  ApplicationUserRelDto,
  AppStateDto,
  CreateCommentDto,
  DesignationDto,
  EditLeaveCountFormDto,
  initBriefStatusDto,
  initialFilterFormDto,
  initResignationDto,
  initUserDto,
  leaveCountDataDto,
  LeaveCountResponseDto,
  LeavesCountUpdateDto,
  LeavesTypesDto,
  postResignationDto,
  SetApplicationRoleFeatureDto,
  setCountedLeaveDto,
  SetUserListBriefDto,
  StatusListQueryParamsDto,
  UpdateResignationDto,
  UpdateUserDto,
  UpdateUserFormDto,
} from '../../../utilities/models'
import {
  alertActions,
  applicationActions,
  badgeActions,
  entitlementsActions,
  leavesActions,
  resignationActions,
  roleActions,
  sbuActions,
  userActions,
} from '../../../redux/actions'
import { validateFormData } from '../../../utilities/helpers'
import moment from 'moment'
import loaderGif from '../../../assets/images/loader.gif'
import {
  APP_TABLE_CONFIGS,
  APPLICATION_IDS,
  DATE_FORMAT,
  LEAVE_TYPE_IDS,
} from '../../../utilities/constants'
import ResignationListTableView from '../../../components/resignation-management/ResignationListTableView/ResignationListTableView'
import type {
  BadgeTableDetailsDto,
  AssignBadgePayload,
} from '../../../utilities/models/badge.model'

const EditUser = () => {
  const INITIAL_UPDATE_USER_DETAILS: UpdateUserFormDto = {
    username: {
      value: '',
      validator: 'text',
      isRequired: true,
      error: null,
    },
    firstName: {
      value: '',
      validator: 'text',
      isRequired: true,
      error: null,
    },
    lastName: {
      value: '',
      validator: 'text',
      isRequired: true,
      error: null,
    },
    isEnabled: {
      value: false,
      isRequired: true,
      error: null,
    },
    applications: {
      value: [],
      validator: 'array',
      isRequired: true,
      error: null,
    },
    joinDate: {
      value: '',
      validator: 'text',
      isRequired: true,
      error: null,
    },
    birthday: {
      value: '',
      validator: 'text',
      isRequired: true,
      error: null,
    },
    employeeNumber: {
      value: '',
      validator: 'text',
      isRequired: true,
      error: null,
    },
    terminationDate: {
      value: '',
      validator: 'text',
      isRequired: false,
      error: null,
    },
    designationId: {
      value: -1,
      isRequired: false,
      error: null,
    },
    designationEffectiveFrom: {
      value: '',
      validator: 'text',
      isRequired: false,
      error: null,
    },
    confirmationDate: {
      value: '',
      validator: 'text',
      isRequired: false,
      error: null,
    },
    isExternal: {
      value: false,
      isRequired: false,
      error: null,
    },
  }
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
  const INITIAL_COMMENT_STATE = {
    comment: {
      value: '',
      error: null,
      validator: 'text',
      isRequired: false,
    },
  }
  const ASSIGN_BADGE_INITIAL_STATE = {
    badgeId: {
      value: null as { id: number; name: string } | null,
      error: null,
      isRequired: true,
    },
  }
  const INITIAL_LEAVE_COUNT_STATE: EditLeaveCountFormDto = {
    annualLeaveCount: {
      value: 0,
      validator: 'leaveCount',
      isRequired: true,
      error: null,
      min: 0,
      max: 14,
      minError: 'Annual Leaves cannot be less than 0',
      maxError: 'Annual Leaves Count cannot be more than 14',
    },
    casualLeaveCount: {
      value: 0,
      validator: 'leaveCount',
      isRequired: true,
      error: null,
      min: 0,
      minError: 'Casual Leaves cannot be less than 0',
    },
  }

  const dispatch = useDispatch()
  const { username } = useParams<{ username: string }>()
  const briefUserList = useSelector((state: AppStateDto) => state.user.getUserBriefList?.data)
  const userDetails = useSelector((state: AppStateDto) => state.user.getUserList?.data)
  const applicationList = useSelector((state: AppStateDto) => state.application.getAppList?.data)
  const designations = useSelector((state: AppStateDto) => state.user.getUserDesignations?.data)
  const updateUserAlert = useSelector((state: AppStateDto) => state.alert.updateUserDetailsAlert)
  const isLoadingUserList = useSelector((state: AppStateDto) => state.user.getUserList?.isLoading)
  const isLoadingDesignations = useSelector(
    (state: AppStateDto) => state.user.getUserDesignations?.isLoading
  )
  const isLoadingApplications = useSelector(
    (state: AppStateDto) => state.application.getAppList?.isLoading
  )
  const isCreating = useSelector(
    (state: AppStateDto) => state.resignation.createResignation.isLoading
  )
  const resignationRowDataIsLoading = useSelector(
    (state: AppStateDto) => state.resignation.getResignationList.isLoading
  )
  const getStatusList = useSelector(
    (state: AppStateDto) => state.resignation.getStatusList.data?.data
  )
  const resignationList = useSelector(
    (state: AppStateDto) => state.resignation.getResignationList.data?.data
  )
  const resignationPostAlert = useSelector((state: AppStateDto) => state.alert.postResignation)
  const postCommentAlert = useSelector((state: AppStateDto) => state.alert.postComment)
  const updateResignationAlert = useSelector((state: AppStateDto) => state.alert.updateResignation)
  const BadgeTableDetails = useSelector(
    (state: AppStateDto) => state.badge.getBadgeList?.data?.data
  )
  const allocationList = useSelector(
    (state: AppStateDto) => state.badge.getAllocationList?.data?.data
  )
  const isLoadingAllocationList = useSelector(
    (state: AppStateDto) => state.badge.getAllocationList?.isLoading
  )
  const assignBadgeAlert = useSelector((state: AppStateDto) => state.alert.postAllocationBadgeAlert)
  const removeBadgeAlert = useSelector((state: AppStateDto) => state.alert.removeBadgeAllocation)
  const leaveData = useSelector((state: AppStateDto) => state.leaves.getAllLeaveCounts.data?.data)
  const countedLeavedata = useSelector(
    (state: AppStateDto) => state.leaves.userLeaveCounts.data?.data
  )
  const leaveDataIsLoading = useSelector(
    (state: AppStateDto) => state.leaves.getAllLeaveCounts.isLoading
  )
  const countedLeaveDataIsLoading = useSelector(
    (state: AppStateDto) => state.leaves.userLeaveCounts.isLoading
  )
  const getUserListLoading = useSelector((state: AppStateDto) => state.user.getUserList.isLoading)
  const userRolesData = useSelector((state: AppStateDto) => state.role.getUserRoles.data)
  const userRolesLoadingMap = useSelector((state: AppStateDto) => state.role.getUserRoles.isLoading)
  // Check if any applicationId is loading (since isLoading is a Record<number, boolean>)
  const userRolesLoading = Object.values(userRolesLoadingMap || {}).some((loading) => loading === true)
  const userEntitlements = useSelector(
    (state: AppStateDto) => state.entitlements.getUserEntitlements.data
  )
  const hierchachyData = useSelector((state: AppStateDto) => state.sbu.getSbuHierarchy.data)
  const entitlementsLoading = useSelector((state: AppStateDto) => state.entitlements.getUserEntitlements.isLoading)
  const hierchachyDataLoading = useSelector((state: AppStateDto) => state.sbu.getSbuHierarchy.isLoading)
  const saveUserEntitlementAlert = useSelector((state: AppStateDto) => state.alert.saveUserEntitlementAlert)

  const [value, setValue] = useState(0)
  const [briefUsers, setBriefUsers] = useState<SetUserListBriefDto[]>([])
  const [selectedUser, setSelectedUser] = useState<{ id: number; name: string } | null>(null)
  const [initialUpdateUserData, setInitialUpdateUserData] = useState<UpdateUserFormDto>(
    INITIAL_UPDATE_USER_DETAILS
  )
  const [applications, setApplications] = useState<ApplicationDetailsDto[]>([])
  const [designationsState, setDesignationsState] = useState<DesignationDto[]>([])
  const [photo, setPhoto] = useState<string | null>(null)
  const [resignationfilterFormData, setResignationfilterFormData] = useState(INITIAL_FILTER_STATE)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(APP_TABLE_CONFIGS.DEFAULT_ROWS_PER_PAGE)
  const [badgeRowsPerPage, setBadgeRowsPerPage] = useState(
    APP_TABLE_CONFIGS.BADGE_DEFAULT_ROWS_PER_PAGE
  )
  const [isOpen, setIsOpen] = useState(false)
  const [selectedResignation, setSelectedResignation] = useState<initResignationDto | null>(null)
  const [editingResignationId, setEditingResignationId] = useState<number | null>(null)
  const [initialUpdateResignationData, setInitialUpdateResignationData] =
    useState(INITIAL_UPDATE_STATE)
  const [statusList, setStatusList] = useState<StatusListQueryParamsDto[]>([])
  const [resignationRowData, setResignationRowData] = useState<initResignationDto[]>([])
  const [initComment, setInitComment] = useState(INITIAL_COMMENT_STATE)
  const [currentUsername, setCurrentUsername] = useState(username)
  const [breadcrumb, setBreadcrumb] = useState([
    {
      id: 2,
      title: `Users / ${username}`,
      path: '',
    },
  ])
  const [badgeList, setBadgeList] = useState<BadgeTableDetailsDto[]>([])
  const [assignBadgeFormData, setAssignBadgeFormData] = useState(ASSIGN_BADGE_INITIAL_STATE)
  const [allocationData, setAllocationData] = useState<BadgeTableDetailsDto[]>([])
  const [isRemovePopUpOpen, setIsRemovePopUpOpen] = useState(false)
  const [selectedBadgeToRemove, setSelectedBadgeToRemove] = useState<BadgeTableDetailsDto | null>(
    null
  )
  // const [userEntitlementsState, setUserEntitlementsState] = useState<setUserEntitlementsDto[]>([])
  const [authorizedApps, setAuthorizedApps] = useState<ApplicationUserRelDto[]>([])
  const [entitlementTabValue, setEntitlementTabValue] = useState(0)
  const [annualLeaveCountData, setAnnualLeaveCountData] = useState<leaveCountDataDto>()
  const [casualLeaveCountData, setCasualLeaveCountData] = useState<leaveCountDataDto>()
  const [countedLeaveDataState, setCountedLeaveDataState] = useState<setCountedLeaveDto[]>([])
  const [isLeaveRecordHas, setIsLeaveRecordHas] = useState(false)
  const [userLeaveCountRecord, setUserLeaveCountRecord] = useState<LeaveCountResponseDto | null>(
    null
  )
  const [leaveCountFormData, setLeaveCountFormData] =
    useState<EditLeaveCountFormDto>(INITIAL_LEAVE_COUNT_STATE)
  const [userRoles, setUserRoles] = useState<SetApplicationRoleFeatureDto | null>(null)
  // Filtered lists state per role for search functionality
  const [filteredSbuLists, setFilteredSbuLists] = useState<{ [roleId: number]: { sbuId: number; sbuName: string }[] }>({})
  const [filteredClientLists, setFilteredClientLists] = useState<{ [roleId: number]: { sbuId: number; sbuName: string; clients: { clientId: number; clientName: string }[] }[] }>({})
  const [filteredProjectLists, setFilteredProjectLists] = useState<{ [roleId: number]: { sbuId: number; sbuName: string; clientId: number; clientName: string; projects: { projectId: number; projectName: string }[] }[] }>({})

  useEffect(() => {
    dispatch(userActions.getUserDesignationsRequest())
    dispatch(applicationActions.getAppList())
    dispatch(
      userActions.getUserBriefList({
        getAll: true,
        ignoreApplication: true,
        getDisabled: false,
      })
    )
    dispatch(
      userActions.getUserListRequest({
        getAll: true,
        ignoreApplication: true,
        username: username,
      })
    )
  }, [])

  useEffect(() => {
    if (briefUserList) {
      setBriefUsers(briefUserList)
      if (username) {
        const user = briefUserList.find((u: SetUserListBriefDto) => u.username === username)
        if (user) {
          setSelectedUser({ id: user.userId, name: user.username })
        }
      }
    }
  }, [briefUserList, username])

  useEffect(() => {
    setInitialData()
  }, [userDetails])

  useEffect(() => {
    setApplications(applicationList || [])
  }, [applicationList])

  useEffect(() => {
    setDesignationsState(designations || [])
  }, [designations])

  useEffect(() => {
    if (userDetails && userDetails.length > 0) {
      setPhoto(userDetails[0]?.photoFilePath || null)
    }
  }, [userDetails])

  useEffect(() => {
    if (getStatusList) {
      setStatusList(getStatusList)
    }
  }, [getStatusList])

  useEffect(() => {
    setResignationRowData(resignationList)
  }, [resignationList])

  useEffect(() => {
    if (
      resignationPostAlert.serverity === 'success' ||
      resignationPostAlert.serverity === 'error'
    ) {
      onClearFormFields()
      dispatch(
        resignationActions.getResignationList({
          username: currentUsername,
        })
      )
    }
  }, [resignationPostAlert])

  useEffect(() => {
    if (postCommentAlert.serverity === 'success' || postCommentAlert.serverity === 'error') {
      onClearCommentFields()
      dispatch(
        resignationActions.getResignationList({
          username: currentUsername,
        })
      )
    }
  }, [postCommentAlert])

  useEffect(() => {
    if (
      updateResignationAlert.serverity === 'success' ||
      updateResignationAlert.serverity === 'error'
    ) {
      dispatch(
        resignationActions.getResignationList({
          username: currentUsername,
        })
      )
    }
  }, [updateResignationAlert])

  useEffect(() => {
    setBadgeList(BadgeTableDetails || [])
  }, [BadgeTableDetails])

  useEffect(() => {
    setAllocationData(allocationList || [])
  }, [allocationList])

  useEffect(() => {
    if (assignBadgeAlert.serverity === 'success' || assignBadgeAlert.serverity === 'error') {
      setAssignBadgeFormData(ASSIGN_BADGE_INITIAL_STATE)
      dispatch(badgeActions.getAllocationList({ username: currentUsername, getDisabled: false }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignBadgeAlert])

  useEffect(() => {
    if (removeBadgeAlert.severity === 'success' || removeBadgeAlert.severity === 'error') {
      dispatch(badgeActions.getAllocationList({ username: currentUsername, getDisabled: false }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeBadgeAlert])

  useEffect(() => {
    // Get authorized applications from user details
    if (userDetails && userDetails.length > 0) {
      const apps = userDetails[0]?.applications || []
      // Filter out Core application from tabs (Core is authorized but should not show as a tab)
      const filteredApps = apps.filter((app: any) => app.applicationId !== APPLICATION_IDS.CORE)
      setAuthorizedApps(filteredApps)
      setEntitlementTabValue(0)
    } else {
      setAuthorizedApps([])
      setEntitlementTabValue(0)
    }
  }, [userDetails])

  // Fetch roles for the first app when authorizedApps is updated and user is on entitlements tab
  useEffect(() => {
    if (value === 1 && authorizedApps.length > 0) {
      const firstApp = authorizedApps[0]
      // Only fetch if not already loaded
      if (
        firstApp &&
        !userRolesData[firstApp.applicationId] &&
        !userRolesLoadingMap[firstApp.applicationId]
      ) {
        dispatch(roleActions.getUserRoles({ applicationId: firstApp.applicationId }))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorizedApps, value])

  useEffect(() => {
    if (leaveData && currentUsername) {
      const userLeave = leaveData.find(
        (leave: LeaveCountResponseDto) => leave.username === currentUsername
      )
      if (userLeave && userLeave.leaveCountData) {
        setIsLeaveRecordHas(true)
        setUserLeaveCountRecord(userLeave)
        const annualLeave = userLeave.leaveCountData.find(
          (leave: leaveCountDataDto) => leave.leaveType?.toLowerCase() === 'annual leave'
        )
        const causalLeave = userLeave.leaveCountData.find(
          (leave: leaveCountDataDto) => leave.leaveType?.toLowerCase() === 'casual leave'
        )
        setAnnualLeaveCountData(annualLeave)
        setCasualLeaveCountData(causalLeave)
        // Set initial edited values from existing data
        setLeaveCountFormData((prev) => ({
          ...prev,
          annualLeaveCount: {
            ...prev.annualLeaveCount,
            value: annualLeave?.entitledLeaveCount ?? 0,
          },
          casualLeaveCount: {
            ...prev.casualLeaveCount,
            value: causalLeave?.entitledLeaveCount ?? 0,
          },
        }))
      } else {
        setIsLeaveRecordHas(false)
        setUserLeaveCountRecord(null)
        setAnnualLeaveCountData(undefined)
        setCasualLeaveCountData(undefined)
        setLeaveCountFormData(INITIAL_LEAVE_COUNT_STATE)
      }
    }
  }, [leaveData, currentUsername])

  useEffect(() => {
    setCountedLeaveDataState(countedLeavedata)
    // Update edited values when calculated leave data is received
    if (countedLeavedata && countedLeavedata.length > 0) {
      setLeaveCountFormData((prev) => ({
        ...prev,
        annualLeaveCount: {
          ...prev.annualLeaveCount,
          value: countedLeavedata[0]?.annualLeaveCount ?? 0,
        },
        casualLeaveCount: {
          ...prev.casualLeaveCount,
          value: countedLeavedata[0]?.casualLeaveCount ?? 0,
        },
      }))
    }
  }, [countedLeavedata])

  useEffect(() => {
    // Get the current application's roles from userRolesData
    if (authorizedApps.length > 0 && authorizedApps[entitlementTabValue]) {
      const currentAppId = authorizedApps[entitlementTabValue].applicationId
      const currentAppRoles = userRolesData[currentAppId] as
        | SetApplicationRoleFeatureDto
        | undefined
      setUserRoles(currentAppRoles ?? null)
    } else {
      setUserRoles(null)
    }
  }, [userRolesData, authorizedApps, entitlementTabValue])

  // Check if a role is entitled (exists in user's entitlements for the current app)
  const isRoleChecked = (userRoleId: number): boolean => {
    if (!userRoles || !userEntitlements) return false
    const currentAppEntitlements = userEntitlements.find(
      (ent: any) => ent.applicationId === userRoles.applicationId
    )
    const entitledRoleIds = new Set(
      currentAppEntitlements?.userRoles?.map((role: any) => role.userRoleId) ?? []
    )
    return entitledRoleIds.has(userRoleId)
  }

  // Check if an SBU is checked based on isSbuLevelEntitlement
  const checkedSBUItem = (roleId: number, sbuId: number): boolean => {
    if (!userRoles || !userEntitlements) return false
    const currentAppEntitlements = userEntitlements.find(
      (ent: any) => ent.applicationId === userRoles.applicationId
    )
    if (!currentAppEntitlements) return false
    const userRole = currentAppEntitlements.userRoles?.find((r: any) => r.userRoleId === roleId)
    if (userRole) {
      const sbu = userRole.sbus?.find((s: any) => s.sbuId === sbuId)
      if (sbu && sbu.isSbuLevelEntitlement === 'true') {
        return true
      }
    }
    return false
  }

  // Client is checked based on parent SBU or client's entitlement
  const checkedClientItem = (roleId: number, sbuId: number, clientId: number): boolean => {
    if (!userRoles || !userEntitlements) return false
    const currentAppEntitlements = userEntitlements.find(
      (ent: any) => ent.applicationId === userRoles.applicationId
    )
    if (!currentAppEntitlements) return false
    const userRole = currentAppEntitlements.userRoles?.find((r: any) => r.userRoleId === roleId)
    if (userRole) {
      const sbu = userRole.sbus?.find((s: any) => s.sbuId === sbuId)
      if (sbu) {
        // If SBU-level is checked, all clients under it are also checked
        if (sbu.isSbuLevelEntitlement === 'true') {
          return true
        }
        const client = sbu.clients?.find((c: any) => c.clientId === clientId)
        if (client && client.isClientLevelEntitlement === 'true') {
          return true // Client has explicit client-level entitlement
        }
      }
    }
    return false
  }

  // Check if a Project is checked based on parent SBU, parent Client, or project's own entitlement
  const checkedProjectItem = (
    roleId: number,
    sbuId: number,
    clientId: number,
    projectId: number
  ): boolean => {
    if (!userRoles || !userEntitlements) return false
    const currentAppEntitlements = userEntitlements.find(
      (ent: any) => ent.applicationId === userRoles.applicationId
    )
    if (!currentAppEntitlements) return false
    const userRole = currentAppEntitlements.userRoles?.find((r: any) => r.userRoleId === roleId)
    if (userRole) {
      const sbu = userRole.sbus?.find((s: any) => s.sbuId === sbuId)
      if (sbu) {
        // Cascade from SBU level
        if (sbu.isSbuLevelEntitlement === 'true') {
          return true
        }
        const client = sbu.clients?.find((c: any) => c.clientId === clientId)
        if (client) {
          // Cascade from Client level
          if (client.isClientLevelEntitlement === 'true') {
            return true
          }
          const project = client.projects?.find((p: any) => p.projectId === projectId)
          if (project && project.isProjectLevelEntitlement === 'true') {
            return true // Project has explicit project-level entitlement
          }
        }
      }
    }
    return false
  }

  // Disable SBU checkboxes if role is not checked
  const disableSBU = (roleId: number): boolean => {
    if (!userRoles || !userEntitlements) return true
    const currentAppEntitlements = userEntitlements.find(
      (ent: any) => ent.applicationId === userRoles.applicationId
    )
    const userRole = currentAppEntitlements?.userRoles?.find((r: any) => r.userRoleId === roleId)
    if (!userRole) {
      return true // Role NOT checked → disable ALL SBUs
    }
    return false
  }

  // Get flat list of SBUs for current application from hierarchy data
  const getSbuList = (): { sbuId: number; sbuName: string }[] => {
    if (!hierchachyData || !userRoles) return []
    const currentAppHierarchy = hierchachyData.find(
      (h: any) => h.applicationId === userRoles.applicationId
    )
    if (!currentAppHierarchy?.sbus) return []
    const sbuList: { sbuId: number; sbuName: string }[] = []
    for (const sbu of currentAppHierarchy.sbus) {
      sbuList.push({
        sbuId: sbu.sbuId,
        sbuName: sbu.sbuName,
      })
    }
    return sbuList
  }

  // Get clients grouped by SBU for current application from hierarchy data
  const getClientList = (): {
    sbuId: number
    sbuName: string
    clients: { clientId: number; clientName: string }[]
  }[] => {
    if (!hierchachyData || !userRoles) return []
    const currentAppHierarchy = hierchachyData.find(
      (h: any) => h.applicationId === userRoles.applicationId
    )
    if (!currentAppHierarchy?.sbus) return []
    const clientList: {
      sbuId: number
      sbuName: string
      clients: { clientId: number; clientName: string }[]
    }[] = []
    for (const sbu of currentAppHierarchy.sbus) {
      const clients: { clientId: number; clientName: string }[] = []
      for (const client of sbu.clients || []) {
        clients.push({
          clientId: client.clientId,
          clientName: client.clientName,
        })
      }
      clientList.push({
        sbuId: sbu.sbuId,
        sbuName: sbu.sbuName,
        clients: clients,
      })
    }
    return clientList
  }

  // Get projects grouped by client with SBU info for current application from hierarchy data
  const getProjectList = (): {
    sbuId: number
    sbuName: string
    clientId: number
    clientName: string
    projects: { projectId: number; projectName: string }[]
  }[] => {
    if (!hierchachyData || !userRoles) return []
    const currentAppHierarchy = hierchachyData.find(
      (h: any) => h.applicationId === userRoles.applicationId
    )
    if (!currentAppHierarchy?.sbus) return []
    const projectList: {
      sbuId: number
      sbuName: string
      clientId: number
      clientName: string
      projects: { projectId: number; projectName: string }[]
    }[] = []
    for (const sbu of currentAppHierarchy.sbus) {
      for (const client of sbu.clients || []) {
        const projects: { projectId: number; projectName: string }[] = []
        for (const project of client.projects || []) {
          projects.push({
            projectId: project.projectId,
            projectName: project.projectName,
          })
        }
        projectList.push({
          sbuId: sbu.sbuId,
          sbuName: sbu.sbuName,
          clientId: client.clientId,
          clientName: client.clientName,
          projects: projects,
        })
      }
    }
    return projectList
  }

  // Search filter handlers for entitlements
  const applyFilterSBU = (event: React.ChangeEvent<HTMLInputElement>, roleId: number) => {
    const filterValue = event.target.value.toLowerCase()
    const sbuList = getSbuList()
    if (!filterValue) {
      setFilteredSbuLists(prev => {
        const updated = { ...prev }
        delete updated[roleId]
        return updated
      })
    } else {
      const filteredList = sbuList.filter(s => s.sbuName.toLowerCase().includes(filterValue))
      setFilteredSbuLists(prev => ({ ...prev, [roleId]: filteredList }))
    }
  }

  const applyFilterClient = (event: React.ChangeEvent<HTMLInputElement>, roleId: number) => {
    const filterValue = event.target.value.toLowerCase()
    const clientList = getClientList()
    if (!filterValue) {
      setFilteredClientLists(prev => {
        const updated = { ...prev }
        delete updated[roleId]
        return updated
      })
    } else {
      const filteredList = clientList.map(s => ({
        sbuId: s.sbuId,
        sbuName: s.sbuName,
        clients: s.clients.filter(c => c.clientName.toLowerCase().includes(filterValue))
      }))
      setFilteredClientLists(prev => ({ ...prev, [roleId]: filteredList }))
    }
  }

  const applyFilterProject = (event: React.ChangeEvent<HTMLInputElement>, roleId: number) => {
    const filterValue = event.target.value.toLowerCase()
    const projectList = getProjectList()
    if (!filterValue) {
      setFilteredProjectLists(prev => {
        const updated = { ...prev }
        delete updated[roleId]
        return updated
      })
    } else {
      const filteredList = projectList.map(c => ({
        sbuId: c.sbuId,
        sbuName: c.sbuName,
        clientId: c.clientId,
        clientName: c.clientName,
        projects: c.projects.filter(p => p.projectName.toLowerCase().includes(filterValue))
      }))
      setFilteredProjectLists(prev => ({ ...prev, [roleId]: filteredList }))
    }
  }

  // Get filtered or original list for a specific role
  const getFilteredSbuList = (roleId: number) => {
    return filteredSbuLists[roleId] ?? getSbuList()
  }

  const getFilteredClientList = (roleId: number) => {
    return filteredClientLists[roleId] ?? getClientList()
  }

  const getFilteredProjectList = (roleId: number) => {
    return filteredProjectLists[roleId] ?? getProjectList()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onAssignBadgeHandleChange = (value: any) => {
    setAssignBadgeFormData((prevState) => ({
      ...prevState,
      badgeId: {
        ...prevState.badgeId,
        value,
        error: null,
      },
    }))
  }

  const onAssignBadge = async () => {
    const [validateData, isValid] = await validateFormData(assignBadgeFormData)
    setAssignBadgeFormData(validateData)
    if (isValid && assignBadgeFormData.badgeId.value) {
      const payload: AssignBadgePayload = {
        badges: [
          {
            badgeId: assignBadgeFormData.badgeId.value.id,
            username: currentUsername || '',
          },
        ],
      }
      dispatch(badgeActions.postAllocation(payload))
    }
  }

  const onChangeTabs = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    if (newValue === 0) {
      dispatch(
        userActions.getUserListRequest({
          getAll: true,
          ignoreApplication: true,
          username: currentUsername,
        })
      )
      dispatch(userActions.getUserDesignationsRequest())
    } else if (newValue === 1) {
      dispatch(
        userActions.getUserListRequest({
          getAll: true,
          ignoreApplication: true,
          username: currentUsername,
        })
      )
      dispatch(sbuActions.getSbuHierarchy())
      dispatch(entitlementsActions.getUserEntitlements({ username: currentUsername || '' }))
      // Fetch roles only for the currently selected entitlement tab (first app by default)
      if (authorizedApps.length > 0 && authorizedApps[entitlementTabValue]) {
        dispatch(
          roleActions.getUserRoles({
            applicationId: authorizedApps[entitlementTabValue].applicationId,
          })
        )
      }
    } else if (newValue === 2) {
      dispatch(badgeActions.getAllocationList({ username: currentUsername, getDisabled: false }))
      dispatch(badgeActions.getBadgeList({}))
    } else if (newValue === 3) {
      dispatch(resignationActions.getResignationList({ username: currentUsername }))
      // Set the username in resignation form when switching to resignation tab
      if (userDetails && userDetails.length > 0) {
        setResignationfilterFormData((prev) => ({
          ...prev,
          username: {
            ...prev.username,
            value: {
              id: userDetails[0].userId,
              name: userDetails[0].username,
            } as initUserDto,
          },
        }))
      }
    } else if (newValue === 4) {
      dispatch(
        userActions.getUserListRequest({
          getAll: true,
          ignoreApplication: true,
          username: currentUsername,
        })
      )
      dispatch(leavesActions.getAllLeaveCounts())

      // Only call userLeaveCounts if user is not external, is Athena authorized, and doesn't have a confirmation date
      const isAthenaAuthorized =
        userDetails &&
        userDetails.length > 0 &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        userDetails[0]?.applications.some((app: any) => app.applicationName === 'Athena')
      const hasConfirmationDate =
        userDetails && userDetails.length > 0 && userDetails[0]?.confirmationDate
      const isExternal = initialUpdateUserData.isExternal.value

      if (!isExternal && isAthenaAuthorized && !hasConfirmationDate) {
        dispatch(
          leavesActions.userLeaveCounts({
            username: currentUsername || '',
            joinDate: initialUpdateUserData.joinDate.value
              ? moment(initialUpdateUserData.joinDate.value).format('YYYY-MM-DD')
              : moment().format('YYYY-MM-DD'),
            confirmDate: initialUpdateUserData.confirmationDate.value
              ? moment(initialUpdateUserData.confirmationDate.value).format('YYYY-MM-DD')
              : moment().format('YYYY-MM-DD'),
          })
        )
      }
    }
  }

  const handleUserChange = (
    _event: React.SyntheticEvent,
    newValue: { id: number; name: string } | null
  ) => {
    setSelectedUser(newValue)
    // Clear cached user roles when user changes
    dispatch(roleActions.clearUserRoles())
    // Reset entitlement tab to first app
    setEntitlementTabValue(0)

    if (newValue) {
      setCurrentUsername(newValue.name)
      setBreadcrumb([
        {
          id: 2,
          title: `Users / ${newValue.name}`,
          path: '',
        },
      ])
      // Update URL without navigation
      window.history.replaceState(null, '', `/users/${newValue.name}/userEdit`)
    }

    const username = newValue ? newValue.name : ''

    if (value === 0) {
      dispatch(
        userActions.getUserListRequest({
          getAll: true,
          ignoreApplication: true,
          username,
        })
      )
      dispatch(userActions.getUserDesignationsRequest())
    } else if (value === 1) {
      dispatch(
        userActions.getUserListRequest({
          getAll: true,
          ignoreApplication: true,
          username,
        })
      )
      dispatch(sbuActions.getSbuHierarchy())
      dispatch(entitlementsActions.getUserEntitlements({ username }))
      // Fetch roles for the first app (index 0) - new user's apps will be loaded after userDetails update
    } else if (value === 2) {
      dispatch(badgeActions.getAllocationList({ username, getDisabled: false }))
    } else if (value === 3) {
      dispatch(badgeActions.getAllocationList({ username, getDisabled: false }))
      dispatch(resignationActions.getResignationList({ username }))
    } else if (value === 4) {
      dispatch(
        userActions.getUserListRequest({
          getAll: true,
          ignoreApplication: true,
          username,
        })
      )
      dispatch(leavesActions.getAllLeaveCounts())
      const isAthenaAuthorized =
        userDetails &&
        userDetails.length > 0 &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        userDetails[0]?.applications.some((app: any) => app.applicationName === 'Athena')
      const hasConfirmationDate =
        userDetails && userDetails.length > 0 && userDetails[0]?.confirmationDate
      const isExternal = initialUpdateUserData.isExternal.value

      if (!isExternal && isAthenaAuthorized && !hasConfirmationDate) {
        dispatch(
          leavesActions.userLeaveCounts({
            username,
            joinDate: initialUpdateUserData.joinDate.value
              ? moment(initialUpdateUserData.joinDate.value).format('YYYY-MM-DD')
              : moment().format('YYYY-MM-DD'),
            confirmDate: initialUpdateUserData.confirmationDate.value
              ? moment(initialUpdateUserData.confirmationDate.value).format('YYYY-MM-DD')
              : moment().format('YYYY-MM-DD'),
          })
        )
      }
    }
  }
  const setInitialData = () => {
    if (userDetails && userDetails.length > 0) {
      setInitialUpdateUserData({
        ...initialUpdateUserData,
        username: {
          ...initialUpdateUserData.username,
          value: userDetails[0]?.username,
        },
        firstName: {
          ...initialUpdateUserData.firstName,
          value: userDetails[0]?.firstName,
        },
        lastName: {
          ...initialUpdateUserData.lastName,
          value: userDetails[0]?.lastName,
        },
        isEnabled: {
          ...initialUpdateUserData.isEnabled,
          value: userDetails[0]?.isEnabled,
        },
        employeeNumber: {
          ...initialUpdateUserData.employeeNumber,
          value: userDetails[0]?.employeeNumber,
        },
        designationId: {
          ...initialUpdateUserData.designationId,
          value: userDetails[0]?.designationId || null,
        },
        terminationDate: {
          ...initialUpdateUserData.terminationDate,
          value: userDetails[0]?.terminationDate || '',
        },
        isExternal: {
          ...initialUpdateUserData.isExternal,
          value: userDetails[0]?.isExternal,
        },
        designationEffectiveFrom: {
          ...initialUpdateUserData.designationEffectiveFrom,
          value: userDetails[0]?.designationEffectiveFrom || '',
        },
        confirmationDate: {
          ...initialUpdateUserData.confirmationDate,
          value: userDetails[0]?.confirmationDate || '',
        },
        joinDate: {
          ...initialUpdateUserData.joinDate,
          value: userDetails[0]?.joinDate,
        },
        birthday: {
          ...initialUpdateUserData.birthday,
          value: userDetails[0]?.birthday,
        },
        applications: {
          ...initialUpdateUserData.applications,
          value: userDetails[0]?.applications,
        },
      })
    }
  }

  const initLetters =
    initialUpdateUserData.firstName.value.charAt(0).toUpperCase() +
    initialUpdateUserData.lastName.value.charAt(0).toUpperCase()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onHandleChangeUser = (field: keyof UpdateUserFormDto, value: any) => {
    setInitialUpdateUserData({
      ...initialUpdateUserData,
      [field]: {
        ...initialUpdateUserData[field],
        value: value,
        error: null,
      },
    })
  }

  const onUpdateUserTrigger = async () => {
    const [validatedData, isValid] = await validateFormData(initialUpdateUserData)
    setInitialUpdateUserData(validatedData)
    if (isValid) {
      const updatedParams: UpdateUserDto = {
        username: initialUpdateUserData.username.value,
        firstName: initialUpdateUserData.firstName.value,
        lastName: initialUpdateUserData.lastName.value,
        isEnabled: initialUpdateUserData.isEnabled.value,
        applications: initialUpdateUserData.applications.value,
        joinDate: moment(initialUpdateUserData.joinDate.value).format('YYYY-MM-DD'),
        birthday: moment(initialUpdateUserData.birthday.value).format('YYYY-MM-DD'),
        employeeNumber: initialUpdateUserData.employeeNumber.value,
        terminationDate: initialUpdateUserData.terminationDate.value
          ? moment(initialUpdateUserData.terminationDate.value).format('YYYY-MM-DD')
          : undefined,
        designationId: initialUpdateUserData.designationId.value,
        designationEffectiveFrom: initialUpdateUserData.designationEffectiveFrom.value
          ? moment(initialUpdateUserData.designationEffectiveFrom.value).format('YYYY-MM-DD')
          : undefined,
        confirmationDate: initialUpdateUserData.confirmationDate.value
          ? moment(initialUpdateUserData.confirmationDate.value).format('YYYY-MM-DD')
          : undefined,
        isExternal: initialUpdateUserData.isExternal.value,
      }
      dispatch(userActions.updateUserDetails(updatedParams))
    }
  }

  const onUpdateUserCloseAlert = () => {
    dispatch(alertActions.clearUpdateUserDetailsAlert())
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
        username:
          userDetails && userDetails.length > 0 ? userDetails[0]?.username : currentUsername,
        comment: resignationfilterFormData.comment.value,
        isEnabled: true,
      }
      dispatch(resignationActions.createResignation(resignationFormParams))
    }
  }
  const onClearFormFields = () => {
    setResignationfilterFormData(INITIAL_FILTER_STATE)
  }

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
  const onCloseSelection = () => {
    setEditingResignationId(null)
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
  const onCommentPopUpClose = () => {
    setIsOpen(false)
  }
  const onPostCommentAlertClose = () => {
    dispatch(alertActions.clearPostCommentAlert())
  }
  const closeResignationPostAlert = () => {
    dispatch(alertActions.clearPostResignationAlert())
  }
  const onUpdateResignationAlertClose = () => {
    dispatch(alertActions.clearUpdateResignationAlert())
  }
  const onClearCommentFields = () => {
    setInitComment(INITIAL_COMMENT_STATE)
  }
  const handleChangeBadgeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBadgeRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const onDeleteBadgeHandle = (badge: BadgeTableDetailsDto) => {
    setSelectedBadgeToRemove(badge)
    setIsRemovePopUpOpen(true)
  }
  const onRemovePopUpClose = () => {
    setIsRemovePopUpOpen(false)
  }
  const onAssignBadgeCloseAlert = () => {
    dispatch(alertActions.clearAllocationBadgeAlert())
  }
  const onRemoveBadgeCloseAlert = () => {
    dispatch(alertActions.clearRemoveBadgeAllocationAlert())
  }
  const onConfirmRemove = () => {
    if (selectedBadgeToRemove) {
      dispatch(
        badgeActions.removeBadgeAllocation({
          id: selectedBadgeToRemove.id,
        })
      )
      setIsRemovePopUpOpen(false)
      setSelectedBadgeToRemove(null)
    }
  }

  const handleConfirmationDateChange = (date: string | null) => {
    setInitialUpdateUserData((prev) => ({
      ...prev,
      confirmationDate: {
        ...prev.confirmationDate,
        value: date || '',
        error: null,
      },
    }))

    // When user manually changes the date, call API if user is not external and is Athena authorized
    const isAthenaAuthorized =
      userDetails &&
      userDetails.length > 0 &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      userDetails[0]?.applications.some((app: any) => app.applicationName === 'Athena')
    const isExternal = initialUpdateUserData.isExternal.value

    if (!isExternal && isAthenaAuthorized) {
      dispatch(
        leavesActions.userLeaveCounts({
          username: currentUsername || '',
          joinDate: initialUpdateUserData.joinDate.value
            ? moment(initialUpdateUserData.joinDate.value).format('YYYY-MM-DD')
            : moment().format('YYYY-MM-DD'),
          confirmDate: date ? moment(date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
        })
      )
    }
  }
  const getConfirmationMinDate = () => {
    const confirmationMoment = moment()
    return confirmationMoment.clone().startOf('year')
  }
  const getConfirmationMaxDate = () => {
    const confirmationMoment = moment()
    return confirmationMoment.clone().endOf('year')
  }

  // Handler for entitlement horizontal tab change
  const handleEntitlementTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setEntitlementTabValue(newValue)
    // Fetch user roles for the selected application if not already fetched
    if (authorizedApps[newValue]) {
      const appId = authorizedApps[newValue].applicationId
      dispatch(roleActions.getUserRoles({ applicationId: appId }))
    }
  }

  const isAthenaAuthorized = userDetails[0]?.applications.some(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (app: any) => app.applicationName === 'Athena'
  )
  // Check if user originally has a confirmation date AND it hasn't been changed in the form
  const originalConfirmationDate =
    userDetails && userDetails.length > 0 ? userDetails[0]?.confirmationDate : null
  const currentConfirmationDate = initialUpdateUserData.confirmationDate.value
  const hasUnchangedConfirmationDate =
    !!originalConfirmationDate &&
    (!currentConfirmationDate ||
      moment(originalConfirmationDate).isSame(moment(currentConfirmationDate), 'day'))

  const onLeaveCountChange = (field: 'annual' | 'casual', value: number) => {
    setLeaveCountFormData((prev) => ({
      ...prev,
      ...(field === 'annual'
        ? {
          annualLeaveCount: {
            ...prev.annualLeaveCount,
            value: value,
            error: null,
          },
        }
        : {
          casualLeaveCount: {
            ...prev.casualLeaveCount,
            value: value,
            error: null,
          },
        }),
    }))
  }

  const onUpdateLeaveUser = async () => {
    const [validatedData, isValid] = await validateFormData(initialUpdateUserData)
    setInitialUpdateUserData(validatedData)

    // Validate leave count form if user is Athena authorized and internal
    let isLeaveCountValid = true
    if (isAthenaAuthorized && !initialUpdateUserData.isExternal.value) {
      const [validatedLeaveData, leaveValid] = await validateFormData(leaveCountFormData)
      setLeaveCountFormData(validatedLeaveData as EditLeaveCountFormDto)
      isLeaveCountValid = leaveValid
    }

    if (isValid && isLeaveCountValid) {
      const updatedParams: UpdateUserDto = {
        username: initialUpdateUserData.username.value,
        isEnabled: initialUpdateUserData.isEnabled.value,
        applications: initialUpdateUserData.applications.value,
        confirmationDate: initialUpdateUserData.confirmationDate.value
          ? moment(initialUpdateUserData.confirmationDate.value).format('YYYY-MM-DD')
          : undefined,
        isExternal: initialUpdateUserData.isExternal.value,
      }
      dispatch(userActions.updateUserDetails(updatedParams))

      // Handle leave count update/add if user is Athena authorized and not external
      if (isAthenaAuthorized && !initialUpdateUserData.isExternal.value) {
        if (isLeaveRecordHas && userLeaveCountRecord) {
          // User has existing leave records - UPDATE (PUT)
          const leaveType: LeavesTypesDto[] = userLeaveCountRecord.leaveCountData.map(
            (leave: leaveCountDataDto) => {
              if (leave.leaveType?.toLowerCase() === 'annual leave') {
                return {
                  leaveCountId: leave.leaveCountId,
                  leaveCount: leaveCountFormData.annualLeaveCount.value,
                }
              } else if (leave.leaveType?.toLowerCase() === 'casual leave') {
                return {
                  leaveCountId: leave.leaveCountId,
                  leaveCount: leaveCountFormData.casualLeaveCount.value,
                }
              } else {
                // Lieu leave - keep existing count
                return { leaveCountId: leave.leaveCountId, leaveCount: leave.entitledLeaveCount }
              }
            }
          )
          const leaveCountPayload: LeavesCountUpdateDto = {
            username: initialUpdateUserData.username.value,
            leaveCountData: leaveType,
          }
          dispatch(leavesActions.updateLeaveCounts(leaveCountPayload))
        } else {
          // User does NOT have existing leave records - ADD (POST)
          const leaveType: LeavesTypesDto[] = [
            {
              leaveTypeId: LEAVE_TYPE_IDS.ANNUAL_LEAVE,
              leaveCount: leaveCountFormData.annualLeaveCount.value,
            },
            { leaveTypeId: LEAVE_TYPE_IDS.LIEU_LEAVE, leaveCount: 0 },
            {
              leaveTypeId: LEAVE_TYPE_IDS.CASUAL_LEAVE,
              leaveCount: leaveCountFormData.casualLeaveCount.value,
            },
          ]
          const leaveCountPayload: LeavesCountUpdateDto = {
            username: initialUpdateUserData.username.value,
            leaveCountData: leaveType,
          }
          dispatch(leavesActions.addLeaveCount(leaveCountPayload))
        }
      }
    }
  }
  // Handler for role checkbox change - adds/removes role from userEntitlements
  const onRoleChange = (userRoleId: number, userRoleName: string, isChecked: boolean): void => {
    if (!userRoles) return
    const applicationId = userRoles.applicationId

    // Clone the current entitlements
    const updatedEntitlements = userEntitlements ? [...userEntitlements] : []
    const appEntitlementIndex = updatedEntitlements.findIndex(
      (ent: any) => ent.applicationId === applicationId
    )

    if (isChecked) {
      // Add role to entitlements
      const newRole = {
        userRoleId,
        userRoleName,
        sbus: [],
      }
      if (appEntitlementIndex !== -1) {
        const appEntitlement = { ...updatedEntitlements[appEntitlementIndex] }
        appEntitlement.userRoles = [...(appEntitlement.userRoles || []), newRole]
        updatedEntitlements[appEntitlementIndex] = appEntitlement
      } else {
        updatedEntitlements.push({
          applicationId,
          userRoles: [newRole],
        })
      }
    } else {
      // Remove role from entitlements
      if (appEntitlementIndex !== -1) {
        const appEntitlement = { ...updatedEntitlements[appEntitlementIndex] }
        appEntitlement.userRoles = (appEntitlement.userRoles || []).filter(
          (r: any) => r.userRoleId !== userRoleId
        )
        updatedEntitlements[appEntitlementIndex] = appEntitlement
      }
    }

    dispatch(entitlementsActions.setUserEntitlements(updatedEntitlements))
  }

  // Handler for SBU checkbox change - adds/removes SBU from role's sbus array
  const onSbuChange = (
    userRoleId: number,
    sbu: { sbuId: number; sbuName: string },
    isChecked: boolean
  ): void => {
    if (!userRoles || !hierchachyData) return
    const applicationId = userRoles.applicationId

    const updatedEntitlements = userEntitlements ? [...userEntitlements] : []
    const appEntitlementIndex = updatedEntitlements.findIndex(
      (ent: any) => ent.applicationId === applicationId
    )

    if (appEntitlementIndex === -1) return

    const appEntitlement = { ...updatedEntitlements[appEntitlementIndex] }
    const roleIndex = (appEntitlement.userRoles || []).findIndex(
      (r: any) => r.userRoleId === userRoleId
    )

    if (roleIndex === -1) return

    const role = { ...appEntitlement.userRoles[roleIndex] }
    const sbus = [...(role.sbus || [])]
    const sbuIndex = sbus.findIndex((s: any) => s.sbuId === sbu.sbuId)

    if (isChecked) {
      // Get full SBU from hierarchy
      const currentAppHierarchy = hierchachyData.find(
        (h: any) => h.applicationId === applicationId
      )
      const hierarchySbu = currentAppHierarchy?.sbus?.find((s: any) => s.sbuId === sbu.sbuId)

      if (hierarchySbu) {
        // Remove existing sbu if present
        if (sbuIndex !== -1) {
          sbus.splice(sbuIndex, 1)
        }

        // Create new SBU with isSbuLevelEntitlement = 'true' and children with 'false'
        const newSbu = {
          sbuId: hierarchySbu.sbuId,
          sbuName: hierarchySbu.sbuName,
          isSbuLevelEntitlement: 'true',
          clients: (hierarchySbu.clients || []).map((client: any) => ({
            clientId: client.clientId,
            clientName: client.clientName,
            isClientLevelEntitlement: 'false',
            projects: (client.projects || []).map((project: any) => ({
              projectId: project.projectId,
              projectName: project.projectName,
              isProjectLevelEntitlement: 'false',
            })),
          })),
        }
        sbus.push(newSbu)
      }
    } else {
      // Remove SBU
      if (sbuIndex !== -1) {
        sbus.splice(sbuIndex, 1)
      }
    }

    role.sbus = sbus
    appEntitlement.userRoles = [...appEntitlement.userRoles]
    appEntitlement.userRoles[roleIndex] = role
    updatedEntitlements[appEntitlementIndex] = appEntitlement

    dispatch(entitlementsActions.setUserEntitlements(updatedEntitlements))
  }

  // Handler for Client checkbox change - adds/removes client from SBU's clients array
  const onClientChange = (
    userRoleId: number,
    sbuId: number,
    sbuName: string,
    client: { clientId: number; clientName: string },
    isChecked: boolean
  ): void => {
    if (!userRoles) return
    const applicationId = userRoles.applicationId

    const updatedEntitlements = userEntitlements ? [...userEntitlements] : []
    const appEntitlementIndex = updatedEntitlements.findIndex(
      (ent: any) => ent.applicationId === applicationId
    )

    if (appEntitlementIndex === -1) return

    const appEntitlement = { ...updatedEntitlements[appEntitlementIndex] }
    const roleIndex = (appEntitlement.userRoles || []).findIndex(
      (r: any) => r.userRoleId === userRoleId
    )

    if (roleIndex === -1) return

    const role = { ...appEntitlement.userRoles[roleIndex] }
    let sbus = [...(role.sbus || [])]
    let sbuIndex = sbus.findIndex((s: any) => s.sbuId === sbuId)

    if (isChecked) {
      // Create SBU if it doesn't exist
      if (sbuIndex === -1) {
        sbus.push({
          sbuId,
          sbuName,
          isSbuLevelEntitlement: 'false',
          clients: [],
        })
        sbuIndex = sbus.length - 1
      }

      const sbu = { ...sbus[sbuIndex] }
      const clients = [...(sbu.clients || [])]
      clients.push({
        clientId: client.clientId,
        clientName: client.clientName,
        isClientLevelEntitlement: 'true',
        projects: [],
      })
      sbu.clients = clients
      sbus[sbuIndex] = sbu
    } else {
      // Remove client from SBU
      if (sbuIndex !== -1) {
        const sbu = { ...sbus[sbuIndex] }
        sbu.clients = (sbu.clients || []).filter((c: any) => c.clientId !== client.clientId)
        // If no more clients and SBU is not at SBU level, remove the SBU too
        if (sbu.clients.length === 0 && sbu.isSbuLevelEntitlement !== 'true') {
          sbus.splice(sbuIndex, 1)
        } else {
          sbus[sbuIndex] = sbu
        }
      }
    }

    role.sbus = sbus
    appEntitlement.userRoles = [...appEntitlement.userRoles]
    appEntitlement.userRoles[roleIndex] = role
    updatedEntitlements[appEntitlementIndex] = appEntitlement

    dispatch(entitlementsActions.setUserEntitlements(updatedEntitlements))
  }

  // Handler for Project checkbox change - adds/removes project from client's projects array
  const onProjectChange = (
    userRoleId: number,
    sbuId: number,
    sbuName: string,
    clientId: number,
    clientName: string,
    project: { projectId: number; projectName: string },
    isChecked: boolean
  ): void => {
    if (!userRoles) return
    const applicationId = userRoles.applicationId

    const updatedEntitlements = userEntitlements ? [...userEntitlements] : []
    const appEntitlementIndex = updatedEntitlements.findIndex(
      (ent: any) => ent.applicationId === applicationId
    )

    if (appEntitlementIndex === -1) return

    const appEntitlement = { ...updatedEntitlements[appEntitlementIndex] }
    const roleIndex = (appEntitlement.userRoles || []).findIndex(
      (r: any) => r.userRoleId === userRoleId
    )

    if (roleIndex === -1) return

    const role = { ...appEntitlement.userRoles[roleIndex] }
    let sbus = [...(role.sbus || [])]
    let sbuIndex = sbus.findIndex((s: any) => s.sbuId === sbuId)

    if (isChecked) {
      // Create SBU if it doesn't exist
      if (sbuIndex === -1) {
        sbus.push({
          sbuId,
          sbuName,
          isSbuLevelEntitlement: 'false',
          clients: [],
        })
        sbuIndex = sbus.length - 1
      }

      const sbu = { ...sbus[sbuIndex] }
      let clients = [...(sbu.clients || [])]
      let clientIndex = clients.findIndex((c: any) => c.clientId === clientId)

      // Create client if it doesn't exist
      if (clientIndex === -1) {
        clients.push({
          clientId,
          clientName,
          isClientLevelEntitlement: 'false',
          projects: [],
        })
        clientIndex = clients.length - 1
      }

      const clientObj = { ...clients[clientIndex] }
      const projects = [...(clientObj.projects || [])]
      projects.push({
        projectId: project.projectId,
        projectName: project.projectName,
        isProjectLevelEntitlement: 'true',
      })
      clientObj.projects = projects
      clients[clientIndex] = clientObj
      sbu.clients = clients
      sbus[sbuIndex] = sbu
    } else {
      // Remove project
      if (sbuIndex !== -1) {
        const sbu = { ...sbus[sbuIndex] }
        let clients = [...(sbu.clients || [])]
        const clientIndex = clients.findIndex((c: any) => c.clientId === clientId)

        if (clientIndex !== -1) {
          const clientObj = { ...clients[clientIndex] }
          clientObj.projects = (clientObj.projects || []).filter(
            (p: any) => p.projectId !== project.projectId
          )

          // If no more projects and client is not at client level, remove the client
          if (clientObj.projects.length === 0 && clientObj.isClientLevelEntitlement !== 'true') {
            clients.splice(clientIndex, 1)
            // If no more clients and SBU is not at SBU level, remove the SBU too
            if (clients.length === 0 && sbu.isSbuLevelEntitlement !== 'true') {
              sbus.splice(sbuIndex, 1)
            } else {
              sbu.clients = clients
              sbus[sbuIndex] = sbu
            }
          } else {
            clients[clientIndex] = clientObj
            sbu.clients = clients
            sbus[sbuIndex] = sbu
          }
        }
      }
    }

    role.sbus = sbus
    appEntitlement.userRoles = [...appEntitlement.userRoles]
    appEntitlement.userRoles[roleIndex] = role
    updatedEntitlements[appEntitlementIndex] = appEntitlement

    dispatch(entitlementsActions.setUserEntitlements(updatedEntitlements))
  }

  // Handler for Save Entitlements button
  const handleSaveEntitlements = (): void => {
    if (!userRoles || !userEntitlements) return

    const applicationId = userRoles.applicationId

    // Find the current app entitlement
    const currentAppEntitlement = userEntitlements.find(
      (ent: any) => ent.applicationId === applicationId
    )

    if (!currentAppEntitlement) return

    // Build userRoles array with entitlements
    const userRolesPayload: { userRoleId: number; entitlements: { entitlementId: number; entitlementLevel: number }[] }[] = []

    for (const role of currentAppEntitlement.userRoles || []) {
      const entitlements: { entitlementId: number; entitlementLevel: number }[] = []

      for (const sbu of role.sbus || []) {
        // Level 1: SBU level entitlement
        if (sbu.isSbuLevelEntitlement === 'true') {
          entitlements.push({
            entitlementId: sbu.sbuId,
            entitlementLevel: 1,
          })
          continue
        }

        // Check clients
        for (const client of sbu.clients || []) {
          // Level 2: Client level entitlement
          if (client.isClientLevelEntitlement === 'true') {
            entitlements.push({
              entitlementId: client.clientId,
              entitlementLevel: 2,
            })
            continue
          }

          // Check projects
          for (const project of client.projects || []) {
            // Level 3: Project level entitlement
            if (project.isProjectLevelEntitlement === 'true') {
              entitlements.push({
                entitlementId: project.projectId,
                entitlementLevel: 3,
              })
            }
          }
        }
      }

      userRolesPayload.push({
        userRoleId: role.userRoleId,
        entitlements,
      })
    }

    // Build the payload
    const payload = {
      applicationId,
      userRoles: userRolesPayload,
    }

    // Dispatch the save action
    dispatch(entitlementsActions.saveUserEntitlements(payload, currentUsername || ''))
  }

  const handleDiscardEntitlements = () => {
    dispatch(entitlementsActions.getUserEntitlements({ username: currentUsername || '' }))
  }
  const onUpdateSbuCloseAlert = () => {
    dispatch(alertActions.clearSaveEntitlementAlert())
  }

  return (
    <React.Fragment>
      <AppLayout breadcrumb={breadcrumb}>
        <Grid container spacing={2} mb={1}>
          <Grid size={{ xs: 12, sm: 6, md: 8 }}>
            <p
              style={{
                paddingBottom: 7,
                margin: 0,
                fontWeight: 400,
                fontSize: '24px',
              }}
            >
              User Management
            </p>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <UsersDropdown
              briefUsers={briefUsers}
              selectedUser={selectedUser}
              onUserChange={handleUserChange}
            />
          </Grid>
        </Grid>
        <Divider className="dividerStyle" />
        <Grid container spacing={2} mt={2} mb={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} className="sectionTitleHolder">
            <Box sx={{ flexGrow: 1, bgcolor: '#e1e3e2', alignItems: 'flex-start' }}>
              <Tabs
                orientation="vertical"
                value={value}
                sx={{ borderColor: 'divider' }}
                onChange={onChangeTabs}
                TabIndicatorProps={{
                  sx: { width: 3, left: 0, right: 'auto' },
                }}
              >
                <Tab
                  label="User Details"
                  className={styles.tabStyle}
                  sx={{ justifyContent: 'flex-start' }}
                />
                <Tab
                  label="Entitlements"
                  className={styles.tabStyle}
                  sx={{ justifyContent: 'flex-start' }}
                />
                <Tab
                  label="User Badges"
                  className={styles.tabStyle}
                  sx={{ justifyContent: 'flex-start' }}
                />
                <Tab
                  label="User Resignation"
                  className={styles.tabStyle}
                  sx={{ justifyContent: 'flex-start' }}
                />
                <Tab
                  label="Confirmation & Leave Config"
                  className={styles.tabStyle}
                  sx={{ justifyContent: 'flex-start' }}
                />
              </Tabs>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 8, lg: 10 }}>
            {updateUserAlert.message && (
              <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
                <Alert onClose={onUpdateUserCloseAlert} severity={updateUserAlert.severity}>
                  {updateUserAlert.message}
                </Alert>
              </div>
            )}
            {value === 0 &&
              (isLoadingUserList || isLoadingDesignations || isLoadingApplications ? (
                <Box
                  sx={{
                    padding: '40px',
                    textAlign: 'center',
                    minHeight: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={loaderGif}
                    alt="Loading..."
                    style={{ width: '250px', height: '150px' }}
                  />
                </Box>
              ) : (
                <EditUserDetails
                  initialUpdateUserData={initialUpdateUserData}
                  initLetters={initLetters}
                  applications={applications}
                  designations={designationsState}
                  onHandleChangeUser={onHandleChangeUser}
                  onUpdateUserTrigger={onUpdateUserTrigger}
                  photo={photo}
                />
              ))}
            {value === 1 && (
              <>
                {saveUserEntitlementAlert.message && (
                  <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
                    <Alert onClose={onUpdateSbuCloseAlert} severity={saveUserEntitlementAlert.severity}>
                      {saveUserEntitlementAlert.message}
                    </Alert>
                  </div>
                )}
                <Grid size={{ xs: 12, sm: 12, md: 12 }} ml={2}>
                  <Typography fontSize={25} fontWeight="bold" flexBasis={1} mt={2} mb={2}>
                    Entitlements
                  </Typography>
                </Grid>
                {userRolesLoading || entitlementsLoading || hierchachyDataLoading || isLoadingUserList ? (
                  <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                    <Box
                      sx={{
                        padding: '40px',
                        textAlign: 'center',
                        minHeight: '200px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img
                        src={loaderGif}
                        alt="Loading..."
                        style={{ width: '250px', height: '150px' }}
                      />
                    </Box>
                  </Grid>
                ) : (
                  <>
                    <Grid size={{ xs: 12, sm: 12, md: 8 }}>
                      {authorizedApps.length > 0 && (
                        <Tabs
                          variant="scrollable"
                          value={entitlementTabValue}
                          onChange={handleEntitlementTabChange}
                        >
                          {authorizedApps.map((app) => (
                            <Tab
                              key={app.applicationKey}
                              label={app.applicationName}
                              className={styles.appTabStyles}
                            />
                          ))}
                        </Tabs>
                      )}
                    </Grid>
                    <Grid container size={{ xs: 12, sm: 12, md: 12 }}>
                      <Grid size={{ xs: 12, sm: 12, md: 8, lg: 6 }}>
                        {(() => {
                          const currentAppId = authorizedApps[entitlementTabValue]?.applicationId
                          const entitlementComponentMap: Record<number, React.ComponentType<any>> = {
                            [APPLICATION_IDS.ATHENA]: AthenaEntitlements,
                            [APPLICATION_IDS.HERMES]: HermesEntitlements,
                            [APPLICATION_IDS.HERA]: HeraEntitlements,
                            [APPLICATION_IDS.DASHBOARD]: DashboardEntitlements,
                            [APPLICATION_IDS.DEMETER]: DemeterEntitlements,
                          }
                          const EntitlementComponent = currentAppId ? entitlementComponentMap[currentAppId] : null
                          if (!EntitlementComponent) return null
                          return (
                            <EntitlementComponent
                              userFeatureRoles={userRoles}
                              checkedRoleItem={isRoleChecked}
                              checkedSBUItem={checkedSBUItem}
                              checkedClientItem={checkedClientItem}
                              checkedProjectItem={checkedProjectItem}
                              disableSBU={disableSBU}
                              sbuList={getSbuList()}
                              clientList={getClientList()}
                              projectList={getProjectList()}
                              onRoleChange={onRoleChange}
                              onSbuChange={onSbuChange}
                              onClientChange={onClientChange}
                              onProjectChange={onProjectChange}
                              onFilterSbu={applyFilterSBU}
                              onFilterClient={applyFilterClient}
                              onFilterProject={applyFilterProject}
                              getFilteredSbuList={getFilteredSbuList}
                              getFilteredClientList={getFilteredClientList}
                              getFilteredProjectList={getFilteredProjectList}
                            />
                          )
                        })()}
                      </Grid>
                      {/* Right side - Entitlement Summary Panel */}
                      <Grid size={{ xs: 6, sm: 6, md: 4 }}>
                        <EntitlementSummary
                          userEntitlements={
                            userEntitlements?.find(
                              (ent: any) => ent.applicationId === userRoles?.applicationId
                            )?.userRoles || []
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} size={{ xs: 12, sm: 12, md: 12 }} ml={2} mt={2}>
                      <Button
                        variant="contained"
                        size="medium"
                        onClick={handleSaveEntitlements}
                      >
                        Save Entitlements
                      </Button>
                      <Button variant="contained" color="inherit" onClick={handleDiscardEntitlements}>
                        Discard
                      </Button>
                    </Grid>
                  </>
                )}
              </>
            )}

            {value === 2 && (
              <>
                {assignBadgeAlert.message && (
                  <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
                    <Alert onClose={onAssignBadgeCloseAlert} severity={assignBadgeAlert.serverity}>
                      {assignBadgeAlert.message}
                    </Alert>
                  </div>
                )}
                <AssignUserBadge
                  badgeList={badgeList}
                  selectedBadge={assignBadgeFormData.badgeId.value}
                  onBadgeChange={onAssignBadgeHandleChange}
                  onAssignBadge={onAssignBadge}
                />
                <Box mt={3} mb={3}>
                  <Divider className="dividerStyle" />
                </Box>
                {removeBadgeAlert.message && (
                  <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
                    <Alert onClose={onRemoveBadgeCloseAlert} severity={removeBadgeAlert.serverity}>
                      {removeBadgeAlert.message}
                    </Alert>
                  </div>
                )}
                <ManageBadgeList
                  BadgeListItems={allocationData}
                  BadgeListItemsIsLoading={isLoadingAllocationList}
                  onDeleteBadgeHandle={onDeleteBadgeHandle}
                  page={page}
                  rowsPerPage={badgeRowsPerPage}
                >
                  <AppTablePagination
                    data={allocationData}
                    page={page}
                    rowsPerPage={badgeRowsPerPage}
                    rowsPerPageOptions={APP_TABLE_CONFIGS.BADGE_ROWS_PER_PAGE_OPTIONS}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeBadgeRowsPerPage}
                  />
                </ManageBadgeList>
              </>
            )}
            {value === 3 && (
              <>
                {resignationPostAlert.message && (
                  <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
                    <Alert
                      onClose={closeResignationPostAlert}
                      severity={resignationPostAlert.severity}
                    >
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
                  isMainGrid={false}
                />
                <Box mt={3} mb={3}>
                  <Divider className="dividerStyle" />
                </Box>
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
                  resignationRowData={resignationRowData ? resignationRowData : []}
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
                    data={resignationRowData ? resignationRowData : []}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </ResignationListTableView>
              </>
            )}
            {value === 4 && (
              <>
                <EditConfirmationDate
                  userLeavesDetails={userDetails}
                  confirmationLeaveDate={initialUpdateUserData}
                  handleConfirmationDateChange={handleConfirmationDateChange}
                  minDate={getConfirmationMinDate()}
                  maxDate={getConfirmationMaxDate()}
                />
                <Box mt={3} mb={3}>
                  <Divider className="dividerStyle" />
                </Box>
                <LeaveConfiguration
                  annualLeaveCountData={annualLeaveCountData}
                  casualLeaveCountData={casualLeaveCountData}
                  countedLeaveDataState={countedLeaveDataState}
                  userLeavesDetails={userDetails}
                  isAthenaAuthorized={isAthenaAuthorized}
                  hasConfirmationDate={hasUnchangedConfirmationDate}
                  leaveDataIsLoading={leaveDataIsLoading}
                  countedLeaveDataIsLoading={countedLeaveDataIsLoading}
                  leaveCountFormData={leaveCountFormData}
                  onLeaveCountChange={onLeaveCountChange}
                  onUpdateLeaveUser={onUpdateLeaveUser}
                  getUserListLoading={getUserListLoading}
                />
              </>
            )}
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
        <RemovePopUp
          isOpen={isRemovePopUpOpen}
          onClose={onRemovePopUpClose}
          onConfirm={onConfirmRemove}
        />
      </AppLayout>
    </React.Fragment>
  )
}

export default EditUser
