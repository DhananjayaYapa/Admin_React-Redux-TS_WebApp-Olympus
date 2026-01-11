import React, { type ReactNode } from 'react'
import { Link } from 'react-router-dom'

const RestrictedAccessLink: React.FC<{
  allowedRoleId: number[]
  className: string
  route: string
  children: ReactNode
}> = (props) => {
  return (
    <Link className={props.className} to={props.route}>
      {props.children}
    </Link>
  )
}

export default RestrictedAccessLink
