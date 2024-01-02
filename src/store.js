import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  loader: true,
  isLoggedIn: false,
  boards: [],
  areBoardFetched: false,
  toastrMsg: "",
  setToastr: (toastrMsg) => set({ toastrMsg }, false, "setToastr"),
  setBoards: (boards) =>
    set({ boards, areBoardFetched: true }, false, "setBoards"),
  addBoard: (board) =>
    set(
      (old) => ({ ...old, boards: [board, ...old.boards] }), // 기본 최신순...
      false,
      "addBoard"
    ),
  setLoginState: (status) =>
    set(
      {
        isLoggedIn: status,
        loader: false,
      },
      false,
      "setLoginStatus"
    ),
});

const useStore = create(devtools(store));

export default useStore;
