import { Button, Dialog, Stack, TextField } from "@mui/material";
import ModalHeader from "../../components/layouts/ModalHeader";
import { useState } from "react";
import useStore from "../../store";
import useFireUser from "../../hooks/use-fire-user";

const ResetPasswordModal = ({ closeModal }) => {
  const { setToastr } = useStore();
  const { sendResetPwEmail } = useFireUser();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      await sendResetPwEmail(email);
      setToastr("Please check your email", "success");
      closeModal();
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Dialog fullWidth maxWidth="xs" open onClose={closeModal}>
      <Stack p={2}>
        <ModalHeader title={"Reset Password"} onClose={closeModal} />

        <Stack mb={5} spacing={2}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Stack>

        <Button
          variant="contained"
          size="large"
          disabled={loading}
          onClick={handleResetPassword}
        >
          Create
        </Button>
      </Stack>
    </Dialog>
  );
};

export default ResetPasswordModal;
