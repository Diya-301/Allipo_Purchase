import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditForm = ({ id }) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: "",
        industries: "",
        type: "",
        product: "",
        vendorName: "",
        businessType: "",
        sourceType: "",
        country: "",
        make: "",
        address: "",
        contactPerson: "",
        contactPhone: "",
        contactEmail: "",
        date: new Date().toISOString().split("T")[0],
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

    useEffect(() => {
        const fetchPurchase = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/purchases/${id}`);
                const purchase = response.data;

                const formattedDate = new Date(purchase.date).toISOString().split("T")[0];

                setFormData({
                    ...purchase,
                    date: formattedDate,
                });
            } catch (error) {
                console.error("Error fetching purchase:", error);
                toast.error("Failed to load purchase data. Please try again.");
            }
        };
        fetchPurchase();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "businessType" && value === "Manufacturer") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
                sourceType: "",
                country: "",
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { id, ...updateData } = formData;

            await axios.put(`${API_URL}/api/purchases/${id}`, updateData);

            toast.success("Purchase updated successfully!");
            navigate("/view");
        } catch (error) {
            console.error("Error updating purchase:", error);
            toast.error("Failed to update purchase. Please try again.");
        }
    };

    const handleDelete = async () => {

        if (window.confirm("Are you sure you want to delete this purchase?")) {
            try {
                await axios.delete(`${API_URL}/api/purchases/${id}`);
                toast.success("Purchase deleted successfully!");
                navigate("/view");
            } catch (error) {
                console.error("Error deleting purchase:", error);
                toast.error("Failed to delete purchase. Please try again.");
            }
        }
    };

    return (    
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Header */}
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Edit Purchase</h1>

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
                                disabled // Disable the ID field
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
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
                        <div>
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
                        <div>
                            <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">
                                Contact Person
                            </label>
                            <input
                                type="text"
                                id="contactPerson"
                                name="contactPerson"
                                value={formData.contactPerson}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
                                Contact Phone
                            </label>
                            <input
                                type="text"
                                id="contactPhone"
                                name="contactPhone"
                                value={formData.contactPhone}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                                Contact Email
                            </label>
                            <input
                                type="email"
                                id="contactEmail"
                                name="contactEmail"
                                value={formData.contactEmail}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                                Date
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>
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

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition duration-300"
                    >
                        Update Purchase
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="px-6 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition duration-300"
                    >
                        Delete Purchase
                    </button>
                </div>
            </form>

        </div>
    );
};

export default EditForm;