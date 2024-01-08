import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import useStore from "../store";
import { db, auth, storage } from "../firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  updatePhoneNumber,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const useFireUser = () => {
  const { setToastr } = useStore();
  const navigate = useNavigate();

  const getUserPreferences = async () => {
    const {
      currentUser: { uid },
    } = getAuth();

    const userDocRef = doc(db, `users/${uid}`);

    try {
      const userDoc = await getDoc(userDocRef);
      return userDoc.data();
    } catch (error) {
      setToastr("Error while getting user preferences", "error");
      throw error;
    }
  };
  const updateUserPreferencesSetting = async (userData) => {
    const {
      currentUser: { uid },
    } = getAuth();
    const userDocRef = doc(db, `users/${uid}`);
    const { theme } = userData;

    try {
      await setDoc(userDocRef, {
        theme: theme,
        lastUpdated: serverTimestamp(),
      });

      setToastr("User preferences updated!", "success");
    } catch (err) {
      setToastr("Error while updating user preferences", "error");
      throw err;
    }
  };

  const updateUserProfile = async (userData) => {
    if (!userData || !currentUser) {
      setToastr("Invalid user data or user not logged in", "error");
      return;
    }
    console.log(userData);
    const { displayName, photo, phoneNumber } = userData;
    const { currentUser, uid = currentUser.uid } = auth;
    try {
      if (photo) {
        const photoRef = ref(storage, `users/${uid}/profile`);
        const upload = await uploadBytes(photoRef, photo.file);
        const photoURL = await getDownloadURL(upload.ref);

        await updateProfile(currentUser, {
          displayName: displayName,
          photoURL: photoURL,
        });
      } else {
        await updateProfile(currentUser, {
          displayName: displayName,
        });
      }
      if (phoneNumber) await updatePhoneNumber(currentUser, phoneNumber); // phone은 민감한 정보로, phoneAuthCredential 객체 필요

      setToastr("User profile updated", "success");
    } catch (error) {
      setToastr(error.message, "error");
      throw error;
    }
  };

  const sendResetPwEmail = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      const parts = err.message.match(/\(([^)]+)\)/)[1].split("/");
      const errCode = parts[parts.length - 1].replace(/-/g, " ").toLowerCase();
      const formattedErrCode =
        errCode.charAt(0).toUpperCase() + errCode.slice(1);

      setToastr(formattedErrCode, "error");
      throw err;
    }
  };

  const signUpAndSaveUserData = async ({
    username,
    email,
    password,
    userData,
  }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: username || email.split("@")[0],
        photoURL: userData.photoURL || "",
      });

      const userDocRef = doc(db, `users/${user.uid}`); // 해당 사용자의 문서 참조

      await setDoc(userDocRef, {
        theme: userData.theme,
        language: userData.language,
        socials: [],
        role: userData.role,
        ...userData,
        createdAt: serverTimestamp(),
      });

      await sendEmailVerification(auth.currentUser);

      navigate("/"); //NOTE: 분리하는게 좋을까.
      await signOut(auth);

      setToastr(
        "Welcome to minimumKanban! Check your email to verify your account.",
        "success"
      );
    } catch (err) {
      console.log(err);
      setToastr("Error creating user data", "error");
      throw err;
    }
  };

  return {
    sendResetPwEmail,
    signUpAndSaveUserData,
    updateUserProfile,
    updateUserPreferencesSetting,
    getUserPreferences,
  };
};

export default useFireUser;
