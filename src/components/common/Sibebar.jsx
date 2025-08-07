import { FaPlus, FaSearch, FaHashtag } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AddProject from "../modal/AddProject";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import { deleteProjectWithVersions } from "../../services/firstoreServices";

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const auth = useContext(AuthContext);
  const { projectTypes, handleSearchText } = auth;
  const [hideSidebar, setHideSideBar] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  console.log("🚀 ~ Sidebar ~ hideSidebar:", hideSidebar);

  // useEffect(() => {
  //   let timeout;
  //   if (hideSidebar) {
  //     timeout = setTimeout(() => {
  //       setShowToggle(true);
  //     }, 500); // match your transition duration
  //   } else {
  //     setShowToggle(false);
  //   }

  //   return () => clearTimeout(timeout);
  // }, [hideSidebar]);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setHideSideBar(false); // Always show on medium and up
      }
    };

    // Initial check
    handleResize();

    // Listen for screen resize
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAddproject = () => {
    setShowModal(true);
  };

  // Delete project
  const handleDeleteProject = async (name) => {
    try {
      await deleteProjectWithVersions(name);
      toast.success("Project deleted successfully.");
    } catch (error) {
      console.log("Error deleting project:", error);
      toast.error("Failed to delete project.");
    }
  };

  return (
    <div>
      {hideSidebar && (
        <div
          onClick={() => setHideSideBar(false)}
          className="fixed top-5 left-5 z-50 transition-opacity duration-1000"
        >
          <RiMenuFold2Line className="text-gray-600 hover:cursor-pointer text-xl" />
        </div>
      )}
      <div
        className={`absolute left-0 md:relative h-screen bg-[#f9fcfe] shadow-lg transition-all duration-500 transform p-4 overflow-hidden ${
          hideSidebar
            ? "-translate-x-full w-0"
            : "translate-x-0 md:w-56 lg:w-72"
        }`}
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
              <span className="text-sm font-medium text-gray-800 uppercase whitespace-nowrap">
                IT Corner
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <FiBell className="text-gray-600 hover:cursor-pointer" />

              <RiMenuUnfold2Line
                className="text-gray-600 hover:cursor-pointer text-lg"
                onClick={() => setHideSideBar(true)}
              />
            </div>
          </div>

          {/* Add Task */}
          <button
            className="flex items-center text-[#02448E] text-sm font-semibold space-x-2 px-2 mb-4 hover:cursor-pointer"
            onClick={handleAddproject}
          >
            <FaPlus />
            <span className="whitespace-nowrap">Add Project</span>
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
                onChange={(e) => handleSearchText(e.target.value)}
                className="w-full border-none outline-none placeholder:text-gray-700 text-sm"
              />
            </div>
            <div>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-2  py-2 rounded overflow-hidden ${
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
              <h3 className="text-sm font-semibold text-gray-500 whitespace-nowrap">
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
                        <div className="flex items-center justify-between w-full group">
                          <div className="flex items-center space-x-2">
                            <FaHashtag
                              color={isActive ? "white" : `${item?.color}`}
                            />
                            <span>{item.name}</span>
                          </div>
                          <span
                            className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDeleteProject(item.name);
                            }}
                          >
                            <AiOutlineDelete
                              color={isActive ? "white" : "red"}
                            />
                          </span>
                        </div>
                      )}
                    </NavLink>
                  </div>
                ))}
            </nav>
          </div>
        </div>

        {/* Bottom Help */}
        {/* <div className="text-xs text-gray-600 flex items-center space-x-2 hover:underline cursor-pointer">
        <span className="text-[#02448E] text-[10px]">●</span>
        <span>Help & resources</span>
      </div> */}
      </div>
      {/* Show Modal Section Start Here*/}
      {showModal && <AddProject onClose={() => setShowModal(false)} />}
      {/* Show Modal Section End Here*/}
    </div>
  );
};

export default Sidebar;
