import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser, selectToken } from "../features/auth/AuthSlice";
import axios from "axios";

const SchoolPayPage = () => {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

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
        `http://localhost:8080/payments/create-payment`,
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
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded-lg">
      <h1 className="text-xl font-bold mb-4">School Payment</h1>
      <form onSubmit={handlePayment} className="space-y-4">
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
        <input
          type="email"
          placeholder="Student Email"
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50">
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default SchoolPayPage;
