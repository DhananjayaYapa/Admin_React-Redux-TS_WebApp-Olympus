import React from 'react'
import type { FeatureDto } from '../../../utilities/models'

const AppAuthorizer: React.FC<{
  activeRoleFeatures: FeatureDto[]
  authorizedFeatureKey: string[]
  children: React.ReactNode
}> = (props) => {
  return (
    <React.Fragment>
      {props.authorizedFeatureKey.every((role) =>
        props.activeRoleFeatures.map((i) => i.featureKey).includes(role)
      ) ? (
        props.children
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  )
}
export default AppAuthorizer
