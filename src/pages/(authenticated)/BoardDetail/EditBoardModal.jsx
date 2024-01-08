import { useEffect, useRef, useState } from "react";
import useApp from "../../../hooks/use-app";
import useStore from "../../../store";
import useKeypress from "../../../hooks/use-keypress";

import { colors } from "../../../theme";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { SpaceDashboard } from "@mui/icons-material";
import ModalHeader from "../../../components/layouts/ModalHeader";

const EditBoardModal = ({ board, handleLastUpdated, closeModal }) => {
  const { updateBoard, fetchBoards } = useApp();
  const { setToastr } = useStore();

  const [name, setName] = useState(board.name);
  const [description, setDescription] = useState(board.description);
  const [color, setColor] = useState(board.color); // index

  const [loading, setLoading] = useState(false);
  const inputRef = useRef(); // for programatically autoFocus

  const handleUpdate = async () => {
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
      await updateBoard({
        boardId: board.id,
        name: trimmedName,
        description,
        color,
      });
      await fetchBoards();
      handleLastUpdated();
      closeModal();
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useKeypress("Escape", closeModal);
  // useKeypress("Enter", handleUpdate); // Enter 방지

  // autoFocus: MUI autoFocus가 작동하지 않아 수동으로 설정
  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Dialog fullWidth maxWidth="xs" open onClose={closeModal}>
      <Stack p={2}>
        <ModalHeader title={"Edit Board"} onClose={closeModal} />

        <Stack mb={5} spacing={2}>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <IconButton sx={{ borderRadius: ".5rem", width: 40, height: 40 }}>
              <SpaceDashboard />
            </IconButton>

            <TextField
              label="Board Name"
              value={name}
              fullWidth
              onChange={(e) => setName(e.target.value)}
              inputRef={inputRef}
            />
          </Stack>

          <TextField
            label="Description(optional)"
            value={description}
            fullWidth
            multiline
            rows={2}
            inputProps={{ maxLength: 100 }}
            onChange={(e) => setDescription(e.target.value)}
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
          onClick={handleUpdate}
        >
          Create
        </Button>
      </Stack>
    </Dialog>
  );
};

export default EditBoardModal;
