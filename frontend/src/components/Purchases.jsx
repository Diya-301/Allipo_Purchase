import React, { useEffect, useState } from "react";
import axios from "axios";
import ExpandedRow from "./ExpandedRow";

const Purchases = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [purchases, setPurchases] = useState([]);
  const [filters, setFilters] = useState({});
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expandedRow, setExpandedRow] = useState(null);

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

  const filteredData = purchases.filter((purchase) => {
    for (const key in filters) {
      if (filters[key] && !String(purchase[key]).toLowerCase().includes(filters[key].toLowerCase())) {
        return false;
      }
    }
    const searchableColumns = [
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
      "date",
    ];

    const formattedDate = purchase.date
      ? new Date(purchase.date).toLocaleDateString()
      : "";

    const values = searchableColumns
      .map((column) => {
        if (column === "date") {
          return formattedDate;
        }
        return purchase[column];
      })
      .join(" ")
      .toLowerCase();

    return values.includes(searchQuery.toLowerCase());
  });

  const sortedData = sortColumn
    ? [...filteredData].sort((a, b) => {
      if (sortColumn === "id") {
        const valueA = Number(a[sortColumn]);
        const valueB = Number(b[sortColumn]);

        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }
      const valueA = String(a[sortColumn]).toLowerCase();
      const valueB = String(b[sortColumn]).toLowerCase();

      if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
      if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    })
    : filteredData;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);

  const handleSort = (column) => {
    if (!["id", "product", "vendorName", "country", "make", "address", "date"].includes(column)) return;

    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const getUniqueValues = (key) => {
    return [...new Set(purchases.map((p) => p[key]))].filter(Boolean);
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery("");
    setCurrentPage(1);
    setSortColumn(null);
    setSortOrder("asc");
  };

  const toggleExpandedRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
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
              setCurrentPage(1);
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
      <h1 className="text-2xl font-bold mb-4">Vendor List</h1>
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
                "date",
              ].map((column) => (
                <th key={column} className="border p-2">
                  {["industries", "type", "businessType", "sourceType", "country", "make"].includes(column) ? (
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
                  ) : (
                    <div></div>
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
                "date",
              ].map((column) => (
                <th
                  key={column}
                  className={`border p-2 cursor-pointer text-center ${!["id", "product", "vendorName", "country", "make", "address", "date"].includes(column)
                    ? "cursor-default"
                    : ""
                    }`}
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
                    <td className="border p-2">{purchase.product || "-"}</td>
                    <td className="border p-2">{purchase.vendorName || "-"}</td>
                    <td className="border p-2">{purchase.businessType || "-"}</td>
                    <td className="border p-2">{purchase.sourceType || "-"}</td>
                    <td className="border p-2">{purchase.country || "-"}</td>
                    <td className="border p-2">{purchase.make || "-"}</td>
                    <td className="border p-2">{purchase.address || "-"}</td>
                    <td className="border p-2 text-center">
                      {new Date(purchase.date).toLocaleDateString()}
                    </td>
                  </tr>
                  {/* Expanded Row */}
                  {expandedRow === purchase.id && <ExpandedRow purchase={purchase} />}
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