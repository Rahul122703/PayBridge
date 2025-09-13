import React, { useState, useMemo } from "react";
import { FaTrash, FaUpload, FaShareAlt } from "react-icons/fa";

const UsersTable = ({ users, onRemove, darkMode }) => {
  const [search, setSearch] = useState("");

  // Filtered users based on search
  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const tableBg = darkMode
    ? "bg-gray-800 text-white"
    : "bg-white text-gray-900";
  const headerBg = darkMode
    ? "bg-gray-100 text-white"
    : "bg-gray-100 text-gray-900";
  const borderColor = darkMode ? "border-gray-600" : "border-gray-300";

  if (users.length === 0)
    return <p className="text-center text-gray-500">No users found</p>;

  return (
    <div className="w-full">
      {/* Search Input + Refresh */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-1/3"
        />
        <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Refresh
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className={`table-auto w-full border-collapse ${tableBg}`}>
          <thead>
            <tr>
              <th className={`border ${borderColor} px-4 py-2 ${headerBg}`}>
                #
              </th>
              <th className={`border ${borderColor} px-4 py-2 ${headerBg}`}>
                Note
              </th>
              <th className={`border ${borderColor} px-4 py-2 ${headerBg}`}>
                Time
              </th>
              <th className={`border ${borderColor} px-4 py-2 ${headerBg}`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, idx) => (
              <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                <td className={`border ${borderColor} px-4 py-2 text-center`}>
                  {idx + 1}
                </td>
                <td className={`border ${borderColor} px-4 py-2`}>
                  {user.note || user.name}
                </td>
                <td className={`border ${borderColor} px-4 py-2 text-sm`}>
                  {user.time || "N/A"}
                </td>
                <td
                  className={`border ${borderColor} px-4 py-2 text-center space-x-2`}>
                  <button
                    onClick={() => onRemove(user._id)}
                    className="p-2 rounded bg-red-500 text-white hover:bg-red-600">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
