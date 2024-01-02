import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  loader: true,
  isLoggedIn: false,
  boards: [],
  areBoardFetched: false,
  setBoards: (boards) =>
    set({ boards, areBoardFetched: true }, false, "setBoards"),
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
