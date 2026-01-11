import React from 'react'
import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardMedia,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import type { GetFlyerListDto, TagsDto, TypeDto } from '../../../utilities/models'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

const FlyersList: React.FC<{
  availableTypes: TypeDto[]
  availableTags: TagsDto[]
  onFilterTypeChange: (type: TypeDto | null) => void
  onFilterTagChange: (tag: TagsDto | null) => void
  selectedType: TypeDto | null
  selectedTag: TagsDto | null
  onFilter: () => void
  onClear: () => void
  flyerListItems: GetFlyerListDto[]
  children: React.ReactNode
  page: number
  rowsPerPage: number
  onDeleteFlyerHandle: (flyer: GetFlyerListDto) => void
  flyerListItemsIsLoading: boolean
}> = (props) => {
  return (
    <Grid container spacing={2} justifyContent="flex-end">
      <Grid size={{ xs: 12, sm: 12, md: 3 }}>
        <Autocomplete
          fullWidth
          size="small"
          value={props.selectedType}
          options={props.availableTypes}
          getOptionLabel={(option) => option.typeName}
          isOptionEqualToValue={(option, value) => option.typeId === value.typeId}
          onChange={(_event, newValue) => props.onFilterTypeChange(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Flyer Type"
              color="primary"
              placeholder="Select Flyer Type"
            />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 3 }}>
        <Autocomplete
          fullWidth
          size="small"
          value={props.selectedTag}
          options={props.availableTags}
          getOptionLabel={(option) => option.tagName}
          isOptionEqualToValue={(option, value) => option.tagId === value.tagId}
          onChange={(_event, newValue) => props.onFilterTagChange(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Tag" color="primary" placeholder="Select Tag" />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 'auto' }} container spacing={2}>
        <Button variant="contained" color="primary" onClick={props.onFilter}>
          Filter
        </Button>
        <Button variant="contained" color="primary" onClick={props.onClear}>
          Clear
        </Button>
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 12 }} container spacing={2} mt={2}>
        {!props.flyerListItemsIsLoading &&
          props.flyerListItems?.length > 0 &&
          (props.rowsPerPage > 0
            ? props.flyerListItems.slice(
                props.page * props.rowsPerPage,
                props.page * props.rowsPerPage + props.rowsPerPage
              )
            : props.flyerListItems
          ).map((flyer) => (
            <Grid key={flyer.id} size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={flyer.filePath}
                  alt={flyer.greeting}
                  sx={{ objectFit: 'cover' }}
                />
                <CardActions
                  sx={{
                    backgroundColor: '#e3e3e3',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Typography variant="body2" color="#000000ff" fontSize={15}>
                      {flyer.tag}
                    </Typography>
                    <InfoOutlinedIcon sx={{ color: 'blue', cursor: 'pointer' }} />
                  </div>
                  <IconButton
                    size="small"
                    sx={{ color: 'error.main' }}
                    onClick={() => props.onDeleteFlyerHandle(flyer)}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        {props.flyerListItemsIsLoading && (
          <Grid size={{ xs: 12 }}>
            <Typography align="center">
              <CircularProgress color="primary" size={20} /> Loading...
            </Typography>
          </Grid>
        )}
        {!props.flyerListItemsIsLoading &&
          (!props.flyerListItems || props.flyerListItems.length === 0) && (
            <Grid size={{ xs: 12 }}>
              <Typography align="center">No Records Available.</Typography>
            </Grid>
          )}
      </Grid>
      {props.children}
    </Grid>
  )
}

export default FlyersList
