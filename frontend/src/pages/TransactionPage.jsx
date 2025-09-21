import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTransactions } from "../features/transaction/transactionSlice";
import toast from "react-hot-toast";

const TransactionPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const {
    data: transactions,
    totalTransactions,
    totalOrderAmount,
    totalTransactionAmount,
    loading,
    error,
    page: currentPage,
    limit,
  } = useSelector((state) => state.transactions);

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (user?.token) {
      dispatch(fetchTransactions({ token: user.token, page, limit }))
        .unwrap()
        .catch(() => toast.error("Failed to fetch transactions"));
    }
  }, [dispatch, page, user, limit]);

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

  const totalPages = Math.ceil(totalTransactions / limit);

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6">
        Transactions
      </h1>

      {/* Totals */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow w-full md:w-auto text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Transactions
          </p>
          <p className="font-bold text-lg">{totalTransactions}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow w-full md:w-auto text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Order Amount
          </p>
          <p className="font-bold text-lg">₹{totalOrderAmount}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow w-full md:w-auto text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Transaction Amount
          </p>
          <p className="font-bold text-lg">₹{totalTransactionAmount}</p>
        </div>
      </div>

      {/* Desktop / Tablet Table */}
      <div className="hidden md:block shadow-md rounded-lg overflow-hidden">
        <table className="w-full min-w-full table-auto border-collapse">
          <thead className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 sticky top-0">
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
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr
                  key={tx._id}
                  className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                  <td className="px-4 py-2">{tx.collect_id}</td>
                  <td className="px-4 py-2">{tx.school_id}</td>
                  <td className="px-4 py-2">{tx.gateway || "N/A"}</td>
                  <td className="px-4 py-2">₹{tx.order_amount}</td>
                  <td className="px-4 py-2">
                    ₹{tx.transaction_amount || tx.order_amount}
                  </td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      tx.status === "success"
                        ? "text-green-600"
                        : tx.status === "failed"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}>
                    {tx.status || "pending"}
                  </td>
                  <td className="px-4 py-2">
                    {tx.payment_time
                      ? new Date(tx.payment_time).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 gap-4 md:hidden p-2">
        {transactions.length === 0 ? (
          <p className="text-center text-gray-500">No transactions found</p>
        ) : (
          transactions.map((tx) => (
            <div
              key={tx._id}
              className="p-4 rounded-lg shadow bg-gray-50 dark:bg-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Collect ID:{" "}
                <span className="font-semibold">{tx.collect_id}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                School: <span className="font-semibold">{tx.school_id}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Gateway:{" "}
                <span className="font-semibold">{tx.gateway || "N/A"}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Order Amount:{" "}
                <span className="font-semibold">₹{tx.order_amount}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Transaction Amount:{" "}
                <span className="font-semibold">
                  ₹{tx.transaction_amount || tx.order_amount}
                </span>
              </p>
              <p
                className={`text-sm font-semibold mt-1 ${
                  tx.status === "success"
                    ? "text-green-600"
                    : tx.status === "failed"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}>
                {tx.status || "pending"}
              </p>
              <p className="text-xs text-gray-400">
                {tx.payment_time
                  ? new Date(tx.payment_time).toLocaleString()
                  : "N/A"}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center mt-6 gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 disabled:opacity-50 text-sm sm:text-base">
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setPage(idx + 1)}
              className={`px-3 py-1 rounded text-sm sm:text-base ${
                page === idx + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 dark:bg-gray-700"
              }`}>
              {idx + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 disabled:opacity-50 text-sm sm:text-base">
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionPage;
