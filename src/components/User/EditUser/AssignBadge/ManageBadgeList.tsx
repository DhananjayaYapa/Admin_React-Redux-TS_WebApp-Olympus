import {
  Card,
  CardActions,
  CardMedia,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import type { BadgeTableDetailsDto } from '../../../../utilities/models/badge.model'

const ManageBadgeList: React.FC<{
  BadgeListItems: BadgeTableDetailsDto[]
  BadgeListItemsIsLoading: boolean
  page: number
  rowsPerPage: number
  children?: React.ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDeleteBadgeHandle: (badge: any) => void
}> = (props) => {
  return (
    <Grid size={{ xs: 12, sm: 12, md: 12 }} container spacing={2} mt={2}>
      <Grid size={{ xs: 12, sm: 12, md: 12 }}>
        <Typography fontSize={20} flexBasis={1}>
          Manage Badges
        </Typography>
      </Grid>
      {!props.BadgeListItemsIsLoading &&
        props.BadgeListItems?.length > 0 &&
        (props.rowsPerPage > 0
          ? props.BadgeListItems.slice(
              props.page * props.rowsPerPage,
              props.page * props.rowsPerPage + props.rowsPerPage
            )
          : props.BadgeListItems
        ).map((badge) => (
          <Grid key={badge.id} size={{ xs: 12, sm: 6, md: 3, lg: 3 }} mt={1}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={badge.url}
                alt={badge.description}
                sx={{ objectFit: 'cover' }}
              />
              <CardActions
                sx={{
                  backgroundColor: '#ffffffff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2" color="textSecondary">
                  {badge.title}
                </Typography>
                <IconButton
                  size="small"
                  sx={{ color: 'error.main' }}
                  onClick={() => props.onDeleteBadgeHandle(badge)}
                >
                  <RemoveCircleOutlineOutlinedIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      {props.BadgeListItemsIsLoading && (
        <Grid size={{ xs: 12 }}>
          <Typography align="center">
            <CircularProgress color="primary" size={20} /> Loading...
          </Typography>
        </Grid>
      )}
      {!props.BadgeListItemsIsLoading &&
        (!props.BadgeListItems || props.BadgeListItems.length === 0) && (
          <Grid size={{ xs: 12 }}>
            <Typography align="center">No Records Available.</Typography>
          </Grid>
        )}
      <Grid size={{ xs: 12 }} container justifyContent="flex-end">
        {props.children}
      </Grid>
    </Grid>
  )
}
export default ManageBadgeList
