/* eslint-disable react/prop-types */
import { IoLogOut } from "react-icons/io5";
import Search from "./Search";
import Button from "./Button";

function TopSideBar({ onLogout }) {
  return (
    <header className="bg-gray-800 text-white p-4 w-full">
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Logo or Title */}
        <div className="text-2xl font-bold mb-2 md:mb-0">GODAM</div>

        {/* Search Bar */}
        <div className="w-full md:w-auto flex justify-center md:flex-grow">
          <Search
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-green-500 ml-96"
            name="Search"
            placeholder="Search..."
            buttonStyle="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center shadow"
          />
        </div>

        {/* Logout Button */}
        <div className="mt-2 md:mt-0">
          <Button
            onClick={onLogout} // Trigger the logout function
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full flex items-center space-x-2"
            icon={IoLogOut} // Icon for the button
            name="Logout" // Button text
          />
        </div>
      </div>
    </header>
  );
}

export default TopSideBar;
