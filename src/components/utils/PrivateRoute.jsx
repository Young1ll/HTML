import { Navigate } from "react-router-dom";
import useStore from "../../store";
import { useEffect } from "react";

const PrivateRoute = ({ Component }) => {
  const { isLoggedIn } = useStore();
  useEffect(() => {
    console.log(isLoggedIn);
  }, []);

  return !isLoggedIn ? <Navigate to="/" replace /> : <Component />;
};

export default PrivateRoute;
