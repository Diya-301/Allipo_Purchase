import React from "react";

const ExpandedRow = ({ purchase }) => {
  return (
    <td colSpan="15" className="p-4 bg-gray-50">
      {/* Card-like Container for Expanded Content */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 space-y-4">
        {/* Grades Section */}
        <h3 className="text-lg font-semibold text-black">Grades:</h3>
        <div className="grid grid-cols-8 gap-4">
          {/* Grades Section (5/8 width) */}
          <div className="col-span-5  gap-4 bg-gray-100 rounded-md p-2 pl-4 ">
            {(() => {
              // Filter grades to exclude unwanted fields
              const filteredGrades = Object.entries(purchase).filter(([key, value]) => {
                const excludedFields = [
                  "_id", // MongoDB ID
                  "id",
                  "product",
                  "vendorName",
                  "businessType",
                  "sourceType",
                  "country",
                  "make",
                  "contacts", // Contacts array
                  "date",
                  "remarks",
                  "address",
                ];
                return !excludedFields.includes(key) && typeof value === "number" && value !== 0;
              });

              // If no grades are found, display a fallback message
              if (filteredGrades.length === 0) {
                return (
                  <div className="flex items-center justify-center text-gray-600">
                    No grades available.
                  </div>
                );
              }

              // Split grades into 3 columns
              const gradesPerColumn = Math.ceil(filteredGrades.length / 3);
              const gradeColumns = Array.from({ length: 3 }, (_, i) =>
                filteredGrades.slice(i * gradesPerColumn, (i + 1) * gradesPerColumn)
              );

              return (
                <div className="grid grid-cols-3 gap-4">
                  {gradeColumns.map((column, columnIndex) => {
                    // Only render the table if the column has grades
                    if (column.length === 0) {
                      return null; // Skip rendering this column
                    }

                    return (
                      <div key={columnIndex} className="bg-gray-100 rounded-md p-2">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Grade Type
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Value
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {column.map(([key, value], index) => (
                              <tr key={index}>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800 font-medium">
                                  {key.toUpperCase()}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">
                                  {value}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>

          {/* Contact Information Section (3/8 width) */}
          <div className="col-span-3 bg-gray-100 rounded-md p-2 pl-4 shadow-lg">
            {purchase.contacts && purchase.contacts.length > 0 ? (
              <div className="overflow-x-auto p-2">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Contact Person
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Contact Phone
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Contact Email
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {purchase.contacts.map((contact, index) => (
                      <tr key={index}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">
                          {contact.contactPerson || "N/A"}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">
                          {contact.contactPhone || "N/A"}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">
                          {contact.contactEmail || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex items-center justify-center text-gray-600">
                No contacts available.
              </div>
            )}
          </div>
        </div>

        {/* Remarks and Address Section */}
        <div className="mt-6 grid grid-cols-8 gap-4">
          {/* Remarks Section (5/8 width) */}
          <div className="col-span-5 bg-gray-100 rounded-md p-2 pl-4 shadow-lg min-h-[56px] flex flex-col">
            <p className="text-lg font-semibold text-black whitespace-nowrap mr-2 flex items-start">
              Remarks:
            </p>
            <p className="text-base text-gray-700 flex-1 leading-[1.4] break-words">
              {purchase.remarks || "No remarks available."}
            </p>
          </div>

          {/* Address Section (3/8 width) */}
          <div className="col-span-3 bg-gray-100 rounded-md p-2 pl-4 shadow-lg min-h-[56px] flex flex-col">
            <p className="text-lg font-semibold text-black whitespace-nowrap mr-2 flex items-start">
              Address:
            </p>
            <p className="text-base  text-gray-700 flex-1 leading-[1.4] break-words">
              {purchase.address || "No address available."}
            </p>
          </div>
        </div>
      </div>
    </td>
  );
};

export default ExpandedRow;