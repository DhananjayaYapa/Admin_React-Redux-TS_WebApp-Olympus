import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close'

const BadgePreview: React.FC<{ name:string | null; open: boolean; imageUrl: string | null; onClose: () => void }> = ({
  name,
  open,
  imageUrl,
  onClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="banner-preview-dialog"
    >
      <DialogTitle
        id="banner-preview-dialog"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <span>{name}</span>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          minHeight: '400px',
        }}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Banner Preview"
            style={{
              maxWidth: '100%',
              maxHeight: '70vh',
              objectFit: 'contain',
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default BadgePreview
