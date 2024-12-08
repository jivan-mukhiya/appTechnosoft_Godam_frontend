import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5"; // Import the icons
import LinkUtils from "../Utils/LinkUtils";

function SideBar() {
  const [isOpen, setIsOpen] = useState(false); // Manage the sidebar state
  const [employeeDropdown, setEmployeeDropdown] = useState(false); // Manage employee dropdown state
  const [salesDropdown, setSalesDropdown] = useState(false); // Manage sales dropdown state

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex">
      <div
        className={`bg-gray-800 text-white ${isOpen ? "w-64" : "w-16"} transition-all duration-300 h-screen space-y-6 px-2 py-7`}
      >
        {/* Sidebar toggle button */}
        <div className="flex justify-between items-center">
          <h2 className={`text-2xl font-bold text-center ${isOpen ? "" : "hidden"}`}>GODAM</h2>
          <button onClick={toggleSidebar} className="text-white text-2xl">
            {isOpen ? <IoClose /> : <IoMenu />} {/* Toggle between close and menu icons */}
          </button>
        </div>

        {/* NavUtils component for dynamic navigation */}
        <ul className={`space-y-4 ${isOpen ? "" : "hidden"}`}>
          <li>
            <LinkUtils
              name="Home"
              to="/home"
              className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
            />
          </li>
          <li>
            <LinkUtils
              name="Category"
              to="/category"
              className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
            />
          </li>
          <li>
            <LinkUtils
              name="Customer"
              to="/customer"
              className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
            />
          </li>
          <li>
            <LinkUtils
              name="Product"
              to="/product"
              className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
            />
          </li>

          <li>
            <LinkUtils
              name="Order"
              to="/order"
              className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
            />
          </li>

          <li>
            <LinkUtils
              name="Payment"
              to="/payment"
              className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
            />
          </li>

          {/* Employee dropdown */}
          <li>
            <button
              onClick={() => setEmployeeDropdown(!employeeDropdown)}
              className="w-full text-white hover:bg-gray-700 px-3 py-2 rounded-md flex justify-between items-center"
            >
              Employee
              <span className="ml-2">{employeeDropdown ? "▲" : "▼"}</span>
            </button>
            {employeeDropdown && (
              <ul className="pl-6 space-y-2">
                <li>
                  <LinkUtils
                    name="Employee List"
                    to="/employee/list"
                    className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                  />
                </li>
                <li>
                  <LinkUtils
                    name="Employee Details"
                    to="/employee/details"
                    className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                  />
                </li>
              </ul>
            )}
          </li>

          {/* Sales dropdown */}
          <li>
            <button
              onClick={() => setSalesDropdown(!salesDropdown)}
              className="w-full text-white hover:bg-gray-700 px-3 py-2 rounded-md flex justify-between items-center"
            >
              Sales
              <span className="ml-2">{salesDropdown ? "▲" : "▼"}</span>
            </button>
            {salesDropdown && (
              <ul className="pl-6 space-y-2">
                <li>
                  <LinkUtils
                    name="Sales Overview"
                    to="/sales/overview"
                    className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                  />
                </li>
                <li>
                  <LinkUtils
                    name="Sales Reports"
                    to="/sales/reports"
                    className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                  />
                </li>
              </ul>
            )}
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default SideBar;
