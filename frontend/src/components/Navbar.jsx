import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RiLogoutBoxRLine, RiDatabase2Line, RiAddCircleLine, RiEditBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Admin Logged Out Successfully");
  };

  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      {/* Logo */}
      <Link to="/welcome">
        <img
          className="w-[max(10%,150px)] cursor-pointer transition duration-300 transform hover:scale-110"
          src={logo}
          alt="Logo"
        />
      </Link>

      {/* Buttons Section */}
      <div className="flex items-center gap-4">
        {/* View Database Button */}
        <Link
          to="/view"
          className="bg-blue-500 font-medium rounded-md text-white px-5 py-2 sm:px-7 sm:py-2 hover:bg-blue-600 text-base sm:text-base flex items-center justify-center gap-2"
        >
          <RiDatabase2Line className="text-xl sm:text-lg" />
          <span>View Database</span>
        </Link>

        {/* Add to Database Button */}
        <Link
          to="/add"
          className="bg-green-500 font-medium rounded-md text-white px-5 py-2 sm:px-7 sm:py-2 hover:bg-green-600 text-base sm:text-base flex items-center justify-center gap-2"
        >
          <RiAddCircleLine className="text-xl sm:text-lg" />
          <span>Add to Database</span>
        </Link>

        {/* Edit Database Button */}
        <Link
          to="/edit"
          className="bg-yellow-500 font-medium rounded-md text-white px-5 py-2 sm:px-7 sm:py-2 hover:bg-yellow-600 text-base sm:text-base flex items-center justify-center gap-2"
        >
          <RiEditBoxLine className="text-xl sm:text-lg" />
          <span>Edit Database</span>
        </Link>

        {/* Logout Button */}
        <button
          onClick={onSubmitHandler}
          className="bg-true_blue font-medium rounded-md text-white px-5 py-2 sm:px-7 sm:py-2 hover:bg-russian_violet text-base sm:text-base flex items-center justify-center gap-2"
        >
          <RiLogoutBoxRLine className="text-xl sm:text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;