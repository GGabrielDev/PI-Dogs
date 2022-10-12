import { Route, Routes } from "react-router-dom";
import { AppFrame } from "./components/GenericComponents";
import Landing from "./pages/Landing";
import DogsList from "./pages/DogsList";
import DogsDetails from "./pages/DogsDetails";
import DogsCreate from "./pages/DogsCreate";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <AppFrame>
      <Routes>
        <Route path="/">
          <Route index element={<Landing />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<DogsList />} />
            <Route path="details" element={<DogsDetails />} />
            <Route path="create" element={<DogsCreate />} />
          </Route>
        </Route>
      </Routes>
    </AppFrame>
  );
};

export default App;
