import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaRegFileAlt, FaComments, FaClipboardList, FaChartLine } from 'react-icons/fa';

const AdminDashboard = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all">
          <div className="flex items-center">
            <FaUsers size={30} className="mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Total Users</h3>
              <p className="text-2xl">1,250</p> {/* Dynamic value */}
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all">
          <div className="flex items-center">
            <FaRegFileAlt size={30} className="mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Total Recipes</h3>
              <p className="text-2xl">350</p> {/* Dynamic value */}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all">
          <div className="flex items-center">
            <FaComments size={30} className="mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Pending Complaints</h3>
              <p className="text-2xl">5</p> {/* Dynamic value */}
            </div>
          </div>
        </div>
      </div>

      {/* Section: Quick Links */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Quick Actions</h2>
        <div className="flex flex-wrap gap-6">
          <Link to="/admin/recipes" className="bg-blue-600 text-white p-4 rounded-lg shadow-lg hover:bg-blue-700 transform transition-all hover:scale-105">
            <FaClipboardList size={20} className="mr-2" /> Manage Recipes
          </Link>
          <Link to="/admin/users" className="bg-green-600 text-white p-4 rounded-lg shadow-lg hover:bg-green-700 transform transition-all hover:scale-105">
            <FaUsers size={20} className="mr-2" /> Manage Users
          </Link>
          <Link to="/admin/feedback" className="bg-yellow-600 text-white p-4 rounded-lg shadow-lg hover:bg-yellow-700 transform transition-all hover:scale-105">
            <FaComments size={20} className="mr-2" /> View Feedback
          </Link>
        </div>
      </div>

      {/* Section: Charts */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Activity Summary</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <FaChartLine size={30} className="mb-4 text-gray-800" />
          {/* Placeholder for future chart */}
          <div className="w-full h-48 bg-gray-300 rounded-lg flex items-center justify-center text-gray-600">
            <p className="text-lg">Graphical Representation (Chart.js or Recharts)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
