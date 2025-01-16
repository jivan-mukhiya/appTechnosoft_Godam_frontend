import { useState } from "react";
import { IoMenu, IoClose, IoHome, IoList, IoPerson, IoStorefrontSharp, IoBagCheck, IoCashSharp, IoChevronDownOutline, IoChevronUp, IoPeople, IoStatsChartSharp, IoPersonAdd, IoAlbums } from "react-icons/io5"; // Import the icons
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
        className={`bg-gray-800 text-white ${isOpen ? "w-64" : "w-16"} transition-all duration-300 h-screen space-y-6 px-2 py-7 overflow-y-auto`}
      >
        {/* Sidebar toggle button */}
        <div className="flex justify-between items-center">
          <h2 className={`text-2xl font-bold text-center ${isOpen ? "" : "hidden"}`}>GODAM</h2>
          <button onClick={toggleSidebar} className="text-white text-2xl">
            {isOpen ? <IoClose /> : <IoMenu />} {/* Toggle between close and menu icons */}
          </button>
        </div>

        {/* NavUtils component for dynamic navigation */}
        <ul className={`space-y-4  ${isOpen ? "" : "hidden"}`}>
          <li>
            <LinkUtils
            icon={IoHome}
              name="Home"
              to="/home"
              className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
            />
          </li>
          <li>
            <LinkUtils
            icon={IoList}
              name="Category"
              to="/category"
              className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
            />
          </li>
          <li>
            <LinkUtils
            icon={IoPerson}
              name="Customer"
              to="/customer"
              className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
            />
          </li>
          <li>
            <LinkUtils
            icon={IoStorefrontSharp}
              name="Product"
              to="/product"
              className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
            />
          </li>

          <li>
            <LinkUtils
            icon={IoBagCheck}
              name="Order"
              to="/order"
              className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
            />
          </li>

          <li>
            <LinkUtils
            icon={IoCashSharp}
              name="Payment"
              to="/payment"
              className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
            />
          </li>

          {/* Employee dropdown */}
          <li>
            <button
              onClick={() => setEmployeeDropdown(!employeeDropdown)}
              className="text-white hover:bg-gray-700 px-3 py-2 rounded-md flex items-center gap-3 text-sm font-medium w-full"
              >
              <IoPeople className="w-5 h-5" />
              Employee
              <span className="ml-auto">{employeeDropdown ? <IoChevronUp className="w-5 h-5"/> : <IoChevronDownOutline className="w-5 h-5"/>}</span>
            </button>
            {employeeDropdown && (
              <ul className="pl-6 space-y-2">
                <li>
                  <LinkUtils
                  icon={IoPersonAdd}
                    name="Add Employee"
                    to="/employee/add"
                    className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                  />
                </li>
                <li>
                  <LinkUtils
                  icon={IoAlbums}
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
              className="text-white hover:bg-gray-700 px-3 py-2 rounded-md flex items-center gap-3 text-sm font-medium w-full"
            >
              <IoStatsChartSharp />

              Sales
              <span className="ml-auto">{salesDropdown ? <IoChevronUp className="w-5 h-5"/> : <IoChevronDownOutline className="w-5 h-5"/>}</span>
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
