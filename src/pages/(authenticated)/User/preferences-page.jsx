import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
// import { getAuth } from "firebase/auth";
import { useMemo, useState } from "react";
// import { useParams } from "react-router-dom";
import useFireUser from "../../../hooks/use-fire-user";
import { themeModeOptions } from "../../../theme/theme-tokens";
import { useAppTheme } from "../../../theme";

const PreferencesPage = () => {
  // const { userId } = useParams();
  // TODO: db에 userId 존재하지 root 또는 userNotFound page 표시
  const [loading, setLoading] = useState(false);

  // const { currentUser } = getAuth();
  const { updateUserPreferencesSetting } = useFireUser();
  const { themeMode, setThemeMode } = useAppTheme();
  const [themeValue, setSelectedTheme] = useState();

  const selectedTheme = useMemo(() => {
    return themeModeOptions.find((theme) =>
      themeValue ? theme.id === themeValue.id : theme.id === themeMode
    );
  }, [themeMode, themeValue]);

  const handleUpdateUserPreferences = async () => {
    try {
      setLoading(true);
      await updateUserPreferencesSetting({ theme: selectedTheme.id });
      setThemeMode(selectedTheme.id);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Stack mt={5} spacing={2}>
      <Stack>
        <Typography variant="h5">Preferences</Typography>
        Manage your preferences
      </Stack>

      <Divider />

      <Stack direction={"row"} spacing={2}>
        <Stack spacing={2} width={"100%"}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Box flexGrow={1}>
              <Typography variant="body1" fontWeight={"bold"}>
                Interface theme
              </Typography>
              <Typography variant="body2">
                Select your interface color scheme
              </Typography>
            </Box>

            <Autocomplete
              // disablePortal
              id="preferences-theme-combo"
              sx={{
                width: "200px",
              }}
              value={selectedTheme}
              onChange={(_, value) => setSelectedTheme(value)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              options={themeModeOptions}
              renderInput={(params) => (
                <TextField {...params} label="Theme" size="small" />
              )}
            />
          </Stack>
        </Stack>
      </Stack>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          sx={{ boxShadow: "none", fontWeight: "normal" }}
          disabled={loading}
          onClick={handleUpdateUserPreferences}
        >
          Update
        </Button>
      </Box>
    </Stack>
  );
};

export default PreferencesPage;
