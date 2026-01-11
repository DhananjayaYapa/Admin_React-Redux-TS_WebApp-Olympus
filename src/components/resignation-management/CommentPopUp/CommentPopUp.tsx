import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { DemoPaper, DemoPaper2 } from '../../../assets/theme/theme'
import type { CommentDto } from '../../../utilities/models'
import moment from 'moment'
import { DATE_TIME_FORMAT_2 } from '../../../utilities/constants'

const CommentPopUp: React.FC<{
  isOpen: boolean
  onClose(): void
  comments: CommentDto[]
  onCommentHandleChange: (value: string) => void
  onAddComment: () => void
  initCommentValue: string
}> = (props) => {
  return (
    <Grid container spacing={2} m={1}>
      <Dialog open={props.isOpen} onClose={props.onClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'right',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <span>Comments</span>
          <IconButton
            aria-label="close"
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
            onClick={props.onClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} m={1}>
            <Grid size={{ sm: 12, xs: 12, md: 12 }} mt={2}>
              <TextField
                label="Comments"
                placeholder="Type Your Comment Here"
                variant="outlined"
                size="medium"
                multiline
                rows={3}
                fullWidth
                required
                value={props.initCommentValue}
                onChange={(e) => props.onCommentHandleChange(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12 }} display="flex" justifyContent="flex-end">
              <Button variant="contained" size="medium" onClick={props.onAddComment}>
                Add
              </Button>
            </Grid>

            {props.comments.map((commentItem, index) => (
              <Grid container spacing={1} mt={1} key={index} size={{ xs: 12, sm: 12, md: 12 }}>
                <Grid size={{ xs: 12, sm: 12, md: 2 }}>
                  <DemoPaper square={false} sx={{ backgroundColor: '#0166fe' }}>
                    <DemoPaper2
                      square={false}
                      sx={{
                        backgroundColor: '#0166fe',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'white',
                        boxShadow: 'none',
                      }}
                    >
                      {commentItem.createdBy?.charAt(0).toUpperCase() || 'U'}
                    </DemoPaper2>
                  </DemoPaper>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 5 }}>
                  <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} variant="body1">
                    {commentItem.createdBy || 'Unknown'}
                  </Typography>
                  <Typography variant="body2">{commentItem.comment}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 5 }} display="flex" justifyContent="flex-end">
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}
                  >
                    {moment(commentItem.createdAt).format(DATE_TIME_FORMAT_2)}
                  </Typography>
                </Grid>
                {index < props.comments.length - 1 && (
                  <Grid size={{ xs: 12 }} mt={1}>
                    <Divider />
                  </Grid>
                )}
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  )
}

export default CommentPopUp
