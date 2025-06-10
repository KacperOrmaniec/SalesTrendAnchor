import React from "react";
import {
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

export const NotificationContext = React.createContext();

export function useNotification() {
  return React.useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
  const [notification, setNotification] = React.useState(null);
  const [confirmation, setConfirmation] = React.useState(null);

  const showNotification = (message, severity = "info") => {
    setNotification({ message, severity });
  };

  const showConfirmation = (title, message, onConfirm) => {
    setConfirmation({ title, message, onConfirm });
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  const handleCloseConfirmation = () => {
    setConfirmation(null);
  };

  const handleConfirm = () => {
    if (confirmation?.onConfirm) {
      confirmation.onConfirm();
    }
    handleCloseConfirmation();
  };

  return (
    <NotificationContext.Provider
      value={{ showNotification, showConfirmation }}
    >
      {children}
      <Snackbar
        open={!!notification}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification?.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notification?.message}
        </Alert>
      </Snackbar>

      <Dialog
        open={!!confirmation}
        onClose={handleCloseConfirmation}
        aria-labelledby="confirmation-dialog-title"
      >
        <DialogTitle id="confirmation-dialog-title">
          {confirmation?.title}
        </DialogTitle>
        <DialogContent>{confirmation?.message}</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} color="primary">
            Anuluj
          </Button>
          <Button
            onClick={handleConfirm}
            color="primary"
            variant="contained"
            autoFocus
          >
            Potwierdź
          </Button>
        </DialogActions>
      </Dialog>
    </NotificationContext.Provider>
  );
}
