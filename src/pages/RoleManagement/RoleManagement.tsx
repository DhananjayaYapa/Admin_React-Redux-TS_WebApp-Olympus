import React, { useEffect, useState } from 'react'
import { AppLayout } from '../../templates'
import { Alert, Box, Divider, Grid, Tab, Tabs } from '@mui/material'
import { APPLICATION_IDS, BREAD_CRUMB } from '../../utilities/constants'
import {
  RoleAccordion,
  AthenaRoleManagement,
  DemeterRoleManagement,
  HermesRoleManagement,
  HeraRoleManagement,
} from '../../components'
import type {
  AppStateDto,
  GetApplicationFeaturesDto,
  setUserRoleDto,
  AvailableCurrentFeatureListDto,
  FeatureDto,
} from '../../utilities/models'
import { useSelector, useDispatch } from 'react-redux'
import { alertActions, roleActions } from '../../redux/actions'
import styles from './RoleManagement.module.scss'

const RoleManagement: React.FC = () => {
  const appMap = [
    APPLICATION_IDS.ATHENA,
    APPLICATION_IDS.HERA,
    APPLICATION_IDS.HERMES,
    APPLICATION_IDS.DEMETER,
  ]

  const roleComponents = [
    AthenaRoleManagement,
    HeraRoleManagement,
    HermesRoleManagement,
    DemeterRoleManagement,
  ]
  const dispatch = useDispatch()
  const userRolesData = useSelector((state: AppStateDto) => state.role.getUserRoles.data)
  const featuresData = useSelector((state: AppStateDto) => state.role.getFeatures.data)
  const permissionUpdateAlert = useSelector(
    (state: AppStateDto) => state.alert.UpdatePermissionAlert
  )
  const roleFeaturesIsloding = useSelector((state: AppStateDto) => state.role.getFeatures.isLoading)
  const roleDataIsloding = useSelector((state: AppStateDto) => state.role.getUserRoles.isLoading)
  const isSaving = useSelector((state: AppStateDto) => state.role.updatePermission.isLoading)

  const [value, setValue] = useState(0)
  const [features, setFeatures] = useState<GetApplicationFeaturesDto | null>(null)
  const [userRoleData, setUserRoleData] = useState<setUserRoleDto | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // State to track modified permissions per role
  const [modifiedPermissions, setModifiedPermissions] = useState<Record<number, Set<number>>>({})

  useEffect(() => {
    dispatch(roleActions.getUserRoles({ applicationId: APPLICATION_IDS.ATHENA }))
    dispatch(roleActions.getFeaturesList({ applicationId: APPLICATION_IDS.ATHENA }))
  }, [dispatch])

  useEffect(() => {
    setUserRoleData(userRolesData)
    setFeatures(featuresData)
  }, [userRolesData, featuresData])

  // Initialize permissions when user roles data changes
  useEffect(() => {
    if (userRolesData?.userRoles) {
      const initialPermissions: Record<number, Set<number>> = {}
      userRolesData.userRoles.forEach((role: AvailableCurrentFeatureListDto) => {
        initialPermissions[role.userRoleId] = new Set(
          role.features.map((feature: FeatureDto) => feature.featureId)
        )
      })
      setModifiedPermissions(initialPermissions)
    }
  }, [userRolesData])

  const onChangeTabs = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    const appId = appMap[newValue] ?? APPLICATION_IDS.ATHENA
    dispatch(roleActions.getUserRoles({ applicationId: appId }))
    dispatch(roleActions.getFeaturesList({ applicationId: appId }))
  }

  const onHandleToggle = (roleId: number) => {
    return (featureId: number) => {
      return () => {
        setModifiedPermissions((prev) => {
          const roleCopy = new Set(prev[roleId] || [])

          if (roleCopy.has(featureId)) {
            roleCopy.delete(featureId)
          } else {
            roleCopy.add(featureId)
          }

          return {
            ...prev,
            [roleId]: roleCopy,
          }
        })
      }
    }
  }

  const onUpdatePermission = (roleId: number) => {
    return () => {
      const currentAppId = appMap[value] ?? APPLICATION_IDS.ATHENA
      const selectedFeatures = modifiedPermissions[roleId]
      const permissions = Array.from(selectedFeatures).map((featureId) => ({
        featureId,
      }))

      dispatch(
        roleActions.updatePermission({
          applicationId: currentAppId,
          userRoleId: roleId,
          permissions,
        })
      )
    }
  }

  const onRestoreDefault = (roleId: number) => {
    return () => {
      const role = userRolesData?.userRoles?.find(
        (r: AvailableCurrentFeatureListDto) => r.userRoleId === roleId
      )
      if (role) {
        setModifiedPermissions((prev) => ({
          ...prev,
          [roleId]: new Set(role.features.map((f: FeatureDto) => f.featureId)),
        }))
      }
    }
  }

  const filteredFeatures =
    features?.features?.filter((feature) =>
      feature.featureName.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? []

  const onSearchHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const onUpdatePermissionCloseAlert = () => {
    dispatch(alertActions.clearUpdatePermissionAlert())
  }

  const renderRoleAccordion = (roleFeatures: FeatureDto[], roleId: number) => (
    <RoleAccordion
      features={features}
      roleFeatures={roleFeatures}
      selectedFeatures={modifiedPermissions[roleId] || new Set()}
      onHandleToggle={onHandleToggle(roleId)}
      onUpdatePermission={onUpdatePermission(roleId)}
      onRestoreDefault={onRestoreDefault(roleId)}
      filteredFeatures={filteredFeatures}
      searchTerm={searchTerm}
      onSearchHandle={onSearchHandle}
      isSaving={isSaving}
    />
  )

  const RoleManagementComponent = roleComponents[value]

  return (
    <React.Fragment>
      <AppLayout breadcrumb={BREAD_CRUMB.ROLE_MANAGEMENT}>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <p
            style={{
              paddingBottom: 7,
              margin: 0,
              fontWeight: 400,
              fontSize: '24px',
            }}
          >
            Role Management
          </p>
        </Box>
        <Divider />
        <Grid container spacing={2} mt={2}>
          <Grid size={{ xs: 12, sm: 12, md: 3 }} className="sectionTitleHolder">
            <h3>Assign Roles and Features</h3>
            <p>
              Assign a feature or multiple features to <br />
              user roles using this section.
            </p>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 9 }}>
            <Tabs value={value} onChange={onChangeTabs} variant="scrollable">
              <Tab label="Athena" className={styles.tabStyle} />
              <Tab label="Hera" className={styles.tabStyle} />
              <Tab label="Hermes" className={styles.tabStyle} />
              <Tab label="Demeter" className={styles.tabStyle} />
            </Tabs>
            <Divider />
            {permissionUpdateAlert.message && (
              <div style={{ paddingTop: '5px', paddingBottom: '10px' }}>
                <Alert
                  onClose={onUpdatePermissionCloseAlert}
                  severity={permissionUpdateAlert.severity}
                >
                  {permissionUpdateAlert.message}
                </Alert>
              </div>
            )}
            <RoleManagementComponent
              userRoleData={userRoleData}
              roleDataIsloding={roleDataIsloding}
              roleFeaturesIsloding={roleFeaturesIsloding}
            >
              {renderRoleAccordion}
            </RoleManagementComponent>
          </Grid>
        </Grid>
      </AppLayout>
    </React.Fragment>
  )
}

export default RoleManagement
