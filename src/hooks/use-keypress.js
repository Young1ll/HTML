import { useEffect } from "react";

const useKeypress = (targetKey, callback) => {
  useEffect(() => {
    const listener = (event) => {
      if (event.code === targetKey) {
        callback();
      }
    };

    document.addEventListener("keydown", listener);

    return () => {
      // 리스너 해제
      document.removeEventListener("keydown", listener);
    };
  }, [targetKey, callback]);
};

export default useKeypress;
