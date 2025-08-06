import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between border-b px-4 py-2 bg-white">
      {/* Left: Back Button */}
      <button className="border rounded px-3 py-1 text-sm text-gray-700 hover:bg-gray-100">
        ← Back to Sequences
      </button>

      {/* Center: Nav Tabs */}
      <ul className="flex space-x-6 text-sm font-medium text-gray-500">
        <li className="relative pb-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 border-b-2 border-blue-500"
                : "hover:text-gray-700"
            }
          >
            Home
          </NavLink>
        </li>

        {[
          "Overview",
          "Sequence Report",
          "Contacts",
          "Activity Log",
          "Settings",
        ].map((tab, index) => (
          <li key={index} className={`relative pb-2 `}>
            <NavLink
              to={`/${tab.toLowerCase().replace(/\s+/g, "-")}`}
              className={({ isActive }) =>
                `relative pb-2 ${
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-500"
                    : "hover:text-gray-700"
                }`
              }
            >
              {tab}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Right: Buttons */}
      <div className="flex items-center space-x-2">
        <div className="relative group">
          <button className="border rounded px-3 py-1 text-sm text-gray-700 hover:bg-gray-100">
            <NavLink to={"/add_project"}>+ Add Project</NavLink>
          </button>
          {/* Dropdown (optional) */}
          {/* <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow hidden group-hover:block">
            <div className="px-4 py-2 hover:bg-gray-100">From CSV</div>
            <div className="px-4 py-2 hover:bg-gray-100">Manually</div>
          </div> */}
        </div>
        <button className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700">
          Pause Campaign
        </button>
      </div>
    </div>
  );
};

export default Navbar;
