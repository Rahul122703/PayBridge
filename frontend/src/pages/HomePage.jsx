import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/AuthSlice"; // adjust path if needed
import axios from "axios";
import toast from "react-hot-toast";
import { FaTrash, FaUpload, FaShareAlt } from "react-icons/fa";

const Homepage = () => {
  const user = useSelector(selectUser);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user || !user.token) {
        console.warn("User or token not available");
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/school`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (response.data.success) {
          setUsers(response.data.data);
          toast.success("Schools fetched successfully!");
        } else {
          toast.error("Failed to fetch schools: " + response.data.message);
        }
      } catch (err) {
        console.error(
          "Error fetching schools:",
          err.response?.data || err.message
        );
        toast.error("Failed to fetch schools");
      }
    };

    fetchUsers();
  }, [user]);

  const handleRemoveUser = async (userId) => {
    if (!user || !user.token) return;
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.data.success) {
        setUsers(users.filter((u) => u._id !== userId));
        toast.success("School removed successfully!");
      } else {
        toast.error("Failed to remove school: " + response.data.message);
      }
    } catch (err) {
      console.error(
        "Error removing school:",
        err.response?.data || err.message
      );
      toast.error("Failed to remove school");
    }
  };

  return (
    <div className="flex flex-col w-full max-h-full overflow-auto transition-colors duration-300 bg-gray-50">
      <div className="flex flex-1 flex-col items-center justify-start w-full p-4">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-6">
          Registered Schools
        </h1>

        <div className="w-full max-w-4xl mb-6">
          <div className="p-6 bg-blue-500 text-white rounded-2xl shadow-md flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Total Schools</h2>
              <p className="text-3xl font-bold">{users.length}</p>
            </div>
            <span className="text-5xl">🏫</span>
          </div>
        </div>

        <div className="w-full max-w-[70rem] grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.length === 0 ? (
            <p className="text-center text-gray-500 w-full">No schools found</p>
          ) : (
            users.map((school, idx) => (
              <div
                key={school._id}
                className="p-4 bg-white border rounded-xl shadow hover:shadow-lg transition flex flex-col space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{school.name}</h3>
                  <span className="text-sm text-gray-500">#{idx + 1}</span>
                </div>
                <p className="text-sm text-gray-600">{school.email}</p>
                <div className="flex justify-end space-x-2">
                  <button className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600">
                    <FaUpload />
                  </button>
                  <button
                    onClick={() => handleRemoveUser(school._id)}
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
