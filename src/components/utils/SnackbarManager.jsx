import { Alert, Snackbar } from "@mui/material";
import useStore from "../../store";
import { useEffect, useState } from "react";

const SnackbarManager = () => {
  const { toastrMsg, toastrSeverity, setToastr } = useStore();
  const [open, setOpen] = useState(false); // 스낵바의 open 상태를 관리합니다.

  useEffect(() => {
    if (toastrMsg) {
      setOpen(true);
    }
  }, [toastrMsg]);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setToastr("", "info");
      }, 1000);
    }
  }, [open]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert elevation={6} severity={toastrSeverity}>
        {toastrMsg}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarManager;
