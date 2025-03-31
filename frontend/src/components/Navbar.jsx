import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  RiLogoutBoxRLine, 
  RiDatabase2Line, 
  RiAddCircleLine, 
  RiDownloadCloud2Line,
  RiMenuLine,
  RiCloseLine
} from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle logout
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Admin Logged Out Successfully");
    setIsMobileMenuOpen(false);
  };

  // Handle backup download
  const handleBackupDownload = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/purchases`);
      const data = response.data;
      
      // Create a blob from the data
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.download = `vendor_database_backup_${new Date().toISOString().split('T')[0]}.json`;
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL
      window.URL.revokeObjectURL(url);
      
      toast.success("Database backup downloaded successfully!");
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Error downloading backup:", error);
      toast.error("Failed to download database backup. Please try again.");
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Navbar button component
  const NavButton = ({ to, onClick, icon: Icon, text, className = "" }) => (
    <Link
      to={to}
      onClick={onClick}
      className={`font-medium rounded-md text-white px-3 py-2 hover:opacity-90 text-sm flex items-center justify-center gap-2 w-full ${className}`}
    >
      <Icon className="text-xl" />
      <span>{text}</span>
    </Link>
  );

  return (
    <div className="relative bg-white shadow-md">
      {/* Main Navbar */}
      <div className="flex items-center justify-between py-4 px-4 sm:px-6">
        {/* Logo */}
        <Link
          to="/welcome"
          className="flex-shrink-0 w-[100px] sm:w-[150px] h-auto cursor-pointer transition duration-300 transform hover:scale-110"
        >
          <img
            className="w-auto h-12"
            src={logo}
            alt="Logo"
          />
        </Link>

        {/* Title - Hidden on mobile */}
        <h3 className="hidden sm:block text-xl md:text-2xl lg:text-3xl font-bold text-russian_violet text-center flex-grow">
          Vendor Database Management System
        </h3>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <NavButton
            to="/view"
            icon={RiDatabase2Line}
            text="View Database"
            className="bg-blue-500"
          />
          <NavButton
            to="/add"
            icon={RiAddCircleLine}
            text="Add to Database"
            className="bg-green-500"
          />
          <button
            onClick={handleBackupDownload}
            className="bg-purple-500 font-medium rounded-md text-white px-5 py-2 hover:bg-purple-600 text-sm flex items-center justify-center gap-2"
          >
            <RiDownloadCloud2Line className="text-xl" />
            <span>Download Backup</span>
          </button>
          <button
            onClick={onSubmitHandler}
            className="bg-red-700 font-medium rounded-md text-white px-5 py-2 hover:bg-russian_violet text-sm flex items-center justify-center gap-2"
          >
            <RiLogoutBoxRLine className="text-xl" />
            <span>Logout</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
        >
          {isMobileMenuOpen ? (
            <RiCloseLine className="text-2xl text-gray-600" />
          ) : (
            <RiMenuLine className="text-2xl text-gray-600" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute right-0 top-full bg-white shadow-lg rounded-lg p-4 w-64 z-50">
          <div className="flex flex-col gap-2">
            <NavButton
              to="/view"
              icon={RiDatabase2Line}
              text="View Database"
              className="bg-blue-500"
            />
            <NavButton
              to="/add"
              icon={RiAddCircleLine}
              text="Add to Database"
              className="bg-green-500"
            />
            <button
              onClick={handleBackupDownload}
              className="bg-purple-500 font-medium rounded-md text-white px-5 py-2 hover:bg-purple-600 text-sm flex items-center justify-center gap-2"
            >
              <RiDownloadCloud2Line className="text-xl" />
              <span>Download Backup</span>
            </button>
            <button
              onClick={onSubmitHandler}
              className="bg-true_blue font-medium rounded-md text-white px-5 py-2 hover:bg-russian_violet text-sm flex items-center justify-center gap-2"
            >
              <RiLogoutBoxRLine className="text-xl" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;