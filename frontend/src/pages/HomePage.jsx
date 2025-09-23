import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/AuthSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { FaTrash, FaUpload, FaShareAlt } from "react-icons/fa";

const Homepage = () => {
  const user = useSelector(selectUser);
  const darkMode = useSelector((state) => state.ui.darkMode);
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchSchools = async () => {
      if (!user?.token) return;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/school`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );

        if (response.data.success) {
          setSchools(response.data.data);
        } else {
          toast.error(response.data.message || "Failed to fetch schools");
        }
      } catch (err) {
        console.error("Error fetching schools:", err);
        toast.error("Failed to fetch schools");
      }
    };

    fetchSchools();
  }, [user]);

  const handleRemoveSchool = async (id) => {
    if (!user?.token) return;

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/users/${id}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      if (response.data.success) {
        setSchools((prev) => prev.filter((s) => s._id !== id));
        toast.success("School removed successfully!");
      } else {
        toast.error(response.data.message || "Failed to remove school");
      }
    } catch (err) {
      console.error("Error removing school:", err);
      toast.error("Failed to remove school");
    }
  };

  return (
    <div
      className={`flex flex-col w-full min-h-screen p-4 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6">
        Registered Schools
      </h1>

      <div className="w-full max-w-4xl mx-auto mb-8">
        <div
          className={`p-6 rounded-2xl shadow-lg flex justify-between items-center transition-colors duration-300 ${
            darkMode ? "bg-gray-800 text-white" : "bg-blue-600 text-white"
          }`}>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold">Total Schools</h2>
            <p className="text-2xl sm:text-3xl font-bold">{schools.length}</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto">
        <div
          className={`hidden md:block overflow-x-auto shadow rounded-2xl transition-colors duration-300`}>
          <table
            className={`min-w-full rounded-2xl overflow-hidden transition-colors duration-300 ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}>
            <thead
              className={`transition-colors duration-300 ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}>
              <tr>
                <th className="py-3 px-4 text-left font-semibold">#</th>
                <th className="py-3 px-4 text-left font-semibold">Name</th>
                <th className="py-3 px-4 text-left font-semibold">Email</th>
                <th className="py-3 px-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {schools.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className={`py-6 text-center transition-colors duration-300 ${
                      darkMode ? "text-gray-300" : "text-gray-500"
                    }`}>
                    No schools found
                  </td>
                </tr>
              ) : (
                schools.map((school, idx) => (
                  <tr
                    key={school._id}
                    className={`border-b transition-colors duration-300 hover:${
                      darkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}>
                    <td className="py-3 px-4">{idx + 1}</td>
                    <td className="py-3 px-4 font-medium">{school.name}</td>
                    <td
                      className={`py-3 px-4 text-sm transition-colors duration-300 ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}>
                      {school.email}
                    </td>
                    <td className="py-3 px-4 flex justify-center space-x-3">
                      <button className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600">
                        <FaUpload />
                      </button>
                      <button
                        onClick={() => handleRemoveSchool(school._id)}
                        className="p-2 rounded bg-red-500 text-white hover:bg-red-600">
                        <FaTrash />
                      </button>
                      <button className="p-2 rounded bg-green-500 text-white hover:bg-green-600">
                        <FaShareAlt />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {schools.length === 0 ? (
            <p
              className={`text-center transition-colors duration-300 ${
                darkMode ? "text-gray-300" : "text-gray-500"
              }`}>
              No schools found
            </p>
          ) : (
            schools.map((school, idx) => (
              <div
                key={school._id}
                className={`p-4 rounded-xl shadow-md hover:shadow-lg transition-colors duration-300 ${
                  darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                }`}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{school.name}</h3>
                  <span
                    className={`text-sm transition-colors duration-300 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}>
                    #{idx + 1}
                  </span>
                </div>
                <p
                  className={`text-sm mb-3 transition-colors duration-300 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}>
                  {school.email}
                </p>
                <div className="flex justify-end space-x-2">
                  <button className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600">
                    <FaUpload />
                  </button>
                  <button
                    onClick={() => handleRemoveSchool(school._id)}
                    className="p-2 rounded bg-red-500 text-white hover:bg-red-600">
                    <FaTrash />
                  </button>
                  <button className="p-2 rounded bg-green-500 text-white hover:bg-green-600">
                    <FaShareAlt />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
