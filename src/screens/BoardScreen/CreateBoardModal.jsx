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

const CreateBoardModal = ({ closeModal }) => {
  const { createBoard } = useApp();
  const [name, setName] = useState("");
  const [color, setColor] = useState(0); // index
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    console.log({ name, color });

    try {
      setLoading(true);
      await createBoard({ name, color });
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

        <Stack my={5} spacing={2}>
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
