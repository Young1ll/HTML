import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import useStore from "../store";
import { db, auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const useFireUser = () => {
  const { setToastr } = useStore();
  const navigate = useNavigate();

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

      await signOut(auth);
      navigate("/");

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
  };
};

export default useFireUser;
