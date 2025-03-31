import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]); // All purchases fetched from the backend
  const [filteredPurchases, setFilteredPurchases] = useState([]); // Purchases filtered by search
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term

  // Fetch all purchases from the backend
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/purchases`);
        setPurchases(response.data);
        setFilteredPurchases(response.data); // Initialize filtered purchases with all data
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    };
    fetchPurchases();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase(); // Convert search term to lowercase
    setSearchTerm(term);

    // Filter purchases based on the search term
    const filtered = purchases.filter((purchase) =>
      Object.values(purchase).some((value) =>
        String(value).toLowerCase().includes(term)
      )
    );
    setFilteredPurchases(filtered);
  };

  // Reset the search term and clear the filter
  const handleClearSearch = () => {
    setSearchTerm(""); // Reset the search term
    setFilteredPurchases(purchases); // Show all purchases
  };

  // Handle edit button click
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
        Edit Vendor List
      </h1>

      {/* Search Bar with Cross Icon */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 pl-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {/* Cross Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2 text-center">ID</th>
            <th className="border p-2 text-center">Industries</th>
            <th className="border p-2 text-center">Type</th>
            <th className="border p-2 text-center">Product</th>
            <th className="border p-2 text-center">Vendor Name</th>
            <th className="border p-2 text-center">Business Type</th>
            <th className="border p-2 text-center">Source Type</th>
            <th className="border p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPurchases.map((purchase) => (
            <tr key={purchase.id} className="hover:bg-gray-50">
              <td className="border p-2 text-center">{purchase.id}</td>
              <td className="border p-2 text-center">{purchase.industries || "-"}</td>
              <td className="border p-2 text-center">{purchase.type || "-"}</td>
              <td className="border p-2 text-center">{purchase.product}</td>
              <td className="border p-2 text-center">{purchase.vendorName}</td>
              <td className="border p-2 text-center">{purchase.businessType}</td>
              <td className="border p-2 text-center">{purchase.sourceType || "-"}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleEdit(purchase.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Edit;