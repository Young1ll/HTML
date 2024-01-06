import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  loader: true,
  isLoggedIn: false,
  boards: [],
  areBoardsFetched: false,
  toastrMsg: "",
  toastrSeverity: "info", // info, success, warning, error
  setToastr: (toastrMsg, toastrSeverity) =>
    set({ toastrMsg, toastrSeverity }, false, "setToastr"),
  setBoards: (boards) =>
    set({ boards, areBoardsFetched: true }, false, "setBoards"),
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
        boards: [],
        areBoardsFetched: false,
      },
      false,
      "setLoginStatus"
    ),
});

const useStore = create(devtools(store));

export default useStore;
