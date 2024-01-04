import { useParams } from "react-router-dom";

const UserScreen = () => {
  const { userId } = useParams();
  return <div>{userId}</div>;
};

export default UserScreen;
