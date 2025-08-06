import { FaPlus, FaSearch, FaHashtag } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import AddProject from "../modal/AddProject";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const auth = useContext(AuthContext);
  const { projectTypes } = auth;

  const handleAddproject = () => {
    setShowModal(true);
  };

  return (
    <div
      className={`w-72 h-screen bg-[#f9fcfe] p-4 flex flex-col justify-between shadow-lg`}
    >
      {/* Top Section */}
      <div>
        {/* Profile */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <img
              src="/logo.png" // Placeholder image
              alt="User"
              className="h-6 w-6"
            />
            <span className="text-sm font-medium text-gray-800 uppercase">
              IT Corner
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FiBell className="text-gray-600 hover:cursor-pointer" />
          </div>
        </div>

        {/* Add Task */}
        <button
          className="flex items-center text-[#02448E] text-sm font-semibold space-x-2 px-2 mb-4 hover:cursor-pointer"
          onClick={handleAddproject}
        >
          <FaPlus />
          <span>Add Project</span>
        </button>

        {/* Navigation */}
        <nav className="space-y-3 text-gray-700 text-sm">
          <div className="flex items-center space-x-2 px-2 hover:text-black cursor-pointer">
            <span>
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="w-full border-none outline-none placeholder:text-gray-700 text-sm"
            />
          </div>
          <div>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-2  py-2 rounded ${
                  isActive ? "bg-[#02448E] text-white" : "hover:text-black"
                }`
              }
            >
              <MdDashboard size={18} />
              <span>{"Dashboard"}</span>
            </NavLink>
          </div>
        </nav>

        {/* My Projects */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-500 ">
              My Projects
            </h3>
            <div
              onClick={handleAddproject}
              className="hover:bg-gray-100 rounded-full p-2 cursor-pointer"
            >
              <AiOutlinePlus />
            </div>
          </div>
          <nav className="space-y-3 text-gray-700 text-sm">
            {projectTypes &&
              projectTypes.length > 0 &&
              projectTypes.map((item, index) => (
                <div key={index}>
                  <NavLink
                    to={`/version/${item.name}`}
                    className={({ isActive }) =>
                      `flex items-center space-x-2 px-2  py-2 rounded ${
                        isActive
                          ? "bg-[#02448E] text-white"
                          : "hover:text-black"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <FaHashtag
                          color={isActive ? "white" : `${item?.color}`}
                        />
                        <span>{item.name}</span>
                      </>
                    )}
                  </NavLink>
                </div>
              ))}
          </nav>
        </div>
      </div>

      {/* Show Modal Section Start Here*/}
      {showModal && <AddProject onClose={() => setShowModal(false)} />}
      {/* Show Modal Section End Here*/}

      {/* Bottom Help */}
      {/* <div className="text-xs text-gray-600 flex items-center space-x-2 hover:underline cursor-pointer">
        <span className="text-[#02448E] text-[10px]">●</span>
        <span>Help & resources</span>
      </div> */}
    </div>
  );
};

export default Sidebar;
