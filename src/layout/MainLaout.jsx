import { Suspense } from "react";
import { Outlet } from "react-router";
import Loader from "../components/common/Loader";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sibebar";

const MainLayout = () => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <Suspense fallback={<Loader />}>
        <div className="flex-1 h-screen p-4 overflow-y-scroll ">
          <div className="w-2/3 mx-auto ">
            <Outlet />
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default MainLayout;
