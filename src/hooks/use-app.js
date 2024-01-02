import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import useStore from "../store";

const useApp = () => {
  const { addBoard, setBoards } = useStore();
  const {
    currentUser: { uid },
  } = getAuth();

  const boardCollRef = collection(db, `users/${uid}/boards`);

  const createBoard = async ({ name, color }) => {
    try {
      await addDoc(boardCollRef, {
        name,
        color,
        createdAt: serverTimestamp(), //<-- serverTimestamp 알아보기: https://medium.com/firebase-developers/the-secrets-of-firestore-fieldvalue-servertimestamp-revealed-29dd7a38a82b
      });
      addBoard({
        name,
        color,
        createdAt: new Date().toLocaleDateString("en-US"),
      });
    } catch (err) {
      //TODO: toast
      console.log(err);
      throw err;
    }
  };

  const fetchBoards = async (setLoading) => {
    try {
      const q = query(boardCollRef, orderBy("createdAt", "desc"));
      const querySnapshop = await getDocs(q);
      const boards = querySnapshop.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate().toLocaleDateString("en-US"),
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
