import React, { useEffect, useState } from "react";
import axios from "axios";

const Purchases = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [purchases, setPurchases] = useState([]);
  const [filters, setFilters] = useState({});
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Control number of rows per page
  const [expandedRow, setExpandedRow] = useState(null); // Track which row is expanded

  // Fetch data from the backend
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get(API_URL + "/api/purchases");
        setPurchases(response.data);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    };
    fetchPurchases();
  }, []);

  // Filter data based on filters and search query
  const filteredData = purchases.filter((purchase) => {
    // Apply filters
    for (const key in filters) {
      if (filters[key] && !String(purchase[key]).toLowerCase().includes(filters[key].toLowerCase())) {
        return false;
      }
    }

    // Apply search query
    const values = Object.values(purchase).join(" ").toLowerCase();
    return values.includes(searchQuery.toLowerCase());
  });

  // Sort data based on sort criteria
  const sortedData = sortColumn
    ? [...filteredData].sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
      if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    })
    : filteredData;

  // Pagination Logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);

  // Handle sorting
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  // Get unique values for dropdowns
  const getUniqueValues = (key) => {
    return [...new Set(purchases.map((p) => p[key]))].filter(Boolean); // Remove null/undefined values
  };

  // Clear Filters Function
  const clearFilters = () => {
    setFilters({}); // Reset all filters
    setSearchQuery(""); // Reset search query
    setCurrentPage(1); // Reset to the first page
    setSortColumn(null); // Remove sorting column
    setSortOrder("asc"); // Reset sort order to default (ascending)
  };

  // Toggle expanded row
  const toggleExpandedRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id); // Collapse if already expanded, otherwise expand
  };

  return (
    <div className="p-4">
      {/* Search Bar, Rows Per Page, and Clear Filters Button */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition duration-300"
          >
            Clear Filters
          </button>
        </div>
        <div className="flex items-center">
          <span className="mr-2">Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to first page when changing rows per page
            }}
            className="px-2 py-1 border border-gray-300 rounded-md"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <h1 className="text-2xl font-bold mb-4">Purchase List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            {/* Filters Row */}
            <tr>
              {[
                "id",
                "industries",
                "type",
                "product",
                "vendorName",
                "businessType",
                "sourceType",
                "country",
                "make",
                "address",
                "contactPerson",
                "contactPhone",
                "contactEmail",
                "date",
                "remarks",
              ].map((column) => (
                <th key={column} className="border p-2">
                  {["industries", "type", "product", "vendorName", "businessType", "sourceType", "country", "make", "address", "contactPerson", "contactPhone", "contactEmail", "remarks"].includes(column) ? (
                    <select
                      value={filters[column] || ""}
                      onChange={(e) =>
                        setFilters({ ...filters, [column]: e.target.value || undefined })
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md"
                    >
                      <option value="">All</option>
                      {getUniqueValues(column).map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  ) : ["date"].includes(column) ? (
                    <input
                      type="date"
                      value={filters[column] || ""}
                      onChange={(e) =>
                        setFilters({ ...filters, [column]: e.target.value || undefined })
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md"
                    />
                  ) : (
                    <div></div> // Empty cell for columns without filters
                  )}
                </th>
              ))}
            </tr>

            {/* Column Headers Row */}
            <tr>
              {[
                "id",
                "industries",
                "type",
                "product",
                "vendorName",
                "businessType",
                "sourceType",
                "country",
                "make",
                "address",
                "contactPerson",
                "contactPhone",
                "contactEmail",
                "date",
                "remarks",
              ].map((column) => (
                <th
                  key={column}
                  className="border p-2 cursor-pointer text-center"
                  onClick={() => handleSort(column)}
                >
                  {column === "id"
                    ? "ID"
                    : column.charAt(0).toUpperCase() + column.slice(1).replace(/_/g, " ")}{" "}
                  {sortColumn === column && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((purchase) => (
                <React.Fragment key={purchase.id}>
                  <tr
                    onClick={() => toggleExpandedRow(purchase.id)}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <td className="border p-2 text-center">{purchase.id}</td>
                    <td className="border p-2">{purchase.industries || "-"}</td>
                    <td className="border p-2">{purchase.type || "-"}</td>
                    <td className="border p-2">{purchase.product}</td>
                    <td className="border p-2">{purchase.vendorName}</td>
                    <td className="border p-2">{purchase.businessType}</td>
                    <td className="border p-2">{purchase.sourceType || "-"}</td>
                    <td className="border p-2">{purchase.country || "-"}</td>
                    <td className="border p-2">{purchase.make || "-"}</td>
                    <td className="border p-2">{purchase.address}</td>
                    <td className="border p-2">{purchase.contactPerson}</td>
                    <td className="border p-2">{purchase.contactPhone}</td>
                    <td className="border p-2">{purchase.contactEmail}</td>
                    <td className="border p-2 text-center">
                      {new Date(purchase.date).toLocaleDateString()}
                    </td>
                    <td className="border p-2">{purchase.remarks || "-"}</td>
                  </tr>
                  {/* Expanded Row */}
                  {expandedRow === purchase.id && (
                    <tr>
                      <td colSpan="15" className="p-4 bg-gray-50">
                        {/* Card-like Container for Expanded Grades */}
                        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 space-y-4">
                          <h3 className="text-lg font-semibold text-gray-800">Grades</h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-600">TECH:</span>
                              <span className="text-base font-semibold text-gray-800">{purchase.TECH?.toString() || "0"}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-600">LR:</span>
                              <span className="text-base font-semibold text-gray-800">{purchase.LR?.toString() || "0"}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-600">AR:</span>
                              <span className="text-base font-semibold text-gray-800">{purchase.AR?.toString() || "0"}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-600">ACS:</span>
                              <span className="text-base font-semibold text-gray-800">{purchase.ACS?.toString() || "0"}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-600">FOOD:</span>
                              <span className="text-base font-semibold text-gray-800">{purchase.FOOD?.toString() || "0"}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-600">COSMETIC:</span>
                              <span className="text-base font-semibold text-gray-800">{purchase.COSMETIC?.toString() || "0"}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-600">IH:</span>
                              <span className="text-base font-semibold text-gray-800">{purchase.IH?.toString() || "0"}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-600">IP:</span>
                              <span className="text-base font-semibold text-gray-800">{purchase.IP?.toString() || "0"}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-600">BP:</span>
                              <span className="text-base font-semibold text-gray-800">{purchase.BP?.toString() || "0"}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-600">USP:</span>
                              <span className="text-base font-semibold text-gray-800">{purchase.USP?.toString() || "0"}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-600">PHARMA:</span>
                              <span className="text-base font-semibold text-gray-800">{purchase.PHARMA?.toString() || "0"}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-600">ELECTROPLATING:</span>
                              <span className="text-base font-semibold text-gray-800">{purchase.ELECTROPLATING?.toString() || "0"}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-600">FEED:</span>
                              <span className="text-base font-semibold text-gray-800">{purchase.FEED?.toString() || "0"}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-600">AGRI:</span>
                              <span className="text-base font-semibold text-gray-800">{purchase.AGRI?.toString() || "0"}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-600">IMPORTED:</span>
                              <span className="text-base font-semibold text-gray-800">{purchase.IMPORTED?.toString() || "0"}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="15" className="border p-2 text-center">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded-md disabled:bg-gray-100"
          >
            Previous
          </button>
          <span className="mx-2">
            Page {currentPage} of {Math.ceil(sortedData.length / rowsPerPage)}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(sortedData.length / rowsPerPage)))}
            disabled={currentPage === Math.ceil(sortedData.length / rowsPerPage)}
            className="px-3 py-1 bg-gray-200 rounded-md disabled:bg-gray-100"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Purchases;