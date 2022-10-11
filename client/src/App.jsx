import { Route, Routes } from "react-router-dom";
import { AppFrame } from "./components/GenericComponents";
import TitlePage from "./pages/TitlePage";
import DogsPage from "./pages/DogsPage";
import DogsDetailsPage from "./pages/DogsDetailsPage";
import DogsCreatePage from "./pages/DogsCreatePage";
import DashboardPage from "./pages/DashboardPage";

const App = () => {
  return (
    <AppFrame>
      <Routes>
        <Route path="/">
          <Route index element={<TitlePage />} />
          <Route path="dashboard" element={<DashboardPage />}>
            <Route index element={<DogsPage />} />
            <Route path="details" element={<DogsDetailsPage />} />
            <Route path="create" element={<DogsCreatePage />} />
          </Route>
        </Route>
      </Routes>
    </AppFrame>
  );
};

export default App;
