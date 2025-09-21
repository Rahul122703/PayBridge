import React, { useState, useEffect } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../features/auth/AuthSlice";
// !!!!!!!!!! WARNING : UNCOMMENT THIS AND THEN RUN WHEN RUNNING ON LOCALHOST !!!!!!!!!!!
const BACKEND_URL = import.meta.env.VITE_API_URL; // !!!!!!!!!! WARNING : COMMENT THIS AND THEN RUN WHEN NOT RUNNING ON LOCALHOST !!!!!!!!!!!

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("authUser"));
    if (storedAuth?.user) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };

    const result = loginSchema.safeParse(data);
    if (!result.success) return toast.error(result.error.errors[0].message);

    try {
      setLoading(true);
      const res = await axios.post(`${BACKEND_URL}/auth/login`, data);

      if (res.data.success) {
        toast.success("Login successful!");

        const { message, name, email, role, jwtToken } = res.data;

        dispatch(
          login({
            name,
            email,
            token: jwtToken,
            message,
            role,
          })
        );

        navigate("/", { replace: true });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleLogin}>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 rounded-lg shadow-md transition-colors duration-200 ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}>
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"></path>
            </svg>
            Logging in...
          </div>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
