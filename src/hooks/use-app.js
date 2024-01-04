import {
  addDoc,
  collection,
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

const useApp = () => {
  const { boards, addBoard, setBoards, setToastr } = useStore();
  const {
    currentUser: { uid },
  } = getAuth();

  const boardCollRef = collection(db, `users/${uid}/boards`);

  const updateBoardData = async (boardId, tabs) => {
    const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
    try {
      await updateDoc(docRef, { tabs, lastUpdated: serverTimestamp() });
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Fetches the board data for a given board ID.
   *
   * @param {string} boardId - The ID of the board to fetch.
   * @return {object} The data of the fetched board, or undefined if the board does not exist.
   */
  const fetchBoard = async (boardId) => {
    const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
    try {
      const doc = await getDoc(docRef); // WARNING: getDoc() vs getDocs()
      if (doc.exists) {
        return doc.data();
      } else return null;
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Creates a board with the given name and color.
   *
   * @param {Object} param - An object containing the name and color of the board.
   * @param {string} param.name - The name of the board.
   * @param {string} param.color - The color of the board.
   * @return {Promise<void>} A promise that resolves when the board is successfully created.
   */
  const createBoard = async ({ name, color }) => {
    try {
      const doc = await addDoc(boardCollRef, {
        name,
        color,
        createdAt: serverTimestamp(), //<-- serverTimestamp 알아보기: https://medium.com/firebase-developers/the-secrets-of-firestore-fieldvalue-servertimestamp-revealed-29dd7a38a82b
      });
      addBoard({
        name,
        color,
        createdAt: new Date().toLocaleString("en-US"),
        id: doc.id,
      });
    } catch (err) {
      setToastr("Error creating board");
      throw err;
    }
  };

  /**
   * Fetches the boards from the server and sets them in the state.
   *
   * @param {function} setLoading - A function to set the loading state.
   * @return {void}
   */
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
      setToastr("Error fetching boards");
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  return {
    fetchBoard,
    fetchBoards,
    createBoard,
    updateBoardData,
  };
};

export default useApp;
