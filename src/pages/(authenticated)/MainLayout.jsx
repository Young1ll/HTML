import { useState } from "react";
import AppTopbar from "../../components/layouts/AppTopbar";
import { Outlet } from "react-router-dom";
import CreateBoardModal from "./CreateBoardModal";

const MainLayout = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <AppTopbar />
      {showModal && <CreateBoardModal closeModal={() => setShowModal(false)} />}
      <Outlet context={[{ showModal, setShowModal }]} />
    </>
  );
};

export default MainLayout;
