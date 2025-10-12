import { Outlet } from "react-router-dom";
import StaffHeader from "./components/StaffHeader";
import StaffFooter from "./components/StaffFooter";

const StaffPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <StaffHeader />
      <main className="flex-1 bg-gray-100">
        <Outlet />
      </main>
      <StaffFooter />
    </div>
  );
};

export default StaffPage;
