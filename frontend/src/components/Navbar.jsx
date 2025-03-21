import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RiLogoutBoxRLine, RiDatabase2Line, RiAddCircleLine, RiEditBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // Handle logout
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Admin Logged Out Successfully");
  };

  return (
    <div className="flex items-center justify-between py-4 px-0 bg-white shadow-md">
      {/* Logo */}
      <Link
        to="/welcome"
        className="flex-shrink-0 w-[100px] sm:w-[150px] h-auto ml-4 sm:ml-6 cursor-pointer transition duration-300 transform hover:scale-110"
      >
        <img
          className="w-auto h-12"
          src={logo}
          alt="Logo"
        />
      </Link>

      {/* Title */}
      <h3 className="hidden sm:block text-xl md:text-2xl lg:text-3xl font-bold text-russian_violet text-center flex-grow">
        Vendor Database Management System
      </h3>

      {/* Buttons Section */}
      <div className="flex items-center gap-2 sm:gap-4 mr-4 sm:mr-6">
        {/* View Database Button */}
        <Link
          to="/view"
          className="bg-blue-500 font-medium rounded-md text-white px-3 py-2 sm:px-5 sm:py-2 hover:bg-blue-600 text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2"
        >
          <RiDatabase2Line className="text-lg sm:text-xl" />
          <span className="hidden sm:inline">View Database</span>
        </Link>

        {/* Add to Database Button */}
        <Link
          to="/add"
          className="bg-green-500 font-medium rounded-md text-white px-3 py-2 sm:px-5 sm:py-2 hover:bg-green-600 text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2"
        >
          <RiAddCircleLine className="text-lg sm:text-xl" />
          <span className="hidden sm:inline">Add to Database</span>
        </Link>

        {/* Edit Database Button */}
        <Link
          to="/edit"
          className="bg-yellow-500 font-medium rounded-md text-white px-3 py-2 sm:px-5 sm:py-2 hover:bg-yellow-600 text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2"
        >
          <RiEditBoxLine className="text-lg sm:text-xl" />
          <span className="hidden sm:inline">Edit Database</span>
        </Link>

        {/* Logout Button */}
        <button
          onClick={onSubmitHandler}
          className="bg-true_blue font-medium rounded-md text-white px-3 py-2 sm:px-5 sm:py-2 hover:bg-russian_violet text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2"
        >
          <RiLogoutBoxRLine className="text-lg sm:text-xl" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;