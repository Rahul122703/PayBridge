import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const TransactionPage = () => {
  const user = useSelector((state) => state.auth.user); // get token from redux
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user || !user.token) return;

      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/transactions?page=1&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setTransactions(res.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch transactions");
        toast.error("Failed to fetch transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg">
        Loading transactions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6">
        Transactions
      </h1>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full hidden md:table">
          <thead className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Collect ID</th>
              <th className="px-4 py-2 text-left">School ID</th>
              <th className="px-4 py-2 text-left">Gateway</th>
              <th className="px-4 py-2 text-left">Order Amount</th>
              <th className="px-4 py-2 text-left">Transaction Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Payment Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx.collect_id}
                className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <td className="px-4 py-2">{tx.collect_id}</td>
                <td className="px-4 py-2">{tx.school_id}</td>
                <td className="px-4 py-2">{tx.gateway}</td>
                <td className="px-4 py-2">₹{tx.order_amount}</td>
                <td className="px-4 py-2">₹{tx.transaction_amount}</td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    tx.status === "success"
                      ? "text-green-600"
                      : tx.status === "failed"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}>
                  {tx.status}
                </td>
                <td className="px-4 py-2">
                  {tx.payment_time
                    ? new Date(tx.payment_time).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="grid grid-cols-1 gap-4 md:hidden">
          {transactions.map((tx) => (
            <div
              key={tx.collect_id}
              className="p-4 rounded-lg shadow bg-gray-50 dark:bg-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Collect ID:{" "}
                <span className="font-semibold">{tx.collect_id}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                School: <span className="font-semibold">{tx.school_id}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Gateway: <span className="font-semibold">{tx.gateway}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Order Amount:{" "}
                <span className="font-semibold">₹{tx.order_amount}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Transaction Amount:{" "}
                <span className="font-semibold">₹{tx.transaction_amount}</span>
              </p>
              <p
                className={`text-sm font-semibold mt-1 ${
                  tx.status === "success"
                    ? "text-green-600"
                    : tx.status === "failed"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}>
                {tx.status}
              </p>
              <p className="text-xs text-gray-400">
                {tx.payment_time
                  ? new Date(tx.payment_time).toLocaleString()
                  : "N/A"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
