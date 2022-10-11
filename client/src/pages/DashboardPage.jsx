import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { DashboardFrame } from "../components/GenericComponents";

const DashboardPage = () => {
  return (
    <DashboardFrame>
      <NavigationBar />
      <Outlet />
    </DashboardFrame>
  );
};

export default DashboardPage;
