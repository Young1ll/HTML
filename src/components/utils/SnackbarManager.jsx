import { Alert, Snackbar } from "@mui/material";
import useStore from "../../store";

const SnackbarManager = () => {
  const { toastrMsg, toastrServerity, setToastr } = useStore();

  return (
    <Snackbar
      open={!!toastrMsg}
      autoHideDuration={3000}
      onClose={() => setToastr("", toastrServerity)}
    >
      <Alert severity={toastrServerity}>{toastrMsg}</Alert>
    </Snackbar>
  );
};

export default SnackbarManager;
