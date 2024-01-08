import { Navigate, Route, Routes } from "react-router-dom";

import PublicOnlyRoute from "./components/utils/PublicOnlyRoute";
import PrivateRoute from "./components/utils/PrivateRoute";

import AuthPage from "./pages/Auth/page";
import MainLayout from "./pages/(authenticated)/MainLayout";
import BoardListPage from "./pages/(authenticated)/BoardList/page";
import BoardDetailLayout from "./pages/(authenticated)/BoardDetail/layout";
import BoardDetailPage from "./pages/(authenticated)/BoardDetail/page";
import UserLayout from "./pages/(authenticated)/User/layout";
import ProfilePage from "./pages/(authenticated)/User/profile-page";
import PreferencesPage from "./pages/(authenticated)/User/preferences-page";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicOnlyRoute Component={AuthPage} />} />

      <Route element={<PrivateRoute Component={MainLayout} />}>
        <Route path="boards">
          <Route index element={<BoardListPage />} />

          <Route path=":boardId" element={<BoardDetailLayout />}>
            <Route index element={<BoardDetailPage />} />
          </Route>
        </Route>

        <Route path=":userId" element={<UserLayout />}>
          <Route index element={<Navigate to="settings/profile" />} />

          <Route path="settings">
            <Route index element={<Navigate to="profile" />} />

            <Route path="profile" element={<ProfilePage />} />
            <Route path="preferences" element={<PreferencesPage />} />
          </Route>
        </Route>
      </Route>

      <Route element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
