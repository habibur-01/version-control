import { Suspense, useContext } from "react";
import { Outlet } from "react-router";
import Loader from "../components/common/Loader";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sibebar";
import MobileNavbar from "../components/common/MobileNavbar";
import { AuthContext } from "../AuthProvider/AuthProvider";
import AddVersion from "../components/modal/AddVersion";

const MainLayout = () => {
  const auth = useContext(AuthContext);
  const { showModal } = auth;
  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Sidebar />
      <Suspense fallback={<Loader />}>
        <div className="flex-1 h-screen p-4 overflow-y-scroll transition-all duration-300 ease-in-out">
          <div className="w-11/12 md:w-10/12 xl:w-2/3 mx-auto overflow-hidden">
            <Outlet />
          </div>
        </div>
      </Suspense>
      {showModal && <AddVersion />}
      {/* Footer */}
      <MobileNavbar />
    </div>
  );
};

export default MainLayout;
