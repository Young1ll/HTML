import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import useStore from "../store";
import { useNavigate } from "react-router-dom";

const useApp = () => {
  const navigate = useNavigate();
  const { boards, addBoard, setBoards, setToastr } = useStore();
  const {
    currentUser: { uid },
  } = getAuth();

  const boardCollRef = collection(db, `users/${uid}/boards`);

  const deleteBoard = async (boardId) => {
    const docRef = doc(db, `users/${uid}/boards/${boardId}`);
    try {
      await deleteDoc(docRef);

      const tempBoards = boards.filter((board) => board.id !== boardId); // 기존 boards에서 boardId 제외
      setBoards(tempBoards);

      navigate("/boards");
    } catch (err) {
      setToastr("Error deleting board", "error");
      throw err;
    }
  };

  const updateBoardData = async (boardId, tabs) => {
    const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
    try {
      await updateDoc(docRef, { tabs, lastUpdated: serverTimestamp() });
    } catch (err) {
      setToastr("Error updating board", "error");
      throw err;
    }
  };

  const fetchBoard = async (boardId) => {
    const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
    try {
      const doc = await getDoc(docRef); // WARNING: getDoc() vs getDocs()
      if (doc.exists) {
        return doc.data();
      } else return null;
    } catch (err) {
      setToastr("Error fetching board", "error");
      throw err;
    }
  };

  const updateBoard = async ({ boardId, name, description, color }) => {
    const boardDocRef = doc(db, `users/${uid}/boards/${boardId}`);
    const boardDataDocRef = doc(db, `users/${uid}/boardsData/${boardId}`);
    try {
      await updateDoc(boardDocRef, { name, description, color });
      await updateDoc(boardDataDocRef, { lastUpdated: serverTimestamp() });
    } catch (err) {
      setToastr("Error while updating board", "error");
      throw err;
    }
  };

  const createBoard = async ({ name, color }) => {
    try {
      const doc = await addDoc(boardCollRef, {
        name,
        description: "",
        color,
        createdAt: serverTimestamp(), //<-- serverTimestamp 알아보기: https://medium.com/firebase-developers/the-secrets-of-firestore-fieldvalue-servertimestamp-revealed-29dd7a38a82b
      });
      addBoard({
        name,
        description: "",
        color,
        createdAt: new Date().toLocaleString("en-US"),
        id: doc.id,
      });
    } catch (err) {
      setToastr("Error creating board", "error");
      throw err;
    }
  };

  const fetchBoards = async (setLoading) => {
    try {
      const q = query(boardCollRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const boards = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate().toLocaleString("en-US"),
      }));

      setBoards(boards);
    } catch (err) {
      setToastr("Error fetching boards", "error");
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  return {
    createBoard,
    updateBoard,
    fetchBoard,
    fetchBoards,
    updateBoardData,
    deleteBoard,
  };
};

export default useApp;
