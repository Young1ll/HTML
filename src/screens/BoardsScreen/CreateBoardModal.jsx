import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ModalHeader from "../../components/layouts/ModalHeader";

import { colors } from "../../theme";
import useApp from "../../hooks/use-app";
import useStore from "../../store";

const CreateBoardModal = ({ closeModal }) => {
  const { createBoard } = useApp();
  const { setToastr } = useStore();
  const [name, setName] = useState("");
  const [color, setColor] = useState(0); // index
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    // console.log({ name, color });
    const trimmedName = name.trim();
    if (!trimmedName)
      return setToastr("Board name cannot be empty!", "warning");
    if (!/^[a-zA-Z0-9ㄱ-힣\s]{1,25}$/.test(trimmedName))
      return setToastr(
        "Board name cannot contain special characters and should be 25 characters!",
        "warning"
      );

    try {
      setLoading(true);
      await createBoard({ name: trimmedName, color });
      closeModal();
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <Dialog fullWidth maxWidth="xs" open onClose={closeModal}>
      <Stack p={2}>
        <ModalHeader title={"Create Board"} onClose={closeModal} />

        <Stack mb={5} spacing={2}>
          <TextField
            label="Board Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Stack direction={"row"} spacing={1}>
            <Typography>Color: </Typography>

            {colors.map((c, i) => (
              <Box
                key={c}
                sx={{
                  height: 25,
                  width: 25,
                  borderRadius: "50%",
                  border: color === i ? "3px solid #383838" : "none",
                  outline: color === i ? `2px solid ${c}` : "none",
                  bgcolor: c,
                  cursor: "pointer",
                }}
                onClick={() => setColor(i)}
              />
            ))}
          </Stack>
        </Stack>

        <Button
          variant="contained"
          size="large"
          disabled={loading}
          onClick={handleCreate}
        >
          Create
        </Button>
      </Stack>
    </Dialog>
  );
};

export default CreateBoardModal;
