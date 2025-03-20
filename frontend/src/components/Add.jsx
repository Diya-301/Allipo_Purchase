import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Add = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  // State to hold form data
  const [formData, setFormData] = useState({
    id: "",
    industries: "",
    type: "",
    product: "",
    vendorName: "",
    businessType: "Manufacturer", // Default value
    sourceType: "",
    country: "",
    make: "",
    address: "",
    contacts: [{ contactPerson: "", contactPhone: "", contactEmail: "" }], // Array of contacts
    date: new Date().toISOString().split("T")[0], // Default to today's date
    TECH: "0",
    LR: "0",
    AR: "0",
    ACS: "0",
    FOOD: "0",
    COSMETIC: "0",
    IH: "0",
    IP: "0",
    BP: "0",
    USP: "0",
    PHARMA: "0",
    ELECTROPLATING: "0",
    FEED: "0",
    AGRI: "0",
    IMPORTED: "0",
    remarks: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // If businessType is "Manufacturer", reset sourceType and country
    if (name === "businessType" && value === "Manufacturer") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        sourceType: "", // Reset sourceType
        country: "", // Reset country
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle contact changes
  const handleContactChange = (index, field, value) => {
    const updatedContacts = [...formData.contacts];
    updatedContacts[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      contacts: updatedContacts,
    }));
  };

  // Add a new contact field
  const addContact = () => {
    if (formData.contacts.length < 5) {
      setFormData((prevData) => ({
        ...prevData,
        contacts: [
          ...prevData.contacts,
          { contactPerson: "", contactPhone: "", contactEmail: "" },
        ],
      }));
    } else {
      toast.warning("You can add a maximum of 5 contacts.");
    }
  };

  // Remove a contact field
  const removeContact = (index) => {
    if (formData.contacts.length > 1) {
      const updatedContacts = formData.contacts.filter((_, i) => i !== index);
      setFormData((prevData) => ({
        ...prevData,
        contacts: updatedContacts,
      }));
    } else {
      toast.error("At least one contact is required.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate that all contacts have required fields
      const isValid = formData.contacts.every(
        (contact) =>
          contact.contactPerson &&
          contact.contactPhone &&
          contact.contactEmail
      );

      if (!isValid) {
        toast.error("Please fill in all contact details.");
        return;
      }

      // Send POST request to backend
      await axios.post(`${API_URL}/api/purchases`, formData);
      toast.success("Vendor added successfully!");
      navigate("/view"); // Redirect to the purchases page after successful submission
    } catch (error) {
      console.error("Error adding vendor:", error);
      toast.error("Failed to add vendor. Please try again.");
    }
  };

  useEffect(() => {
    const fetchNextId = async () => {
      try {
        // Fetch the next ID from the backend
        const response = await axios.get(`${API_URL}/api/purchases/count`);

        // Extract the nextId from the response data
        const { nextId } = response.data;

        // Update the form data with the next ID
        setFormData((prevData) => ({
          ...prevData,
          id: nextId, // Set the ID to the nextId returned by the backend
        }));
      } catch (error) {
        console.error("Error fetching next ID:", error);
        toast.error("Failed to fetch the next ID. Please try again.");
      }
    };

    fetchNextId();
  }, []); // Run only once when the component mounts

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Add New Vendor Details
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6">
        {/* Section 1: Basic Details */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Basic Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                ID
              </label>
              <input
                type="number"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange} // This won't have any effect since the field is disabled
                disabled // Disable the field
                readOnly // Make it read-only
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="industries" className="block text-sm font-medium text-gray-700">
                Industries
              </label>
              <input
                type="text"
                id="industries"
                name="industries"
                value={formData.industries}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <input
                type="text"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="product" className="block text-sm font-medium text-gray-700">
                Product
              </label>
              <input
                type="text"
                id="product"
                name="product"
                value={formData.product}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Vendor Details */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Vendor Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="vendorName" className="block text-sm font-medium text-gray-700">
                Vendor Name
              </label>
              <input
                type="text"
                id="vendorName"
                name="vendorName"
                value={formData.vendorName}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="businessType" className="block text-sm font-medium text-gray-700">
                Business Type
              </label>
              <select
                id="businessType"
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
              >
                <option value="Manufacturer">Manufacturer</option>
                <option value="Importer">Importer</option>
                <option value="Distributor">Distributor</option>
                <option value="Trader">Trader</option>
              </select>
            </div>
            {formData.businessType !== "Manufacturer" && (
              <>
                <div>
                  <label htmlFor="sourceType" className="block text-sm font-medium text-gray-700">
                    Source Type
                  </label>
                  <input
                    type="text"
                    id="sourceType"
                    name="sourceType"
                    value={formData.sourceType}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Section 3: Contact Information */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Contact Information</h2>

          {/* Make Field */}
          <div className="mb-4">
            <label htmlFor="make" className="block text-sm font-medium text-gray-700">
              Make
            </label>
            <input
              type="text"
              id="make"
              name="make"
              value={formData.make}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Address Field */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Contacts Array */}
          {formData.contacts.map((contact, index) => (
            <div key={index} className="border p-4 rounded-md mb-4 relative">
              <button
                type="button"
                onClick={() => removeContact(index)}
                className="absolute top-1 right-1  bg-red-400 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700 transition duration-300 disabled:bg-gray-300 disabled:text-gray-500"
                disabled={formData.contacts.length === 1} // Disable if only one contact
              >
                <span className="text-xs font-bold">X</span>
              </button>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor={`contactPerson-${index}`} className="block text-sm font-medium text-gray-700">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    id={`contactPerson-${index}`}
                    value={contact.contactPerson}
                    onChange={(e) =>
                      handleContactChange(index, "contactPerson", e.target.value)
                    }
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor={`contactPhone-${index}`} className="block text-sm font-medium text-gray-700">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    id={`contactPhone-${index}`}
                    value={contact.contactPhone}
                    onChange={(e) =>
                      handleContactChange(index, "contactPhone", e.target.value)
                    }
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor={`contactEmail-${index}`} className="block text-sm font-medium text-gray-700">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    id={`contactEmail-${index}`}
                    value={contact.contactEmail}
                    onChange={(e) =>
                      handleContactChange(index, "contactEmail", e.target.value)
                    }
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addContact}
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition duration-300 disabled:bg-gray-300 disabled:text-gray-500"
            disabled={formData.contacts.length >= 5}
          >
            Add Contact
          </button>
        </div>

        {/* Section 4: Grades */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Grades</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="TECH" className="block text-sm font-medium text-gray-700">
                TECH
              </label>
              <input
                type="number"
                step="0.01"
                id="TECH"
                name="TECH"
                value={formData.TECH}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="LR" className="block text-sm font-medium text-gray-700">
                LR
              </label>
              <input
                type="number"
                step="0.01"
                id="LR"
                name="LR"
                value={formData.LR}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="AR" className="block text-sm font-medium text-gray-700">
                AR
              </label>
              <input
                type="number"
                step="0.01"
                id="AR"
                name="AR"
                value={formData.AR}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="ACS" className="block text-sm font-medium text-gray-700">
                ACS
              </label>
              <input
                type="number"
                step="0.01"
                id="ACS"
                name="ACS"
                value={formData.ACS}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="FOOD" className="block text-sm font-medium text-gray-700">
                FOOD
              </label>
              <input
                type="number"
                step="0.01"
                id="FOOD"
                name="FOOD"
                value={formData.FOOD}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="COSMETIC" className="block text-sm font-medium text-gray-700">
                COSMETIC
              </label>
              <input
                type="number"
                step="0.01"
                id="COSMETIC"
                name="COSMETIC"
                value={formData.COSMETIC}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="IH" className="block text-sm font-medium text-gray-700">
                IH
              </label>
              <input
                type="number"
                step="0.01"
                id="IH"
                name="IH"
                value={formData.IH}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="IP" className="block text-sm font-medium text-gray-700">
                IP
              </label>
              <input
                type="number"
                step="0.01"
                id="IP"
                name="IP"
                value={formData.IP}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="BP" className="block text-sm font-medium text-gray-700">
                BP
              </label>
              <input
                type="number"
                step="0.01"
                id="BP"
                name="BP"
                value={formData.BP}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="USP" className="block text-sm font-medium text-gray-700">
                USP
              </label>
              <input
                type="number"
                step="0.01"
                id="USP"
                name="USP"
                value={formData.USP}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="PHARMA" className="block text-sm font-medium text-gray-700">
                PHARMA
              </label>
              <input
                type="number"
                step="0.01"
                id="PHARMA"
                name="PHARMA"
                value={formData.PHARMA}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="ELECTROPLATING" className="block text-sm font-medium text-gray-700">
                ELECTROPLATING
              </label>
              <input
                type="number"
                step="0.01"
                id="ELECTROPLATING"
                name="ELECTROPLATING"
                value={formData.ELECTROPLATING}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="FEED" className="block text-sm font-medium text-gray-700">
                FEED
              </label>
              <input
                type="number"
                step="0.01"
                id="FEED"
                name="FEED"
                value={formData.FEED}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="AGRI" className="block text-sm font-medium text-gray-700">
                AGRI
              </label>
              <input
                type="number"
                step="0.01"
                id="AGRI"
                name="AGRI"
                value={formData.AGRI}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="IMPORTED" className="block text-sm font-medium text-gray-700">
                IMPORTED
              </label>
              <input
                type="number"
                step="0.01"
                id="IMPORTED"
                name="IMPORTED"
                value={formData.IMPORTED}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 5: Remarks */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Additional Information</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">
                Remarks
              </label>
              <textarea
                id="remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition duration-300"
          >
            Add Vendor
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;