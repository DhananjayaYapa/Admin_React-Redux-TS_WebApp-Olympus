import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function UserConfirmDialog({
  open,
  title = "Please Confirm",
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onClose,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      aria-labelledby="confirm-dialog"
      PaperProps={{
        sx: {
          borderRadius: "10px",
          paddingBottom: "10px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.0005)",
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0,0,0,0.05)", 
        },
      }}
    >
      {/* Title */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 600,
          fontSize: "1.1rem",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        {title}

        <IconButton onClick={onClose} sx={{ color: "grey.600" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ mt: 2, mb: 1 }}>
        <Typography>{message}</Typography>
      </DialogContent>

      {/* Buttons */}
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          variant="contained"
          onClick={onConfirm}
          sx={{
            textTransform: "none",
            backgroundColor: "#0d6efd",
            px: 3,
          }}
        >
          {confirmLabel}
        </Button>

        <Button
          variant="outlined"
          color="inherit"
          onClick={onClose}
          sx={{
            textTransform: "none",
            px: 3,
          }}
        >
          {cancelLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
