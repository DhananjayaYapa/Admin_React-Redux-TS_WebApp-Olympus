import Breadcrumbs from '@mui/material/Breadcrumbs'
import styles from './AppLayoutHeader.module.scss'
import { Link } from '@mui/material'
import type { BreadCrumbDto } from '../../utilities/models'
import { APP_ROUTES } from '../../utilities/constants'

interface AppLayoutHeaderProps {
  componentBreadCrumb: BreadCrumbDto[]
}

const AppLayoutHeader = ({ componentBreadCrumb }: AppLayoutHeaderProps) => {
  return (
    <div className={styles.pageTitle}>
      <Breadcrumbs
        aria-label="breadcrumb"
        style={{
          fontSize: '14px',
        }}
        className="breadcrumb"
      >
        <Link color="inherit" href={APP_ROUTES.USERS} underline="none">
          Dashboard
        </Link>
        {componentBreadCrumb &&
          componentBreadCrumb.length > 0 &&
          componentBreadCrumb.map((breadcrumb) => (
            <Link
              key={breadcrumb.id}
              color="inherit"
              href={breadcrumb.path}
              style={{
                textDecoration: 'none',
              }}
            >
              {breadcrumb.title}
            </Link>
          ))}
      </Breadcrumbs>
    </div>
  )
}
export default AppLayoutHeader
