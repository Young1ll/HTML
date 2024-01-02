import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import useStore from "../store";

const useApp = () => {
  const { setBoards } = useStore();
  const {
    currentUser: { uid },
  } = getAuth();

  const boardCollRef = collection(db, `users/${uid}/boards`);

  const createBoard = async ({ name, color }) => {
    try {
      await addDoc(boardCollRef, {
        name,
        color,
        createAt: serverTimestamp(),
      });
    } catch (err) {
      //TODO: toast
      console.log(err);
      throw err;
    }
  };

  const fetchBoards = async (setLoading) => {
    try {
      const querySnapshop = await getDocs(boardCollRef);
      const boards = querySnapshop.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setBoards(boards);
    } catch (err) {
      //TODO: toast
      console.log(err);
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  return {
    createBoard,
    fetchBoards,
  };
};

export default useApp;
