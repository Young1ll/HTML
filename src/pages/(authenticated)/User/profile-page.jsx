import { Edit } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { getAuth } from "firebase/auth";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useFireUser from "../../../hooks/use-fire-user";

const ProfilePage = () => {
  const { userId } = useParams();
  // TODO: db에 userId 존재하지 root 또는 userNotFound page 표시

  const { currentUser } = getAuth();
  const { updateUserProfile } = useFireUser();

  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [phoneNumber, setphoneNumber] = useState(currentUser.phoneNumber || "");
  const [initilalProfile] = useState(currentUser.photoURL);
  const [profilePic, setProfilePic] = useState({});
  const inputFileRef = useRef(null);

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic({ file: file, url: URL.createObjectURL(file) });
    }
  };

  // https://stackoverflow.com/a/41249579/22627916
  const handleProfileUpdate = async () => {
    const userData = {
      displayName,
      photo: profilePic, // url과 file 전송
      phoneNumber,
    };
    try {
      setLoading(true);
      await updateUserProfile(userData);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <Stack mt={5} spacing={2}>
      <Stack>
        <Typography variant="h5">Profile</Typography>
        Manage your profile information
      </Stack>

      <Divider />

      <Stack direction={"row"} spacing={2}>
        <input
          ref={inputFileRef}
          hidden
          value={""} // prevent null error
          onChange={handleProfileChange}
          id="profilePic"
          type="file"
          accept="image/*"
        />
        <label
          htmlFor="profilePic"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            alt={currentUser.displayName}
            src={profilePic.url || initilalProfile}
            sx={{ width: 150, height: 150 }}
          />
          <IconButton
            sx={{
              backgroundColor: "background.default",
              ":hover": { backgroundColor: "background.paper" },
              // backgroundColor: "white",
              border: "1px solid #ccc",
              position: "absolute",
              bottom: 30,
              right: 0,
            }}
            onClick={() => inputFileRef.current.click()}
          >
            <Edit />
          </IconButton>
        </label>

        <Stack spacing={2} width={"100%"}>
          <Stack direction={"row"} spacing={1}>
            <Typography variant="body1" fontWeight={"bold"}>
              Email
            </Typography>
            <Typography fontWeight={"bold"}>{currentUser.email}</Typography>
          </Stack>

          <Box>
            <Typography variant="body1" fontWeight={"bold"}>
              Username
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </Box>

          <Box>
            <Typography variant="body1" fontWeight={"bold"}>
              Phone<i>(Now unavailable)</i>
            </Typography>

            <TextField
              fullWidth
              size="small"
              placeholder="Phone Number(optional)"
              disabled
              value={phoneNumber}
              onChange={(e) => setphoneNumber(e.target.value)}
            />
          </Box>
        </Stack>
      </Stack>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          sx={{ boxShadow: "none", fontWeight: "normal" }}
          onClick={handleProfileUpdate}
          disabled={loading}
        >
          Update
        </Button>
      </Box>
    </Stack>
  );
};

export default ProfilePage;
