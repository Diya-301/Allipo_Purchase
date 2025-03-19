import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-xl mx-auto text-center space-y-6">
        {/* Header Section */}
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">🎉 Welcome Admin! 🎉</h2>
          <p className="text-gray-600 text-xl">You are now logged in as an admin.</p>
        </div>

        {/* Icon Section */}
        <div className="flex justify-center space-x-4">
          <span className="text-4xl text-blue-500">👨‍💻</span>
          <span className="text-4xl text-green-500">📊</span>
          <span className="text-4xl text-yellow-500">🔧</span>
        </div>

        {/* Buttons Section */}
        <div className="space-y-4">
          {/* View Database Button */}
          <Link
            to="/view"
            className="block w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition duration-300"
          >
            View Database 📂
          </Link>

          {/* Add to Database Button */}
          <Link
            to="/add"
            className="block w-full py-3 px-4 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition duration-300"
          >
            Add to Database ➕
          </Link>

          {/* Edit Database Button */}
          <Link
            to="/edit"
            className="block w-full py-3 px-4 bg-yellow-500 text-white font-semibold rounded-md shadow-md hover:bg-yellow-600 transition duration-300"
          >
            Edit Database ✏️
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;