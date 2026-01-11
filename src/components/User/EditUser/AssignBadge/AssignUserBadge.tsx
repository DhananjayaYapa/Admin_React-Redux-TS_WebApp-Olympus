import { Autocomplete, Button, CardMedia, Grid, TextField, Typography } from '@mui/material'
import type { BadgeTableDetailsDto } from '../../../../utilities/models/badge.model'
import badgeImage from '../../../../assets/images/badge.png'

interface AssignUserBadgeProps {
  badgeList: BadgeTableDetailsDto[]
  selectedBadge: { id: number; name: string } | null
  onBadgeChange: (value: { id: number; name: string } | null) => void
  onAssignBadge: () => void
}

const AssignUserBadge: React.FC<AssignUserBadgeProps> = (props) => {
  return (
    <Grid container spacing={2} mb={2}>
      <Grid size={{ xs: 12, sm: 12, md: 12 }}>
        <Typography fontSize={25} fontWeight="bold" flexBasis={1} mt={2}>
          Badge Management
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 12 }}>
        <Typography fontSize={20} flexBasis={1}>
          Assign Badge
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 4 }}>
        <Autocomplete
          size="small"
          value={props.selectedBadge}
          onChange={(_event, newValue) => props.onBadgeChange(newValue)}
          options={props.badgeList.map((badge) => {
            return { id: badge.id, name: badge.title }
          })}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.name || ''}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search Badge"
              label="Badge"
              color="primary"
              variant="outlined"
            />
          )}
        />
      </Grid>
      <Grid container spacing={2} size={{ xs: 12, sm: 12, md: 1 }} alignItems="flex-start">
        <Button variant="contained" color="primary" onClick={props.onAssignBadge}>
          Assign
        </Button>
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 4 }} alignSelf="flex-start">
        <CardMedia
          component="img"
          image={
            props.selectedBadge
              ? props.badgeList.find((b) => b.id === props.selectedBadge?.id)?.url || badgeImage
              : badgeImage
          }
          alt="Badge Preview"
          sx={{
            width: 220,
            height: 220,
            objectFit: 'contain',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
          }}
        />
      </Grid>
    </Grid>
  )
}

export default AssignUserBadge
