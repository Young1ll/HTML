import useStore from "../../store";
import { useEffect } from "react";

const PublicOnlyRoute = ({ Component }) => {
  const { isLoggedIn } = useStore();
  useEffect(() => {
    console.log(isLoggedIn);
  }, []);
  // return isLoggedIn ? <Navigate to="/boards" replace /> : <Component />;
  return isLoggedIn ? null : <Component />;
};

export default PublicOnlyRoute;
