import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser, selectToken } from "../features/auth/AuthSlice";
import { selectDarkMode } from "../features/ui/uISlice";
import axios from "axios";

const SchoolPayPage = () => {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const darkMode = useSelector(selectDarkMode);

  const [amount, setAmount] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/payments/create-payment`,
        {
          school_id: "65b0e6293e9f76a9694d84b4",
          amount: amount,
          callback_url: "https://paybridge-39eo.onrender.com/payments/callback",
          student_info: {
            name: studentName,
            id: studentId,
            email: studentEmail,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const redirectUrl = res.data?.raw?.collect_request_url;
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        setError("Payment URL not found");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Payment creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`p-6 max-w-md mx-auto rounded-lg shadow-md transition-colors duration-300
        ${darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"}`}>
      <h1 className="text-xl font-bold mb-4">School Payment</h1>
      <form onSubmit={handlePayment} className="space-y-4">
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className={`w-full border px-3 py-2 rounded-md transition-colors duration-300
            ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-gray-200"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          required
        />
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className={`w-full border px-3 py-2 rounded-md transition-colors duration-300
            ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-gray-200"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          required
        />
        <input
          type="email"
          placeholder="Student Email"
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
          className={`w-full border px-3 py-2 rounded-md transition-colors duration-300
            ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-gray-200"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          required
        />
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={`w-full border px-3 py-2 rounded-md transition-colors duration-300
            ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-gray-200"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md transition-colors duration-300
            ${
              darkMode
                ? "bg-blue-700 text-white hover:bg-blue-600 disabled:opacity-50"
                : "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            }`}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>

      {error && (
        <p
          className={`mt-4 transition-colors duration-300 ${
            darkMode ? "text-red-400" : "text-red-500"
          }`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default SchoolPayPage;
