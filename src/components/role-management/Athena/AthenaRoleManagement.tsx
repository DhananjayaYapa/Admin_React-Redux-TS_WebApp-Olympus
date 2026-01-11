import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import type { FeatureDto, setUserRoleDto } from '../../../utilities/models'
import React from 'react'
import loaderGif from '../../../assets/images/loader.gif'

const AthenaRoleManagement: React.FC<{
  userRoleData: setUserRoleDto | null
  children(roleFeatures: FeatureDto[], roleId: number): React.ReactNode
  roleDataIsloding: boolean
  roleFeaturesIsloding: boolean
}> = (props) => {
  return (
    <Box sx={{ width: '100%' }}>
      {props.userRoleData?.userRoles?.map((role) => (
        <Accordion
          key={role.userRoleId}
          sx={{
            mt: 1.5,
            '&:before': {
              display: 'none',
            },
            boxShadow: 'none',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography component="span" fontSize="15px" sx={{ mr: 2 }}>
              {role.userRoleName}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>{props.children(role.features, role.userRoleId)}</AccordionDetails>
        </Accordion>
      ))}
      {props.roleFeaturesIsloding && props.roleDataIsloding && (
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
          <img src={loaderGif} alt="Loading..." style={{ width: '250px', height: '150px' }} />
        </Box>
      )}

      {!props.roleFeaturesIsloding &&
        !props.roleDataIsloding &&
        props.userRoleData?.userRoles?.length === 0 && (
          <Grid size={{ xs: 12 }} sx={{ textAlign: 'center', py: 2 }}>
            No Roles Available.
          </Grid>
        )}
    </Box>
  )
}

export default AthenaRoleManagement
