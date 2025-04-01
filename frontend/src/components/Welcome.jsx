import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { 
  RiDatabase2Line, 
  RiAddCircleLine, 
  RiLogoutBoxRLine,
  RiArrowRightLine,
  RiDashboardLine,
  RiUserSettingsLine,
  RiBuildingLine,
  RiStoreLine,
  RiGlobalLine,
  RiBox3Line
} from "react-icons/ri";
import logo from "../assets/logo.png";

const Welcome = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [stats, setStats] = useState({
    totalProducts: 0,
    Manufacturers: 0,
    Distributors: 0,
    Importers: 0,
    Traders: 0,
    recentUpdates: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/purchases`);
      const data = response.data;

      // Calculate statistics
      const now = new Date();
      const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

      // Get  vendors by business type
      const Vendors = {
        manufacturers: new Set(data.filter(v => v.businessType === "Manufacturer").map(v => v.vendorName)),
        distributors: new Set(data.filter(v => v.businessType === "Distributor").map(v => v.vendorName)),
        importers: new Set(data.filter(v => v.businessType === "Importer").map(v => v.vendorName)),
        traders: new Set(data.filter(v => v.businessType === "Trader").map(v => v.vendorName))
      };

      const stats = {
        totalProducts: data.length,
        Manufacturers: Vendors.manufacturers.size,
        Distributors: Vendors.distributors.size,
        Importers: Vendors.importers.size,
        Traders: Vendors.traders.size,
        recentUpdates: data.filter(v => new Date(v.date) > thirtyDaysAgo).length
      };

      setStats(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      toast.error("Failed to load statistics");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Logged out successfully!");
  };

  const ActionCard = ({ title, description, icon: Icon, onClick, color, gradient }) => (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${color} ${gradient}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-3">
            <div className={`p-2 rounded-lg ${gradient} mr-3`}>
              <Icon className="text-2xl text-white" />
            </div>
            <h3 className="text-xl text-white font-semibold text-gray-900">{title}</h3>
          </div>
          <p className="text-white text-sm font-semibold">{description}</p>
        </div>
        <RiArrowRightLine className="text-xl text-gray-400 ml-4" />
      </div>
    </div>
  );

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="text-xl text-white" />
        </div>
      </div>
      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
        </div>
      ) : (
        <>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={logo}
                alt="Logo"
                className="h-12 w-auto transform hover:scale-105 transition duration-300"
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Vendor Management System
                </h1>
                <p className="text-sm text-gray-500">Admin Dashboard</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300"
            >
              <RiLogoutBoxRLine className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-100 mb-4">
            <RiDashboardLine className="text-3xl text-blue-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Welcome to the Dashboard
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Manage your vendor database efficiently with our comprehensive tools and features.
          </p>
        </div>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <ActionCard
            title="View Database"
            description="Access and manage your existing vendor records with detailed information and search capabilities."
            icon={RiDatabase2Line}
            onClick={() => navigate("/view")}
            color="hover:bg-blue-50"
            gradient="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <ActionCard
            title="Add New Vendor"
            description="Add a new vendor to your database with comprehensive details and documentation."
            icon={RiAddCircleLine}
            onClick={() => navigate("/add")}
            color="hover:bg-green-50"
            gradient="bg-gradient-to-br from-green-500 to-green-600"
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            icon={RiBox3Line}
            color="bg-blue-500"
            subtitle="Total product entries"
          />
          <StatCard
            title="Manufacturers"
            value={stats.Manufacturers}
            icon={RiBuildingLine}
            color="bg-green-500"
            subtitle="Direct manufacturers"
          />
          <StatCard
            title="Distributors"
            value={stats.Distributors}
            icon={RiStoreLine}
            color="bg-purple-500"
            subtitle="Distribution partners"
          />
          <StatCard
            title="Importers"
            value={stats.Importers}
            icon={RiGlobalLine}
            color="bg-yellow-500"
            subtitle="International vendors"
          />
          <StatCard
            title="Traders"
            value={stats.Traders}
            icon={RiStoreLine}
            color="bg-red-500"
            subtitle="Trading partners"
          />
          <StatCard
            title="Recent Updates"
            value={stats.recentUpdates}
            icon={RiUserSettingsLine}
            color="bg-indigo-500"
            subtitle="Last 30 days"
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;