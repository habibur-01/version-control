import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaProjectDiagram } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const MobileNavbar = () => {
  const auth = useContext(AuthContext);
  const { handleVersion } = auth;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 block md:hidden bg-[#F5F5F5] border-t border-gray-300">
      <ul className="flex justify-around items-center h-16">
        {/* Dashboard */}
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center ${
                isActive ? "text-[#02448E]" : "text-gray-600"
              } text-sm`
            }
          >
            <MdDashboard className="text-xl" />
            <span>Dashboard</span>
          </NavLink>
        </li>

        {/* Center Action Button */}
        <li className="relative -mt-6" onClick={handleVersion}>
          <span className="h-14 w-14 rounded-full bg-blue-500 flex justify-center items-center text-white shadow-lg">
            <IoIosAddCircleOutline className="text-3xl" />
          </span>
        </li>

        {/* Projects */}
        <li>
          <NavLink
            to="/projects"
            className="flex flex-col items-center text-gray-600 text-sm"
            activeclassname="text-blue-500"
          >
            <FaProjectDiagram className="text-xl" />
            <span>Projects</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default MobileNavbar;
